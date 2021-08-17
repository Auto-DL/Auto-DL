# unit tests for methods in Session class

from .utils_tests import TestSession

test_session = TestSession()


def test_create():
    session_obj = test_session.mock_session()
    test_token = session_obj.create()
    assert test_token is not None

    session_obj_none = test_session.mock_none_session()
    test_token_none = session_obj_none.create()
    assert test_token_none is None


def test_delete():
    session_obj = test_session.mock_session()
    test_token = session_obj.create()
    return_value = session_obj.delete(test_token)
    assert return_value == True

    session_obj_none = test_session.mock_none_session()
    test_token_none = session_obj_none.create()
    return_value = session_obj_none.delete(test_token_none)
    assert return_value == False


def test_find():
    session_obj = test_session.mock_session()
    test_token = session_obj.create()
    return_token = session_obj.find(test_token)
    assert return_token["token"] == test_token

    session_obj_none = test_session.mock_none_session()
    test_token_none = session_obj_none.create()
    return_token_none = session_obj_none.find(test_token_none)
    assert return_token_none == None


def test_verify():
    session_obj = test_session.mock_session()
    test_token = session_obj.create()
    return_value = session_obj.verify(test_token)
    assert return_value == True

    session_obj_none = test_session.mock_none_session()
    test_token_none = session_obj_none.create()
    return_value = session_obj_none.verify(test_token_none)
    assert return_value == False
