from flask import Flask, request, jsonify
from tensorflow import keras
from tensorflow.keras.preprocessing import image
import numpy as np
app = Flask(__name__)

class_names = class_names = ['1', '2', '3', '4', '5', '6','7','8','9', 'a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
model1 = keras.models.load_model('gesturesV7.keras')
model2 = keras.models.load_model('gesturesV11.keras')

def processImage(path):
    img = image.load_img(path, target_size=(128,128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array


@app.route('/predict', methods= ['POST'])
def predict():
    data = request.get_json(force = True)

    url = data['url']
    image_arr = processImage(url)
    prediction1 = np.argmax(model1.predict(image_arr)[0])
    prediction2 = np.argmax(model2.predict(image_arr)[0])

    if abs(prediction1 - prediction2) < 5 or prediction1 == prediction2:
        prediction = prediction2

    elif prediction1 > prediction2:
        prediction = prediction2

    elif prediction2 > prediction1:
        prediction = prediction1


    result = class_names[prediction]

    return jsonify(result)

app.run(port=5000)