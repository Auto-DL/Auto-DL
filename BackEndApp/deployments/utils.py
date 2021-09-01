import os
import stat
import zipfile


def retrieve_file_paths(dirName):
    filePaths = []

    for root, _, files in os.walk(dirName):
        for filename in files:
            filePath = os.path.join(root, filename)
            filePaths.append(filePath)

    return filePaths


def remove_dir(deployment_dir):
    if os.path.exists(deployment_dir) and os.path.isdir(deployment_dir):
        for root, dirs, files in os.walk(deployment_dir, topdown=False):
            for name in files:
                filename = os.path.join(root, name)
                os.chmod(filename, stat.S_IWUSR)
                os.remove(filename)
            for name in dirs:
                os.rmdir(os.path.join(root, name))
        os.rmdir(deployment_dir)


def edit_flask_app(program_path, model_categories):
    modified_flask_lines = []

    with open(program_path, "r") as flask_fh:
        flask_lines = flask_fh.readlines()

        model_path = 'MODEL_PATH = ""\n'
        categories = "CATEGORIES = []\n"

        modified_model_path = 'MODEL_PATH = "./model.pkl"\n'
        modified_categories = f"CATEGORIES = {model_categories}\n"

        for line in flask_lines:
            if line == model_path:
                modified_flask_lines.append(modified_model_path)
            elif line == categories:
                modified_flask_lines.append(modified_categories)
            else:
                modified_flask_lines.append(line)

    with open(program_path, "w") as flask_fh:
        flask_fh.writelines(modified_flask_lines)


def zip_flask_app(deployment_dir, zip_dir):
    current_dir = os.getcwd()
    os.chdir(deployment_dir)

    filePaths = retrieve_file_paths(".")
    zip_file = zipfile.ZipFile(zip_dir, "w")
    with zip_file:
        for file in filePaths:
            zip_file.write(file)

    os.chdir(current_dir)
