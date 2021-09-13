from uuid import uuid4 as uid
import os
from github import Github

from cryptography.fernet import Fernet
import base64

from shutil import copyfile


def generate_uid():
    id = uid()
    return str(id.hex)


def get_augument_params():
    return {
        "image-augment-rotation_range": 40,
        "image-augment-width_shift_range": 0.2,
        "image-augment-height_shift_range": 0.2,
        "image-augment-horizontal_flip": "True",
        "image-augment-rescale": 0.0039215,
        "image-params-target_size": [200, 200],
        "image-params-batch_size": 64,
    }


def copy_file(dest, filename="test.py"):
    if not filename.endswith(".py"):
        filename += ".py"
    fsource = os.path.join(os.getcwd(), filename)
    fdestination = os.path.join(dest, filename)

    copyfile(fsource, fdestination)


def format_code(file):
    """
    Takes in the parser generated file and cleans the code.
    """
    os.system(
        "autoflake --in-place --remove-unused-variables --remove-all-unused-imports {}".format(
            file
        )
    )
    os.system("black {}".format(file))


def delete_broken_symlinks(path):
    for f in os.scandir(path):
        if os.path.islink(f) and not os.path.exists(f):
            os.remove(os.path.join(path, f.name))


def encrypt(txt):
    txt = str(txt)
    cipher_suite = Fernet(os.getenv("ENCRYPTION_KEY"))
    encrypted_text = cipher_suite.encrypt(txt.encode("ascii"))
    encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii")
    return encrypted_text


def decrypt(txt):
    txt = base64.urlsafe_b64decode(txt)
    cipher_suite = Fernet(os.getenv("ENCRYPTION_KEY"))
    decoded_text = cipher_suite.decrypt(txt).decode("ascii")
    return decoded_text


def generate_git_access_token(code):
    clientID = os.getenv("GITHUB_CLIENT_ID")
    secret = os.getenv("GITHUB_CLIENT_SECRET")
    try:
        oauth = g.get_oauth_application(clientID, secret)
        access_token = oauth.get_access_token(code=code)
        tokenID = access_token.token
        print("new acess token is", tokenID)
    except:
        tokenID = None
    return tokenID


def get_git_username(tokenID):
    try:
        g = Github(tokenID)
        user = g.get_user()
        username = user.login
    except Exception as e:
        print(e)
        username = None
    return username


def push_to_github(
    tokenID, repo_name, filename, commit_message, make_private, project_dir
):
    try:
        g = Github(tokenID)

        filename = filename.replace(" ", "_")
        if not filename.endswith(".py"):
            filename += ".py"

        repo = g.get_user().create_repo(repo_name, private=make_private)
        with open(project_dir + os.sep + "test.py") as f:
            file_content = f.read()

        repo_full_name = repo.full_name
        repo.create_file(filename, commit_message, file_content)
        status, message, repo_full_name = 200, "Success", repo_full_name

    except Exception as e:
        res = list(str(e).split(" ", 1))
        status, message, repo_full_name = int(res[0]), eval(res[1])["message"], ""

    return status, message, repo_full_name
