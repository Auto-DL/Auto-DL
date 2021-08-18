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


def generate_git_access_token(code):
    clientID = "cf38877318e6d0fb3c51"
    secret = "fe4a30a8712d3621ad02799e739ef913d660cc53"
    oauth = g.get_oauth_application(clientID, secret)
    # url = oauth.get_login_url()
    access_token = oauth.get_access_token(code=code)
    tokenID = access_token.token
    print("token is")
    print(tokenID)
    # gnew = Github(tokenID)
    # repos = gnew.get_user().get_repos()
    # print("curret repos are")
    # for i in repos:
    #     print(i)
    # print("adding new repo")
    # repo = gnew.get_user().create_repo("myrepo")
    # # add a file to the repository
    # file_name = "myfile.txt"
    # file_content = "my file content"
    # file = repo.create_file(file_name, "inital commit", file_content)
    # print("file added")

    # print("current new repos are")
    # for i in repos:
    #     print(i)
    return tokenID


def publish_to_github(
    tokenID, repo_name="audo-dl", proj_name="audo-dl first project.py"
):
    try:
        g = Github(tokenID)
        repo = g.get_user().create_repo(repo_name)
        file_name = proj_name
        with open(
            "/home/rajtiwari/.autodl/raj/2a5d611ae8f942daa7047a27a4af9192/test.py"
        ) as f:
            file_content = f.read()
        file = repo.create_file(file_name, "inital commit", file_content)
    except Exception as e:
        print(e)


# print(t.objects)
# return t
