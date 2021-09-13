from genericpath import isdir
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import sys
import os
import json
import importlib

from authv1.store import Store
from authv1.models import User
from authv1.decorators import is_authenticated
from v1.models import UserData
from dlmml.utils import json_to_dict
from dlmml.parser import *

from .utils import (
    generate_uid,
    copy_file,
    format_code,
    delete_broken_symlinks,
    generate_git_access_token,
    push_to_github,
    encrypt,
    decrypt,
    get_git_username,
)


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
def get_github_username(request):
    """
    Endpoint to get the username of the authorized github account
    Inputs:
    -------
    request:
        Requires:  username in request data
    Returns:
    --------
    response: JsonResponse having the username of the authorized github account on success else None if the user has not authorized the app or something goes wrong
    """
    username = request.data.get("username")
    user = User(username=username, password=None)
    user = user.find()

    if user["GitAccessToken"]:
        print(user["GitAccessToken"])
        decrypted_token = decrypt(user["GitAccessToken"])
        assert decrypted_token is not None
        git_username = get_git_username(decrypted_token)
        assert git_username is not None
        status, success, message = 200, True, "Github username fetched"
    else:
        git_username = None
        status, success, message = 200, True, "Github access token not set"
    return JsonResponse(
        {
            "success": success,
            "message": message,
            "git_username": git_username,
        },
        status=status,
    )


@api_view(["POST"])
@is_authenticated
def github_logout(request):
    """
    Endpoint to get the  logout of the authorized github account( deletes the stored token from the database)
    Inputs:
    -------
    request:
        Requires:  username in request data
    Returns:
    --------
    response: JsonResponse describing success or failure
    """
    username = request.data.get("username")
    try:
        user = User(username=username, password=None)
        this_user = user.find()
        if this_user.get("GitAccessToken"):
            user.update("GitAccessToken", None)

        status, success, message = 200, True, "Logged out"
    except Exception as e:
        print(e)
        status, success, message = 500, False, "Something went wrong"
    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def publish_on_github(request):
    """
    Endpoint to push the code to github

    Inputs:
    -------
    request:
        Requires:  username,project_id, details (commit_message,filename,reponame) in request data
    Returns:
    --------
    response: JsonResponse describing success or failure
    """
    username = request.data.get("username")
    details = request.data.get("details")
    project_id = details.get("project_id")
    commit_message = details.get("git_commit_message")
    filename = details.get("git_file_name")
    repo_name = details.get("git_repo_name")
    make_private = details.get("make_private")

    user = User(username=username, password=None)
    this_user = user.find()

    store_obj = Store(this_user)
    project_dir = store_obj.path + os.sep + project_id

    git_access_token = this_user.get("GitAccessToken")

    try:

        git_access_token = decrypt(git_access_token)
        assert git_access_token is not None
        push_status, message, repo_full_name = push_to_github(
            git_access_token,
            repo_name,
            filename,
            commit_message,
            make_private,
            project_dir,
        )
        if push_status == 200:
            status, success, message, repo_full_name = (
                200,
                True,
                "Successfully Published",
                repo_full_name,
            )
        else:
            status, success, message, repo_full_name = (
                500,
                False,
                "Something went wrong",
                "",
            )
    except:
        status, success, message, repo_full_name = (
            500,
            False,
            "Something went wrong",
            "",
        )
    return JsonResponse(
        {"success": success, "message": message, "repo_full_name": repo_full_name},
        status=status,
    )


@api_view(["POST"])
@is_authenticated
def authorize_github(request):
    """
    Endpoint to authorize the github account of the user
    Generates a new access token, encrypts it and stores it in the database
    Inputs:
    -------
    request:
        Requires:  username, code(to generate new access token) in request data
    Returns:
    --------
    response: JsonResponse describing success or failure
    """
    code = request.data.get("code")
    username = request.data.get("username")
    user = User(username=username, password=None)
    try:
        git_access_token = generate_git_access_token(code)
        assert git_access_token is not None
        encrypted_git_access_token = encrypt(git_access_token)
        assert encrypted_git_access_token is not None
        user.update("GitAccessToken", encrypted_git_access_token)
        status, success, message = (
            200,
            True,
            "Successfully authorized",
        )
    except Exception as e:
        print(e)
        status, success, message = (
            500,
            False,
            "Something went wrong",
        )
    return JsonResponse(
        {"success": success, "message": message},
        status=status,
    )
