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

from .utils import generate_uid, copy_file, format_code


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
        project_ids = store_obj.enlist()
        # print("store obj is", store_obj.enlist())
        projects = []

        for id in project_ids:
            if id != "shared":
                with open(
                    store_obj.path + os.sep + id + os.sep + "meta.json", "r"
                ) as f:
                    metadata = json.load(f)
                list_item = {id: metadata}
                projects.append(list_item)
            # else:
            #     all_shared_projects = [
            #         f.name
            #         for f in os.scandir(
            #             os.path.join(store_obj.rootpath, username, "shared")
            #         )
            #     ]
            #     for shared_project_id in all_shared_projects:
            #         # print("hereeeeeeeeeeeee", store_obj.rootpath)
            #         reference_path = (
            #             (store_obj.rootpath)
            #             + username
            #             + os.sep
            #             + "shared"
            #             + os.sep
            #             + shared_project_id
            #             + os.sep
            #             + "meta.json"
            #         )
            #         if not os.path.exists(reference_path):
            #             os.remove(
            #                 (store_obj.rootpath)
            #                 + username
            #                 + os.sep
            #                 + "shared"
            #                 + os.sep
            #                 + shared_project_id
            #             )
            #             continue
            #         with open(
            #             reference_path,
            #             "r",
            #         ) as f:
            #             print("writing")
            #             metadata = json.load(f)
            #         list_item = {"shared_" + shared_project_id: metadata}
            #         projects.append(list_item)

        status, success, message = 200, True, "Projects Fetched"
    except Exception as e:
        status, success, message, projects = (
            500,
            False,
            "Projects could not be fetched",
            "",
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

        store_obj = Store(user)
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
        print("metadata is", metadata)
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
            "shared_by": "",
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

        if model_layers:
            with open(project_dir + os.sep + "layers.json", "r") as f:
                layers = json.load(f)
                with open(clone_dir + os.sep + "layers.json", "w") as f:
                    json.dump(layers, f)

            with open(project_dir + os.sep + "components.json", "r") as f:
                components = json.load(f)
                with open(clone_dir + os.sep + "components.json", "w") as f:
                    json.dump(components, f)

        if preprocessing_parameters:
            with open(project_dir + os.sep + "preprocessing.json", "r") as f:
                preprocessing = json.load(f)
                with open(clone_dir + os.sep + "preprocessing.json", "w") as f:
                    json.dump(preprocessing, f)

        if hyper_parameters:
            with open(project_dir + os.sep + "hyperparams.json", "r") as f:
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


@api_view(["POST"])
@is_authenticated
def get_users(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        # print("type1", type(user))
        user = user.find()
        # print("type2", (user))
        # print("tyoe of store", (Store))
        store = Store(user)
        print("root path is", store.rootpath)
        users = os.listdir(store.rootpath)
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


@api_view(["GET"])
@is_authenticated
def get_all_users(request):
    try:
        rootpath = os.path.expanduser("~/.autodl/")
        # print("root path is", rootpath)
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
def update_sharing_details(request):
    try:
        # print("inside")
        print(request.data)
        owner = request.data.get("owner")
        share_with = request.data.get("share_with")
        shared_by = request.data.get("shared_by")
        print("second", share_with, shared_by)
        # if owner != "":
        #     username = owner
        # else:
        #     username = shared_by
        # print("username is", username)
        user = User(username=owner or shared_by, password=None)
        user = user.find()
        project_id = request.data.get("project_id")
        print("project is", project_id)
        store_obj = Store(user)
        project_dir = store_obj.path + os.sep + project_id
        print(store_obj.path, "       ", store_obj.rootpath)
        print("dir is", project_dir)
        with open(project_dir + os.sep + "meta.json", "r") as f:
            metadata = json.load(f)
        # if not (os.path.exists(os.path.join(store_obj.rootpath, share_with, "shared"))):
        #     os.makedirs(os.path.join(store_obj.rootpath, share_with, "shared"))

        print("hereeeeeeeeeee")
        try:
            src = os.path.join(project_dir)
            print("src is", src)
            dst = os.path.join(
                # store_obj.rootpath, share_with, "shared", +"shared_" + str(project_id)
                store_obj.rootpath,
                share_with,
                "shared_" + str(project_id),
            )
            print("dest is", dst)
            try:
                os.symlink(src, dst)
                if not metadata["shared_by"]:
                    metadata["shared_by"] = shared_by
                metadata["shared_with"].append(share_with)
                with open(project_dir + os.sep + "meta.json", "w") as f:
                    json.dump(metadata, f)
                status, success, message = 200, True, "Shared Successfully"
            except:
                status, success, message = (
                    500,
                    False,
                    "Project is already being shared :)",
                )

        except:
            status, success, message = 500, False, "Something went wrong"

    except:
        status, success, message = 500, False, "Failed"
    return JsonResponse({"success": success, "message": message}, status=status)
