# unit tests for methods in store class

import pytest
import os
import posixpath
import tempfile

from authv1.store import Store
from tests.mocks import MockUser

tempdir = tempfile.mkdtemp()


def test_create():
    user = MockUser().mock_user()
    store = Store(user)
    store.rootpath = os.path.expanduser(tempdir + "/.autodl/")
    store.path = posixpath.join(store.rootpath, store.user.get("username"))

    test_path = store.path + "/test_project_dir"
    project_path = store.create(project="test_project_dir")
    assert test_path == project_path

    path_none = store.create()
    assert store.path == path_none


def test_exists():
    user = MockUser().mock_user()
    store = Store(user)
    store.rootpath = os.path.expanduser(tempdir + "/.autodl/")
    store.path = posixpath.join(store.rootpath, store.user.get("username"))

    project_path = store.create(project="test_project_dir")
    project_path_exists = store.exist(project="test_project_dir")
    assert project_path_exists == True

    project_path_none = store.exist()
    assert project_path_none == True


def test_delete():
    user = MockUser().mock_user()
    store = Store(user)
    store.rootpath = os.path.expanduser(tempdir + "/.autodl/")
    store.path = posixpath.join(store.rootpath, store.user.get("username"))

    project_path = store.create(project="test_project_dir")
    state, result = store.delete(project="test_project_dir")
    assert os.path.exists(project_path) == False

    shared_with_user = MockUser().mock_user()
    shared_with = shared_with_user.get("username")
    test_path = store.rootpath + shared_with + "/shared_test_project.json"
    file = "shared_test_project.json"
    with open(posixpath.join(store.path, file), "w") as fp:
        pass
    state, result = store.delete(project="shared_test_project.json")
    assert os.path.exists(test_path) == False

    project_path_none = store.create(project=None)
    state, result = store.delete(project=None)
    assert os.path.exists(project_path_none) == False


def test_enlist():
    user = MockUser().mock_user()
    store = Store(user)
    store.rootpath = os.path.expanduser(tempdir + "/.autodl/")
    store.path = posixpath.join(store.rootpath, store.user.get("username"))

    project_path_1 = store.create(project="test_project_dir_0")
    project_path_2 = store.create(project="test_project_dir_1")
    project_path_3 = store.create(project="test_project_dir_2")

    test_projects = store.enlist()
    if (
        "test_project_dir_0" in test_projects
        and "test_project_dir_1" in test_projects
        and "test_project_dir_2" in test_projects
    ):
        assert True
