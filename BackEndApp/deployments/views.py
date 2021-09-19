from genericpath import isdir
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
import os

from authv1.store import Store
from authv1.models import User
from authv1.decorators import is_authenticated
from deployments.models import Deployment

from dlmml.parser import *

from .utils import remove_dir, append_pkl_contents
from .exceptions import (
    AppDownloadFailed,
    AppUpsertionFailed,
    CloneGenerationFailed,
    PickleAppendFailed,
    PickleCopyFailed,
    ProjectNotFound,
)

import logging

logger = logging.getLogger(__name__)


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

    username = request.data.get("username")
    user = User(username=username, password=None)
    user = user.find()

    store_obj = Store(user)

    try:
        project_id = request.data.get("project_id")
        if not store_obj.exist(project_id):
            raise ProjectNotFound(project_id)

        project_dir = store_obj.path + os.sep + project_id
        deployment_dir = os.path.join(project_dir, "deployment")
        remove_dir(deployment_dir)

        model_categories = request.data.get("model_categories")
        model_download_type = request.data.get("model_download_type")

        deployment = Deployment(
            project_dir, deployment_dir, model_categories, model_download_type
        )

        deployment.clone_flask_app()
        logger.debug("Cloned Flask App to be deployed")

        deployment.edit_flask_app()
        logger.debug("Modified Flask App to be deployed")

        response = deployment.download_app()

    except ProjectNotFound:
        logger.error("Unable to find the Project")
        raise

    except CloneGenerationFailed:
        logger.error("Unable to clone the Flask App")
        raise

    except AppUpsertionFailed:
        logger.error("Unable to modify the Flask App")
        raise

    except AppDownloadFailed:
        logger.error("Unable to download the Flask App")
        raise

    else:
        logger.info("Local Deployment successful")
        return response


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

    username = request.data.get("username")
    user = User(username=username, password=None)
    user = user.find()

    store_obj = Store(user)

    try:
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

        # Appending pickle chunks
        append_pkl_contents(pkl_dir, pkl_path, pkl_file_content)

        if current_chunk == total_chunks:
            logger.info("Pickle file uploaded successfully")
            model_categories = request.data.get("model_categories")

            deployment_dir = os.path.join(project_dir, "deployment")
            remove_dir(deployment_dir)

            deployment = Deployment(project_dir, deployment_dir, model_categories)
            deployment.clone_flask_app()
            logger.debug("Cloned Flask App to be deployed")

            deployment.copy_pkl_file(pkl_path)
            remove_dir(pkl_dir)

            deployment.edit_flask_app()
            logger.debug("Modified Flask App to be deployed")

            status, success, message = 200, True, "Cloud Deployment Successful"
        else:
            status, success, message = 204, True, "Cloud Deployment Underway"

    except ProjectNotFound:
        logger.error("Unable to find the Project")
        raise

    except PickleAppendFailed:
        logger.error("Unable to append Pickle file contents")
        remove_dir(pkl_dir)
        raise

    except CloneGenerationFailed:
        logger.error("Unable to clone the Flask App")
        remove_dir(pkl_dir)
        raise

    except PickleCopyFailed:
        logger.error("Unable to copy pickle file into deployment directory")
        remove_dir(deployment_dir)
        remove_dir(pkl_dir)
        raise

    except AppUpsertionFailed:
        logger.error("Unable to modify the Flask App")
        remove_dir(deployment_dir)
        remove_dir(pkl_dir)
        raise

    else:
        logger.info("Cloud Deployment Successful")
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

    username = request.data.get("username")
    user = User(username=username, password=None)
    user = user.find()

    store_obj = Store(user)

    try:
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

        # Appending pickle chunks
        append_pkl_contents(pkl_dir, pkl_path, pkl_file_content)

        if current_chunk == total_chunks:
            logger.info("Pickle file upload successful")
            model_categories = request.data.get("model_categories")
            model_download_type = request.data.get("model_download_type")

            deployment_dir = os.path.join(project_dir, "deployment")
            remove_dir(deployment_dir)

            deployment = Deployment(
                project_dir, deployment_dir, model_categories, model_download_type
            )
            deployment.clone_flask_app()
            logger.debug("Cloned Flask App to be deployed")

            deployment.copy_pkl_file(pkl_path)
            remove_dir(pkl_dir)

            deployment.edit_flask_app()
            logger.debug("Modified Flask App to be deployed")

            response = deployment.download_app()

        else:
            status, success, message = 204, True, "Hybrid Deployment Underway"
            return JsonResponse({"success": success, "message": message}, status=status)

    except ProjectNotFound:
        logger.error("Unable to find the Project")
        raise

    except PickleAppendFailed:
        logger.error("Unable to append Pickle file contents")
        remove_dir(pkl_dir)
        raise

    except CloneGenerationFailed:
        logger.error("Unable to clone the Flask App")
        remove_dir(pkl_dir)
        raise

    except PickleCopyFailed:
        logger.error("Unable to copy file into deployment directory")
        remove_dir(deployment_dir)
        remove_dir(pkl_dir)
        raise

    except AppUpsertionFailed:
        logger.error("Unable to modify the Flask App")
        remove_dir(deployment_dir)
        remove_dir(pkl_dir)
        raise

    except AppDownloadFailed:
        logger.error("Unable to download the Flask App")
        remove_dir(pkl_dir)
        raise

    else:
        logger.info("Hybrid Deployment successful")
        return response
