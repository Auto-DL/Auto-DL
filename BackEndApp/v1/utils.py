from uuid import uuid4 as uid
import os

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


# if __name__ == "__main__":
#     print(generate_uid())
