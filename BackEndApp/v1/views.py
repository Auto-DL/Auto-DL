from genericpath import isdir
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import sys
import os
import json
import importlib
import stat
import git
import pickle

from authv1.store import Store
from authv1.models import User
from authv1.decorators import is_authenticated
from v1.models import UserData
from dlmml.utils import json_to_dict
from dlmml.parser import *
from dotenv import load_dotenv

from .utils import generate_uid, copy_file, format_code, delete_broken_symlinks

load_dotenv()


@api_view(["POST"])
@is_authenticated
def generate(request):
    training_params = request.data.get("training_params")
    username = request.data.get("username")
    user = User(username=username, password=None)
    user = user.find()

    project_id = request.data.get("project_id")
    store_obj = Store(user)
    if not store_obj.exist(project_id):
        raise Exception("No such project exists")

    project_dir = store_obj.path + os.sep + project_id
    with open(project_dir + os.sep + "meta.json", "r") as f:
        metadata = json.load(f)

    with open(project_dir + os.sep + "preprocessing.json", "r") as f:
        preprocessing = json.load(f)

    lib = metadata.get("lib", "keras").lower()
    lang = metadata.get("lang", "python").lower()

    meta_params = {}
    meta_params["lib"] = lib
    meta_params["lang"] = lang
    meta_params["dataset-path"] = metadata.get("data_dir", ".")
    meta_params["save_plots"] = training_params["plot"]
    meta_params.update(preprocessing)

    with open(project_dir + os.sep + "layers.json", "r") as f:
        layers = json.load(f)

    with open(project_dir + os.sep + "components.json", "r") as f:
        components = json.load(f)

    training_params.update(meta_params)
    training_params.update(layers)

    inputs = json_to_dict.MakeDict(training_params).parse()
    parser_path = "dlmml.parser." + lang + "." + lib + ".main"
    parser = importlib.import_module(parser_path)

    # TODO: move to javascript in the next version
    user_data = UserData(metadata, components, layers, inputs, preprocessing)

    status, error = parser.generate_code(inputs)

    if status:
        print("Error", error)
        msg = "Could not generate code"
        path = ""
    else:
        print("File generated")
        msg = "File Generated Successfully"
        path = "file:///" + os.getcwd() + os.sep + "test.py"
        format_code("test.py")
        copy_file(project_dir)

    return JsonResponse({"message": msg, "path": path})


@api_view(["POST"])
@is_authenticated
def train(request):
    try:
        # TODO: Run using python and capture logs.
        user_os = sys.platform
        if user_os == "linux" or user_os == "linux2":
            os.system("gnome-terminal -e ./train.sh")
        elif user_os == "win32":
            os.system("start cmd /k call train.bat")
        else:
            raise NotImplementedError("Training not supported on your platform")

        msg = "Training started successfully"

    except Exception as e:
        msg = "Could not start training"
    return JsonResponse({"message": msg})


@api_view(["POST"])
@is_authenticated
def compile(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        training_params = request.data.get("training_params")
        inputs = json_to_dict.MakeDict(training_params).parse()

        lib = inputs.get("lib", "keras")
        lang = inputs.get("lang", "python")

        test_path = "DLMML.parser." + lang + "." + lib + ".test_model"
        test_model = importlib.import_module(test_path)

        status, error = test_model.test_compile_model(inputs)
        print(status, error)
    except Exception as e:
        status, error = 1, "Compile error"
    return JsonResponse({"status": status, "error": error})


@api_view(["POST"])
@is_authenticated
def get_all_projects(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()
        store_obj = Store(user)

        delete_broken_symlinks(store_obj.path)
        project_ids = store_obj.enlist()

        projects = []
        for id in project_ids:
            path = store_obj.path + os.sep + id + os.sep + "meta.json"
            with open(path, "r") as f:
                metadata = json.load(f)
            list_item = {id: metadata}
            projects.append(list_item)
        status, success, message = 200, True, "Projects Fetched"
    except Exception as e:
        status, success, message, projects = (
            500,
            False,
            "Projects could not be fetched",
            [],
        )
    return JsonResponse(
        {"success": success, "message": message, "projects": projects}, status=status
    )


@api_view(["POST"])
@is_authenticated
def get_project(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        if not store_obj.exist(project_id):
            raise Exception("No such project exists")
        project_dir = store_obj.path + os.sep + project_id

        with open(project_dir + os.sep + "layers.json", "r") as f:
            layers = json.load(f)

        b2f_json = layers
        status, success, message = 200, True, "Layers Fetched"

    except Exception as e:
        status, success, message, b2f_json = (
            500,
            False,
            "Layers could not be fetched",
            {},
        )
    return JsonResponse(
        {"success": success, "message": message, "b2f_json": b2f_json}, status=status
    )


@api_view(["POST"])
@is_authenticated
def edit_project(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()
        project_id = request.data.get("project_id")
        project_name = request.data.get("project_name")
        project_description = request.data.get("project_description")
        data_dir = request.data.get("data_dir")
        output_file_name = request.data.get("output_file_name")
        owner = request.data.get("owner")
        store_obj = Store(user)

        if owner and not owner == username:
            project_id = "shared_" + project_id

        if not store_obj.exist(project_id):
            raise Exception("No such project exists")
        project_dir = store_obj.path + os.sep + project_id

        with open(project_dir + os.sep + "meta.json", "r") as f:
            metadata = json.load(f)

        metadata["project_name"] = (
            project_name if project_name is not None else metadata["project_name"]
        )
        metadata["project_description"] = (
            project_description
            if project_description is not None
            else metadata["project_description"]
        )
        metadata["data_dir"] = (
            data_dir if data_dir is not None else metadata["data_dir"]
        )
        metadata["output_file_name"] = (
            output_file_name
            if output_file_name is not None
            else metadata["output_file_name"]
        )
        with open(project_dir + os.sep + "meta.json", "w") as f:
            json.dump(metadata, f)
        status, success, message = 200, True, "Project Updated Successfully"
    except Exception as e:
        status, success, message = 500, False, "Could not update the Project"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def delete_project(request):
    try:

        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()
        project_id = request.data.get("project_id")

        store_obj = Store(user)
        err, exception = store_obj.delete(project_id)

        if err:
            raise Exception(exception)

        if project_id.startswith("shared_"):
            project_dir = os.path.join(
                store_obj.rootpath,
                request.data.get("owner"),
                project_id.replace("shared_", ""),
            )

            with open(project_dir + os.sep + "meta.json", "r") as f:
                metadata = json.load(f)
            if metadata.get("shared_with", None):
                if username in metadata.get("shared_with"):
                    metadata["shared_with"].remove(username)
            with open(project_dir + os.sep + "meta.json", "w") as f:
                json.dump(metadata, f)

        status, success, message = 200, True, "Project Deleted Successfully"
    except Exception as e:
        status, success, message = 500, False, "Project could not be deleted"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def create_project(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        project_id = generate_uid()
        project_name = request.data.get("project_name")
        project_description = request.data.get("project_description")
        lang = request.data.get("language")
        lib = request.data.get("library")
        task = request.data.get("task")
        data_dir = request.data.get("path")
        output_file_name = request.data.get("output_file_name")

        store_obj = Store(user)
        if store_obj.exist(project_id):
            raise Exception("Project Already Exists!")

        project_dir = store_obj.create(project_id)
        metadata = {
            "project_id": project_id,
            "project_name": project_name,
            "project_description": project_description,
            "lib": lib,
            "lang": lang,
            "task": task,
            "data_dir": data_dir,
            "output_file_name": output_file_name,
            "username": username,
            "shared_with": [],
        }

        with open(project_dir + os.sep + "meta.json", "w") as f:
            json.dump(metadata, f)

        status, success, message = 200, True, "Project Created Successfully"
    except Exception as e:
        status, success, message = 500, False, "Project could not be created"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def clone_project(request):
    try:
        username = request.data.get("username")
        model_layers = request.data.get("model_layers")
        preprocessing_parameters = request.data.get("preprocessing_parameters")
        hyper_parameters = request.data.get("hyper_parameters")

        user = User(username=username, password=None)
        user = user.find()

        project_id = request.data.get("project_id")
        clone_id = generate_uid()
        project_name = request.data.get("project_name")
        project_description = request.data.get("project_description")
        lang = request.data.get("language")
        lib = request.data.get("library")
        task = request.data.get("task")
        data_dir = request.data.get("path")
        output_file_name = request.data.get("output_file_name")

        store_obj = Store(user)
        if store_obj.exist(clone_id):
            raise Exception("Project Already Exists!")

        clone_dir = store_obj.create(clone_id)
        metadata = {
            "project_id": clone_id,
            "project_name": project_name,
            "project_description": project_description,
            "lib": lib,
            "lang": lang,
            "task": task,
            "data_dir": data_dir,
            "output_file_name": output_file_name,
            "username": username,
        }

        with open(clone_dir + os.sep + "meta.json", "w") as f:
            json.dump(metadata, f)

        project_dir = store_obj.path + os.sep + project_id

        project_json = project_dir + os.sep + "layers.json"
        if model_layers and os.path.isfile(project_json):
            with open(model_layers) as f:
                layers = json.load(f)
                with open(clone_dir + os.sep + "layers.json", "w") as f:
                    json.dump(layers, f)

            with open(project_dir + os.sep + "components.json", "r") as f:
                components = json.load(f)
                with open(clone_dir + os.sep + "components.json", "w") as f:
                    json.dump(components, f)

        project_preprocessing = project_dir + os.sep + "preprocessing.json"
        if preprocessing_parameters and os.path.isfile(project_preprocessing):
            with open(project_preprocessing, "r") as f:
                preprocessing = json.load(f)
                with open(clone_dir + os.sep + "preprocessing.json", "w") as f:
                    json.dump(preprocessing, f)

        project_hyperparameters = project_dir + os.sep + "hyperparams.json"
        if hyper_parameters and os.path.isfile(project_hyperparameters):
            with open(project_hyperparameters, "r") as f:
                hyperparams = json.load(f)
                with open(clone_dir + os.sep + "hyperparams.json", "w") as f:
                    json.dump(hyperparams, f)

        status, success, message = 200, True, "Project Cloned Successfully"
    except Exception as e:
        status, success, message = 500, False, "Project could not be cloned"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def save_layers(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        layers = request.data.get("layer_json")
        components = request.data.get("component_array")

        if not store_obj.exist(project_id):
            raise Exception("No such project exists")

        project_dir = store_obj.path + os.sep + project_id
        with open(project_dir + os.sep + "layers.json", "w") as f:
            json.dump(layers, f)

        with open(project_dir + os.sep + "components.json", "w") as f:
            json.dump(components, f)

        status, success, message = 200, True, "Layers saved successfully"
    except Exception as e:
        status, success, message = 500, False, "Could not save layers"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def get_layers(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        if not store_obj.exist(project_id):
            raise Exception("No such project exists")
        project_dir = store_obj.path + os.sep + project_id

        with open(project_dir + os.sep + "components.json", "r") as f:
            components = json.load(f)

        status, success, message = 200, True, "Components Array Fetched"

    except Exception as e:
        status, success, message, components = 500, False, "Could not fetch Layers", {}
    return JsonResponse(
        {"success": success, "message": message, "components": components},
        status=status,
    )


@api_view(["POST"])
@is_authenticated
def save_preprocessing_params(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        preprocessing = request.data.get("preprocessing_params")

        if not store_obj.exist(project_id):
            raise Exception("No such project exists")

        project_dir = store_obj.path + os.sep + project_id
        with open(project_dir + os.sep + "preprocessing.json", "w") as f:
            json.dump(preprocessing, f)

        status, success, message = 200, True, "Preprocessing params saved successfully"

    except Exception as e:
        status, success, message = 500, False, "Could not save preprocessing params"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def get_preprocessing_params(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        if not store_obj.exist(project_id):
            raise Exception("No such project exists")
        project_dir = store_obj.path + os.sep + project_id

        with open(project_dir + os.sep + "preprocessing.json", "r") as f:
            preprocessing = json.load(f)

        status, success, message = 200, True, "preprocessing params fetched"

    except Exception as e:
        status, success, message, preprocessing = (
            500,
            False,
            "Could not fetch preprocessing params",
            {},
        )
    return JsonResponse(
        {"success": success, "message": message, "preprocessing": preprocessing},
        status=status,
    )


@api_view(["POST"])
@is_authenticated
def save_hyperparams(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        hyperparams = request.data.get("hyperparams")

        if not store_obj.exist(project_id):
            raise Exception("No such project exists")

        project_dir = store_obj.path + os.sep + project_id
        with open(project_dir + os.sep + "hyperparams.json", "w") as f:
            json.dump(hyperparams, f)

        status, success, message = 200, True, "Hyperparams saved successfully"

    except Exception as e:
        status, success, message = 500, False, "Could not save hyperparams"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def get_hyperparams(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        if not store_obj.exist(project_id):
            raise Exception("No such project exists")
        project_dir = store_obj.path + os.sep + project_id

        with open(project_dir + os.sep + "hyperparams.json", "r") as f:
            hyperparams = json.load(f)

        status, success, message = 200, True, "hyperparams fetched"

    except Exception as e:
        status, success, message, hyperparams = (
            500,
            False,
            "Could not fetch hyperparams ",
            {},
        )
    return JsonResponse(
        {"success": success, "message": message, "hyperparams": hyperparams},
        status=status,
    )


@api_view(["POST"])
@is_authenticated
def download_code(request):
    """
    Endpoint for dowloading generated code.
    Inputs:
    -------
    request:
        Requires: username & project_id in request data
                  token in request header
    Returns:
    --------
    response: HttpResponse (Required File)
              (Yes, not JsonResponse like other views)
    """
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")
        if not store_obj.exist(project_id):
            raise Exception("No such project exists")
        project_dir = store_obj.path + os.sep + project_id

        f = open(project_dir + os.sep + "test.py", "r")
        response = HttpResponse(f, content_type="application/x-python-code")
        response["Content-Disposition"] = "attachment; filename=test.py"

    except Exception as e:
        response = HttpResponse("<h1>File not found</h1>")
    return response


@api_view(["GET"])
@is_authenticated
def all_users(request):
    """
    Endpoint to get all the users
    Inputs:
    -------
    request:
        Requires: token in request header
    Returns:
    --------
    response: JsonResponse returning list of all the users
    """
    try:
        rootpath = os.path.expanduser("~/.autodl/")
        users = os.listdir(rootpath)
        status, success, message, users = 200, True, "Users fetched", users
    except Exception as e:
        status, success, message, users = (
            500,
            False,
            "Could not fetch users ",
            [],
        )
    return JsonResponse(
        {
            "success": success,
            "message": message,
            "users": users,
        },
        status=status,
    )


@api_view(["POST"])
@is_authenticated
def share_project(request):
    """
    Endpoint to share projects.
    Inputs:
    -------
    request:
        Requires:  user to share with, user sharing the project, project_id in request data
                  token in request header
    Returns:
    --------
    response: JsonResponse describing failure or success
    """

    try:
        share_with = request.data.get("share_with")
        username = request.data.get("username")

        user = User(username=username, password=None)
        user = user.find()
        project_id = request.data.get("project_id")

        store_obj = Store(user)
        project_dir = store_obj.path + os.sep + project_id

        with open(project_dir + os.sep + "meta.json", "r") as f:
            metadata = json.load(f)

        dst = os.path.join(
            store_obj.rootpath,
            share_with,
            "shared_" + str(project_id),
        )

        os.symlink(project_dir, dst)

        if not metadata.get("shared_with", None):
            metadata["shared_with"] = []
        metadata["shared_with"].append(share_with)
        with open(project_dir + os.sep + "meta.json", "w") as f:
            json.dump(metadata, f)
        status, success, message = 200, True, "Shared Successfully"

    except FileExistsError:
        status, success, message = (
            500,
            False,
            "Project is already being shared",
        )
    except OSError as e:
        if e.winerror == 1314:
            status, success, message = (
                500,
                False,
                "System administrator privileges are required to share projects.",
            )
        else:
            status, success, message = (
                500,
                False,
                "Could not share project",
            )
    except:
        status, success, message = 500, False, "Failed"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def local_deploy(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")

        if not store_obj.exist(project_id):
            raise Exception("No such project exists")

        project_dir = store_obj.path + os.sep + project_id

        model_categories = request.data.get("model_categories")

        deployment_dir = os.path.join(project_dir, "deployment")
        flask_app_url = os.getenv("FLASK_APP_HTTPS_URL")

        if os.path.exists(deployment_dir) and os.path.isdir(deployment_dir):
            for root, dirs, files in os.walk(deployment_dir, topdown=False):
                for name in files:
                    filename = os.path.join(root, name)
                    os.chmod(filename, stat.S_IWUSR)
                    os.remove(filename)
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            os.rmdir(deployment_dir)

        print(f"\n{username} initiated deployment on Localhost")
        print(f"\nCloning into {deployment_dir}\n")
        git.Repo.clone_from(f"{flask_app_url}", f"{deployment_dir}", branch="main")

        program_path = os.path.join(deployment_dir, "app.py")
        modified_flask_lines = []

        with open(program_path, "r") as flask_fh:

            flask_lines = flask_fh.readlines()

            categories = "CATEGORIES = []\n"
            modified_categories = f"CATEGORIES = {model_categories}\n"

            for line in flask_lines:
                if line == categories:
                    modified_flask_lines.append(modified_categories)
                else:
                    modified_flask_lines.append(line)

        with open(program_path, "w") as flask_fh:
            flask_fh.writelines(modified_flask_lines)

        status, success, message = 200, True, "Deployment Initiated Successfully"

    except Exception as e:
        status, success, message = 500, False, "Deployment Attempt Failed"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def cloud_deploy(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        store_obj = Store(user)
        project_id = request.data.get("project_id")

        if not store_obj.exist(project_id):
            raise Exception("No such project exists")

        project_dir = store_obj.path + os.sep + project_id

        model_categories = request.data.get("model_categories")

        # Create separate file for each chunk of pickle data

        pkl_file_bytes = request.data.get("pkl_file_bytes")
        pkl_file_content = bytearray(pkl_file_bytes.values())

        current_chunk = request.data.get("current_chunk")
        total_chunks = request.data.get("total_chunks")

        pkl_dir = os.path.join(project_dir, "pickle")
        pkl_path = os.path.join(pkl_dir, f"model.pkl")
        pkl_path = os.path.join(pkl_dir, f"model_{current_chunk}.pkl")

        try:
            os.mkdir(pkl_dir)
            print("Directory created")

            print(pkl_file_content)
            print(type(pkl_file_content))

            with open(pkl_path, "wb") as pkl_fh:
                pkl_fh.write(pkl_file_content)
                # pickle.dump(pkl_file_content, pkl_fh)

            print("File created")
        except Exception as e:
            print(e)

        # if os.path.exists(pkl_dir) and os.path.isdir(pkl_dir):
        #     with open(pkl_path, "wb") as pkl_fh:
        #         pickle.dump(pkl_file_content, pkl_fh)
        # else:
        #     os.mkdir(pkl_dir)
        #     with open(pkl_path, "wb") as pkl_fh:
        #         pickle.dump(pkl_file_content, pkl_fh)

        # deployment_dir = os.path.join(project_dir, "deployment")
        # flask_app_url = os.getenv("FLASK_APP_HTTPS_URL")

        # if os.path.exists(deployment_dir) and os.path.isdir(deployment_dir):
        #     for root, dirs, files in os.walk(deployment_dir, topdown=False):
        #         for name in files:
        #             filename = os.path.join(root, name)
        #             os.chmod(filename, stat.S_IWUSR)
        #             os.remove(filename)
        #         for name in dirs:
        #             os.rmdir(os.path.join(root, name))
        #     os.rmdir(deployment_dir)

        # print(f"\n{username} initiated deployment on Localhost")
        # print(f"\nCloning into {deployment_dir}\n")
        # git.Repo.clone_from(f"{flask_app_url}", f"{deployment_dir}", branch="main")

        # program_path = os.path.join(deployment_dir, "app.py")
        # pkl_path = os.path.join(deployment_dir, "model.pkl")
        # modified_flask_lines = []

        # with open(program_path, "r") as flask_fh, open(pkl_path, "wb") as pkl_fh:
        #     pickle.dump(pkl_file_content, pkl_fh)

        #     flask_lines = flask_fh.readlines()

        #     model_path = 'MODEL_PATH = ""\n'
        #     categories = "CATEGORIES = []\n"

        #     modified_model_path = 'MODEL_PATH = "./model.pkl"\n'
        #     modified_categories = f"CATEGORIES = {model_categories}\n"

        #     for line in flask_lines:
        #         if line == model_path:
        #             modified_flask_lines.append(modified_model_path)
        #         elif line == categories:
        #             modified_flask_lines.append(modified_categories)
        #         else:
        #             modified_flask_lines.append(line)

        # with open(program_path, "w") as flask_fh:
        #     flask_fh.writelines(modified_flask_lines)

        # if current_chunk == total_chunks:
        status, success, message = 200, True, "Cloud Deployment Successful"
        # else:
        #     pass

    except Exception as e:
        status, success, message = 500, False, "Deployment Attempt Failed"
    return JsonResponse({"success": success, "message": message}, status=status)
