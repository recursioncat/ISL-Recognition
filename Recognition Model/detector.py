from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
model = keras.models.load_model('gesturesv7.keras')
class_names = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
               'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
               'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
               's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

def processImage(path):
    img = image.load_img(path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force = True)
    url = data['url']
    image_array = processImage(url)

    prediction = model.predict(image_array)

    return jsonify(class_names[np.argmax(prediction)])



if __name__ == '__main__':
    app.run(port=5000)