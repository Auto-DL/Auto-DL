from uuid import uuid4 as uid

def generate_uid():
    id = uid()
    return str(id.hex)


if __name__ == "__main__":
    print(generate_uid())
