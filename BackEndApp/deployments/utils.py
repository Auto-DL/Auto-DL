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


def zip_flask_app(deployment_dir, zip_dir):
    current_dir = os.getcwd()
    os.chdir(deployment_dir)

    filePaths = retrieve_file_paths(".")
    zip_file = zipfile.ZipFile(zip_dir, "w")
    with zip_file:
        for file in filePaths:
            zip_file.write(file)

    os.chdir(current_dir)


def append_pkl_contents(pkl_dir, pkl_path, pkl_file_content):
    if os.path.exists(pkl_dir) and os.path.isdir(pkl_dir):
        with open(pkl_path, "ab") as pkl_fh:
            pkl_fh.write(pkl_file_content)
    else:
        os.mkdir(pkl_dir)
        with open(pkl_path, "wb") as pkl_fh:
            pkl_fh.write(pkl_file_content)
