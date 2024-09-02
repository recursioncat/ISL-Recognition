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
    model = keras.models.load_model('gesturesV7.keras')
    data = request.get_json(force = True)

    url = data['url']

    image_arr = processImage(url)
    prediction = model.predict(image_arr)
    result = class_names[np.argmax(prediction[0])]
    return jsonify(result)

app.run(port=5000)
