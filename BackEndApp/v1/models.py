import sys

sys.path.append("..")

from django.db import models
from authv1.connector import connect

db = connect(db_name="user_data")


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
            return {"status": 0, "msg": str(e)}
