from genericpath import isdir
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
import os
import git
import shutil

from authv1.store import Store
from authv1.models import User
from authv1.decorators import is_authenticated

from dlmml.parser import *
from dotenv import load_dotenv

from .utils import remove_dir, edit_flask_app, zip_flask_app

load_dotenv()


@api_view(["POST"])
@is_authenticated
def local_deploy(request):
    """
    Endpoint for locally deploying user model.
    Inputs:
    -------
    request:
        Requires: username, project_id, model_categories & model_download_type in request data
                  token in request header
    Returns:
    --------
    response: HttpResponse (Required Download)
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
        deployment_dir = os.path.join(project_dir, "deployment")

        model_categories = request.data.get("model_categories")
        model_download_type = request.data.get("model_download_type")

        # Cloning the Flask App to be deployed
        flask_app_url = os.getenv("FLASK_APP_HTTPS_URL")
        git.Repo.clone_from(f"{flask_app_url}", f"{deployment_dir}", branch="main")

        # Editing the Flask App to be deployed
        program_path = os.path.join(deployment_dir, "app.py")
        edit_flask_app(program_path, model_categories)

        if model_download_type == "zip":
            # Zipping the Flask App Repo
            zip_dir = os.path.join(project_dir, "deployment.zip")
            zip_flask_app(deployment_dir, zip_dir)

            response = HttpResponse(
                open(zip_dir, "rb"),
                headers={
                    "Content-Type": "application/zip",
                    "Content-Disposition": "attachment; filename=deployment.zip",
                },
            )

            remove_dir(deployment_dir)
            os.remove(zip_dir)

            return response

        else:
            status, success, message = 200, True, "Executable Downloaded Successfully"
            return JsonResponse({"success": success, "message": message}, status=status)

    except Exception as e:
        status, success, message = 500, False, "Deployment Attempt Failed"
        return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def cloud_deploy(request):
    """
    Endpoint for deploying user model to user-preferred cloud environment (AWS / GCP).
    Inputs:
    -------
    request:
        Requires: username, project_id, model_categories & pickle file details in request data
                  token in request header
    Returns:
    --------
    response: JsonResponse for Cloud Deployment describing Success or Failure
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

        # Accessing pickle uploaded in chunks
        current_chunk = request.data.get("current_chunk")
        total_chunks = request.data.get("total_chunks")
        pkl_file_bytes = request.data.get("pkl_file_bytes")
        pkl_file_content = bytearray(pkl_file_bytes.values())

        pkl_dir = os.path.join(project_dir, "pickle")
        pkl_path = os.path.join(pkl_dir, f"model.pkl")

        if os.path.exists(pkl_dir) and os.path.isdir(pkl_dir):
            with open(pkl_path, "ab") as pkl_fh:
                pkl_fh.write(pkl_file_content)
        else:
            os.mkdir(pkl_dir)
            with open(pkl_path, "wb") as pkl_fh:
                pkl_fh.write(pkl_file_content)

        if current_chunk == total_chunks:
            deployment_dir = os.path.join(project_dir, "deployment")
            remove_dir(deployment_dir)

            # Clone Flask App once upload complete
            flask_app_url = os.getenv("FLASK_APP_HTTPS_URL")
            git.Repo.clone_from(f"{flask_app_url}", f"{deployment_dir}", branch="main")

            # Copy pickle file into Cloned Flask Repo
            new_pkl_path = os.path.join(deployment_dir, "model.pkl")
            shutil.copy(pkl_path, new_pkl_path)
            remove_dir(pkl_dir)

            # Editing the Flask App to be deployed
            program_path = os.path.join(deployment_dir, "app.py")
            model_categories = request.data.get("model_categories")
            edit_flask_app(program_path, model_categories)

            status, success, message = 200, True, "Cloud Deployment Successful"
        else:
            status, success, message = 204, True, "Cloud Deployment Underway"

    except Exception as e:
        status, success, message = 500, False, "Deployment Attempt Failed"

    return JsonResponse({"success": success, "message": message}, status=status)


@api_view(["POST"])
@is_authenticated
def hybrid_deploy(request):
    """
    Endpoint for deploying user model in both local and cloud environments.
    Inputs:
    -------
    request:
        Requires: username, project_id, model_categories, download_type & pickle file details in request data
                  token in request header
    Returns:
    --------
    response: HttpResponse (Required Download) for Local Deployment
              JsonResponse for Cloud Deployment describing Success or Failure
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

        # Accessing pickle uploaded in chunks
        current_chunk = request.data.get("current_chunk")
        total_chunks = request.data.get("total_chunks")
        pkl_file_bytes = request.data.get("pkl_file_bytes")
        pkl_file_content = bytearray(pkl_file_bytes.values())

        pkl_dir = os.path.join(project_dir, "pickle")
        pkl_path = os.path.join(pkl_dir, f"model.pkl")

        if os.path.exists(pkl_dir) and os.path.isdir(pkl_dir):
            with open(pkl_path, "ab") as pkl_fh:
                pkl_fh.write(pkl_file_content)
        else:
            os.mkdir(pkl_dir)
            with open(pkl_path, "wb") as pkl_fh:
                pkl_fh.write(pkl_file_content)

        if current_chunk == total_chunks:
            deployment_dir = os.path.join(project_dir, "deployment")
            remove_dir(deployment_dir)

            # Clone Flask App once upload complete
            flask_app_url = os.getenv("FLASK_APP_HTTPS_URL")
            git.Repo.clone_from(f"{flask_app_url}", f"{deployment_dir}", branch="main")

            # Copy pickle file into Cloned Flask Repo
            new_pkl_path = os.path.join(deployment_dir, "model.pkl")
            shutil.copy(pkl_path, new_pkl_path)
            remove_dir(pkl_dir)

            model_categories = request.data.get("model_categories")
            model_download_type = request.data.get("model_download_type")

            program_path = os.path.join(deployment_dir, "app.py")
            edit_flask_app(program_path, model_categories)

            if model_download_type == "zip":
                # Zipping the Flask App Repo
                zip_dir = os.path.join(project_dir, "deployment.zip")
                zip_flask_app(deployment_dir, zip_dir)

                response = HttpResponse(
                    open(zip_dir, "rb"),
                    headers={
                        "Content-Type": "application/zip",
                        "Content-Disposition": "attachment; filename=deployment.zip",
                    },
                )

                os.remove(zip_dir)

                return response

            else:
                status, success, message = (
                    200,
                    True,
                    "Executable Downloaded Successfully",
                )
                return JsonResponse(
                    {"success": success, "message": message}, status=status
                )

        else:
            status, success, message = 204, True, "Hybrid Deployment Underway"

    except Exception as e:
        status, success, message = 500, False, "Deployment Attempt Failed"

    return JsonResponse({"success": success, "message": message}, status=status)
