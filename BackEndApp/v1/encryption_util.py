from cryptography.fernet import Fernet
import base64
import logging
import traceback
import os

from dotenv import load_dotenv

load_dotenv()


def encrypt(txt):
    try:
        txt = str(txt)
        cipher_suite = Fernet(os.getenv("ENCRYPT_KEY"))  # key should be byte
        encrypted_text = cipher_suite.encrypt(txt.encode("ascii"))

        encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii")
        return encrypted_text
    except Exception as e:
        logging.getLogger("error_logger").error(traceback.format_exc())
        return None


def decrypt(txt):
    try:
        txt = base64.urlsafe_b64decode(txt)
        cipher_suite = Fernet(os.getenv("ENCRYPT_KEY"))
        decoded_text = cipher_suite.decrypt(txt).decode("ascii")
        return decoded_text
    except Exception as e:
        logging.getLogger("error_logger").error(traceback.format_exc())
        return None
