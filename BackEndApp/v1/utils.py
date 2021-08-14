from uuid import uuid4 as uid
import os
from github import Github

# g = Github("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")
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


# if __name__ == "__main__":
#     print(generate_uid())


def get_access_token(code):
    clientID = "cf38877318e6d0fb3c51"
    secret = "fe4a30a8712d3621ad02799e739ef913d660cc53"
    oauth = g.get_oauth_application(clientID, secret)
    url = oauth.get_login_url()
    access_token = oauth.get_access_token(code=code)
    tokenID = access_token.token
    print("token is")
    
    print(tokenID)
    gnew = Github(tokenID)
    repos = gnew.get_user().get_repos()
    for i in repos:
        print(i)
    # print(t.objects)
    # return t
