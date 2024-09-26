import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream } from "fs";

// import { v4 as uuid } from "uuid";

const ELEVENLABS_API_KEY = "sk_a9559739392057371d920c185f42c8242f6ff9fe674328f2"

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

export const createAudioFileFromText = async (
  text: string
): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: "Rachel",
        model_id: "eleven_turbo_v2",
        text,
      });
      const fileName = `eleven.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
      fileStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};