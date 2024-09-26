import translate from '@iamtraction/google-translate';
import responseHandler from "../utils/resHandler.js";
import axios from 'axios'
 //google api setup
 import vision from '@google-cloud/vision';
 import speech from '@google-cloud/speech';
//Elevenlabs api
import { ElevenLabsClient, play } from "elevenlabs";
import { v4 as uuid } from 'uuid';
import  fs from "fs";
 const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
 import { createWriteStream } from 'fs';
 import path from 'path';
 

 
 export const textTranslate = async (text,ln = 'en') => {

    try {

        let translationOutput;

        await translate(text, { to: ln }).then(res => {

        translationOutput = res.text;

        }).catch(err => {
        
        console.error(err);
        
    });
    
    return translationOutput;
    
    } catch (error) {
        return { error: 'translation failed' }
    }
        
    }
    
    
 export const speechToText = async (file) => {
      
      
      const client = new speech.SpeechClient();
      
      let input = file.path || file.url;
      console.log("Processing audio:", input);
      
      async function quickstart() {
        let audio = {};
        let config = {
          encoding: 'MP3', // Default encoding, will be updated based on file type
          sampleRateHertz: 16000, // Default sample rate, adjust if necessary
          languageCode: 'en-US',
        };

        const deleteFile = async () => { if (file.path) { await fs.promises.unlink(file.path); } }
        
    try {
      if (input.startsWith('http://') || input.startsWith('https://')) {

        input = `${input.slice(0, input.length-1)}${3}`;
        const response = await axios.get(input, { responseType: 'arraybuffer' });
        
        const contentType = response.headers['content-type'];
        console.log(`Downloaded file content type: ${contentType}`);
        
        const audioContent = Buffer.from(response.data, 'binary').toString('base64');

        audio = { content: audioContent };
    
      } else {
        const audioContent = await fs.promises.readFile(input);
        const ext = path.extname(input).toLowerCase();
        console.log(`Local file extension: ${ext}`);

        audio = { content: audioContent.toString('base64') };
      }

      const request = {
        audio: audio,
        config: config
      };

      // Detects speech in the audio file
      console.log('Sending request to Google Speech-to-Text API...');
      const [response] = await client.recognize(request);
      if (!response.results || response.results.length === 0) {
        return 'No transcription available.';
      }

      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        // .join('\n');
      console.log(`Transcription: ${transcription}`);
      deleteFile();
      
      
      return transcription;
    } catch (error) {
      
      if (file.path) {
        try {
          deleteFile();
          console.log(`Deleted local file: ${file.path}`);
        } catch (deleteError) {
          console.error('Error deleting the file:', deleteError);
        }
      }
      console.error('Error during transcription:', error);
      throw error;
    }
  }

  // Execute the transcription process
  return await quickstart();
};
 
 export const imgToText = async (file) => {
    const client = new vision.ImageAnnotatorClient();
    console.log("image")

    try {
        let request;
        
        // Check if `file` is a URL (http or https)
        const isUrl = /^https?:\/\/.+\.(jpg|jpeg|png|bmp|gif)$/.test(file);

        if (isUrl) {
            // Prepare the request for a remote image (URL)
            request = {
                image: {
                    source: {
                        imageUri: file
                    }
                }
            };
        } else {
            // If it's not a URL, check if the local file exists
            if (!fs.existsSync(file.path)) {
                return { error: 'Image file does not exist' };
            }

            // Prepare the request for a local image file
            request = {
                image: {
                    content: fs.readFileSync(file.path) // Reads the file content as a buffer
                }
            };
        }

        // Perform OCR using Google Cloud Vision
        const [result] = await client.textDetection(request);

        const detections = result.textAnnotations;
        const text = detections[0] ? detections[0].description : '';
        if (file.path) { await fs.promises.unlink(file.path); } //dlete file
        return { "Image to text success": text };

    } catch (error) {
       if (file.path) { await fs.promises.unlink(file.path); } //delete file
       
        console.error(error);
        return { error: 'OCR processing failed' };
    }
};

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

<<<<<<< HEAD
// export const textToSpeech = async () => {


//   const client = new ElevenLabsClient({
//     apiKey: ELEVENLABS_API_KEY,
//   });
  
//   const createAudioFileFromText = async (text) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const audio = await client.generate({
//           voice: "Rachel",
//           model_id: "eleven_turbo_v2_5",
//           text,
//         });
//         const fileName = `${uuid()}.mp3`;
//         const fileStream = createWriteStream(fileName);
  
//         audio.pipe(fileStream);
//         fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
//         fileStream.on("error", reject);
//       } catch (error) {
//         console.log(error);
//         reject(error);
//       }
//     });
//   };

//   const response = await createAudioFileFromText("Hello World");
//   return {"tet-speech success": response}
// }
=======
export const textToSpeech = async (text) => {

    return new Promise(async (resolve, reject) => {
      try {
        const audio = await client.generate({
          voice: "Rachel",
          model_id: "eleven_turbo_v2_5",
          text,
        });
        const fileName = `${uuid()}.mp3`;
        const fileStream = createWriteStream(fileName);
  
        audio.pipe(fileStream);
        fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
        console.log("file name", fileName);
        fileStream.on("error", reject);
      } catch (error) {
        console.log(error);
        reject(error);
      }

    });

}
>>>>>>> 011cce821d90df84a97ad02dc7a13a66b02a4a38
