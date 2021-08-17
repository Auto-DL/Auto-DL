from datetime import datetime

from .utils_tests import TestOTP


def test_create():
    otp = TestOTP()
    mock_otp = otp.mock_otp()

    generted_otp = mock_otp.create()
    second_genereted_otp = mock_otp.create()

    collection = mock_otp.collection
    username = mock_otp.username

    otp1 = collection.find_one({"username": username})
    stored_otp = otp1.get("otp")
    assert stored_otp != generted_otp and stored_otp == second_genereted_otp


def test_find():
    otp = TestOTP()
    mock_otp = otp.mock_otp()

    username = mock_otp.username
    collection = mock_otp.collection

    otp = mock_otp.create()
    assert mock_otp.find() == collection.find_one({"username": username})


def test_verify():
    otp = TestOTP()
    mock_otp = otp.mock_otp()

    collection = mock_otp.collection
    username = mock_otp.username

    mock_otp.create()
    assert (
        mock_otp.verify(collection.find_one({"username": username}).get("otp")) == True
    )
    mock_otp.create()
    collection.update_one(
        {"username": username},
        {"$set": {"expire": datetime.now()}},
        upsert=False,
    )
    assert (
        mock_otp.verify(collection.find_one({"username": username}).get("otp")) == False
    )


def test_delete():
    otp = TestOTP()
    mock_otp = otp.mock_otp()

    collection = mock_otp.collection
    username = mock_otp.username

    mock_otp.create()
    mock_otp.delete()
    assert collection.find_one({"useraname": username}) == None
