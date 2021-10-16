from django.db import models
from authv1.connector import connect
import logging
import sys

sys.path.append("..")


db = connect(db_name="user_data")

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)-15s | %(levelname)s - %(levelno)s | Line No: %(lineno)d | Module: %(module)s | %(message)s')
log = logging.getLogger(__name__)


class UserData:
    def __init__(self, meta, components, layers, parsed_layers, preprocess):
        self.meta = meta
        self.components = components
        self.layers = layers
        self.preprocess = preprocess
        self.parsed_layers = parsed_layers
        self.collection = db["ir"]

    def upload(self):
        data_doc = {
            "meta": self.meta,
            "components": self.components,
            "layers": self.layers,
            "preprocess": self.preprocess,
            "parsed_layers": self.parsed_layers,
        }
        try:
            self.collection.insert_one(data_doc)
            return {"status": 1, "msg": "success"}
        except Exception as e:
            log.exception('Exception Occured', e)
            return {"status": 0, "msg": str(e)}
