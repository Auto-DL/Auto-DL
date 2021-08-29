import os
import posixpath
import shutil


class Store:
    def __init__(self, user):
        """Creates storage folder and directory structure.
        Inputs
        -------
        user: (dict) User Dictionary as Output of User.find()
        """
        self.user = user
        self.rootpath = os.path.expanduser("~/.autodl/")
        self.path = posixpath.join(self.rootpath, self.user.get("username"))

    def create(self, project=None):
        _path = self.path
        if project is not None:
            _path = posixpath.join(_path, project)
        os.makedirs(_path, exist_ok=True)
        return _path

    def exist(self, project=None):
        _path = self.path
        if project is not None:
            _path = posixpath.join(_path, project)
        return os.path.exists(_path)

    def delete(self, project=None):
        try:
            _path = self.path
            if project is not None:
                _path = posixpath.join(_path, project)
                if project.startswith("shared_"):
                    os.remove(_path)
                else:
                    shutil.rmtree(_path)
            else:
                shutil.rmtree(_path)
            return 0, None
        except Exception as e:
            return 1, str(e)

    def enlist(self):
        if not self.exist():
            raise Exception("No such file or directory, call create() first")
        return [f.name for f in os.scandir(self.path) if f.is_dir()]
