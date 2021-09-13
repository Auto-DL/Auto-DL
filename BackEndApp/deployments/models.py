import os
import git
import shutil

from .utils import zip_flask_app
from .exceptions import (
    AppDownloadFailed,
    AppUpsertionFailed,
    CloneGenerationFailed,
    PickleCopyFailed,
)

from django.http import JsonResponse, HttpResponse


class Deployment:
    def __init__(
        self, project_dir, deployment_dir, model_categories, model_download_type="zip"
    ):
        self.project_dir = project_dir
        self.deployment_dir = deployment_dir
        self.model_categories = model_categories
        self.model_download_type = model_download_type

    def clone_flask_app(self):
        try:
            flask_app_url = os.getenv("FLASK_APP_HTTPS_URL")
            git.Repo.clone_from(
                f"{flask_app_url}", f"{self.deployment_dir}", branch="main"
            )

        except Exception as e:
            raise CloneGenerationFailed(self.deployment_dir) from e

    def copy_pkl_file(self, pkl_path):
        try:
            new_pkl_path = os.path.join(self.deployment_dir, "model.pkl")
            shutil.copy(pkl_path, new_pkl_path)

        except Exception as e:
            raise PickleCopyFailed(pkl_path) from e

    def edit_flask_app(self):
        try:
            program_path = os.path.join(self.deployment_dir, "app.py")
            modified_flask_lines = []

            with open(program_path, "r") as flask_fh:
                flask_lines = flask_fh.readlines()

                model_path = 'MODEL_PATH = ""\n'
                categories = "CATEGORIES = []\n"

                modified_model_path = 'MODEL_PATH = "./model.pkl"\n'
                modified_categories = f"CATEGORIES = {self.model_categories}\n"

                for line in flask_lines:
                    if line == model_path:
                        modified_flask_lines.append(modified_model_path)
                    elif line == categories:
                        modified_flask_lines.append(modified_categories)
                    else:
                        modified_flask_lines.append(line)

            with open(program_path, "w") as flask_fh:
                flask_fh.writelines(modified_flask_lines)

        except Exception as e:
            raise AppUpsertionFailed(self.deployment_dir) from e

    def download_app(self):
        try:
            if self.model_download_type == "zip":
                zip_dir = os.path.join(self.project_dir, "deployment.zip")
                zip_flask_app(self.deployment_dir, zip_dir)

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

        except Exception as e:
            raise AppDownloadFailed(self.deployment_dir) from e
