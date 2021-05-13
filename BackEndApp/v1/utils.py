from uuid import uuid4 as uid
import os


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


if __name__ == "__main__":
    print(generate_uid())
