from uuid import uuid4 as uid
import os
from github import Github
from dotenv import load_dotenv
from cryptography.fernet import Fernet
import base64

load_dotenv()
g = Github()


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
    os.system('cp -f {} "{}"/{}'.format(filename, dest, filename))


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


def generate_git_access_token(code):
    clientID = os.getenv("GITHUB_CLIENT_ID")
    secret = os.getenv("GITHUB_CLIENT_SECRET")
    try:
        oauth = g.get_oauth_application(clientID, secret)

        access_token = oauth.get_access_token(code=code)
        tokenID = access_token.token
    except:
        print("exception has occured in generating token")
        tokenID = None
    return tokenID


def push_to_github(
    tokenID, repo_name, filename, commit_message, make_private, project_dir
):

    try:
        g = Github(tokenID)

        filename = filename
        filename = filename.replace(" ", "_")
        if not filename.endswith(".py"):
            filename += ".py"
        print(make_private)
        if make_private == True:
            make_private = True
        else:
            make_private = False

        print(filename, project_dir)
        print(make_private)
        repo = g.get_user().create_repo(repo_name, private=make_private)
        with open(project_dir + os.sep + "test.py") as f:
            file_content = f.read()
        file = repo.create_file(filename, commit_message, file_content)

        status, message = 200, "Success"

    except Exception as e:
        print("exception has occured")

        status, message = 401, "Internal Server Error"

    return status, message


# print(t.objects)
# return t


def encrypt(txt):
    try:
        txt = str(txt)
        cipher_suite = Fernet(os.getenv("ENCRYPT_KEY"))  # key should be byte
        encrypted_text = cipher_suite.encrypt(txt.encode("ascii"))

        encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii")
        return encrypted_text
    except Exception:
        return None


def decrypt(txt):
    try:
        txt = base64.urlsafe_b64decode(txt)
        cipher_suite = Fernet(os.getenv("ENCRYPT_KEY"))
        decoded_text = cipher_suite.decrypt(txt).decode("ascii")
        return decoded_text
    except Exception:
        return None
