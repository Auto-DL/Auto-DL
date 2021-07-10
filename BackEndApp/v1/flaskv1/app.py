
from flask import Flask, request, url_for, redirect, render_template
from werkzeug.utils import secure_filename
import numpy as np
import tensorflow
import os
from tensorflow.keras.preprocessing import image


MODEL_PATH = ""

UPLOAD_FOLDER = "uploads"


app = Flask(__name__)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def predResult(result):
    """
    Takes the 'result' array obtained from model's predict method as input and 
    returns the predicted output class.
    """
    categories = []
    if result.size > 1:
        index = np.argmax(result)
        
    else:
        if result[0][0] < 0.5:
            index = 0
        else:
            index = 1
    output = categories[index]
    return output


@app.route("/")
def input_image():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    inputImage = request.files["img"]
    if not inputImage:
        return "No image uploaded!", 400

    filename = secure_filename(inputImage.filename)
    mimetype = inputImage.mimetype
    if not filename or not mimetype:
        return "Bad upload!", 400

    model = tensorflow.keras.models.load_model(MODEL_PATH)
    
    inputImage.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
    path = "uploads/" + filename
    kwargs = {}
    test_image = image.load_img(path, **kwargs)
    test_image = image.img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis=0)
    result = model.predict(test_image)
    prediction = predResult(result)

    return render_template("result.html", prediction=prediction)


if __name__ == "__main__":
    app.run(debug=True)
