# unit tests for User class methods

import pytest
import sys

sys.path.append("..")
from .utils_tests import TestUser
from .mocks import MockOS

mock_os_obj = MockOS()


def test_create(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    # No email attribute
    with pytest.raises(KeyError) as e:
        user = TestUser()
        mock_user = user.user_noEmail()
        mock_user.create()
    assert str(e.value) == "'Email is required'"

    # email already registered
    with pytest.raises(ValueError) as e:
        user = TestUser()
        mock_user = user.user_test()
        collection = mock_user.collection
        user_doc = {
            "username": "test_user1",
            "password": None,
            "first_name": "test",
            "last_name": "use",
            "email": "test_user@gmail.com",
            "is_verified": False,
        }
        collection.insert_one(user_doc)
        mock_user.create()
    assert str(e.value) == "Email invalid"

    # Invalid email signature
    with pytest.raises(ValueError) as e:
        user = TestUser()
        mock_user = user.user_invalidEmail()
        mock_user.create()
    assert str(e.value) == "Invalid email or email already exists"

    # username already exists
    with pytest.raises(ValueError) as e:
        user = TestUser()
        mock_user = user.user_test()
        collection = mock_user.collection
        user_doc = {
            "username": "test_user",
            "password": None,
            "first_name": "test",
            "last_name": "use",
            "email": "test_user0@gmail.com",
            "is_verified": False,
        }
        collection.insert_one(user_doc)
        mock_user.create()
    assert str(e.value) == "Invalid username or username already exists"

    # check if user is created
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    assert collection.find_one({"username": "test_user"}) is not None


def test_find(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    assert mock_user.find() == collection.find_one({"username": "test_user"})
    assert mock_user.find(by_email=True) == collection.find_one(
        {"email": "test_user@gmail.com"}
    )


def test_update(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    mock_user.update(field_name="email", new_value="test@gmail.com")
    assert collection.find_one({"email": "test@gmail.com"}) is not None


def test_delete(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    mock_user.delete()
    assert collection.find_one({"username": "test_user"}) is None
