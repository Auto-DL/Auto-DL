import logging
import os
import ssl

import pymongo
from dotenv import load_dotenv

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)-15s | %(levelname)s - %(levelno)s | Line No: %(lineno)d | Module: %(module)s | %(message)s')
log = logging.getLogger(__name__)

load_dotenv()


def connect(db_name="auth_db"):
    """
    Connect to mongodb instance (url) in .env file.

    Parameter
    ----------
    db_name : str
        name of the database to connect

    Returns
    ---------
    db : object
        database client connection object
    """
    client = pymongo.MongoClient(
        os.getenv("MONGODB_URI"), ssl_cert_reqs=ssl.CERT_NONE)
    db = client[db_name]
    log.info("MongoDB connected")
    return db


if __name__ == "__main__":
    db = connect()
