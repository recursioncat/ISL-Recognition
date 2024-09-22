import { textTranslate, imgToText , speechToText } from "./fileServicesHandler";

export default async function chatServicesHandler({ userId, message, mediaUrl, selectedService }) {
    if (!userId || (!message && !mediaUrl?.url) || !selectedService) {
        throw new Error('Please provide all required fields');
    }

    // Error: either message or mediaUrl must be provided
    if (!message && !mediaUrl.url) {
        throw new Error('Please upload an image, video, or audio to get service');
    }

    let result;
    const textServices = ['textTranslate', 'textToIsl', 'textToSpeech'];
    const imageServices = ['imgToIsl'];
    const audioServices = ['speechToText', 'speechToIsl'];
    const videoServices = ['IslVideoToText', 'IslVideoToVoice'];

    // Handle text services
    if (message) {
        if (!textServices.includes(selectedService)) {
            throw new Error('Unsupported text service');
        }

        switch (selectedService) {
            case 'textTranslate':
                result = await textTranslate(message);
                break;
            case 'textToIsl':
                // result = await textToIsl(message);
                console.log('textToIsl service is not available');
                break;
            case 'textToSpeech':
                // result = await textToSpeech(message);
                console.log('textToSpeech service is not available');
                break;
        }
    }

    // Handle media services
    if (mediaUrl?.url) {
        const { url, type: urlType } = mediaUrl;

        switch (urlType) {
            case 'image':
                if (!imageServices.includes(selectedService)) {
                    throw new Error('Unsupported image service');
                }

                if (selectedService === 'imgToIsl') {
                    // result = await imgToIsl(url);
                    console.log('imgToIsl service is not available');
                }
                break;

            case 'audio':
                if (!audioServices.includes(selectedService)) {
                    throw new Error('Unsupported audio service');
                }

                if (selectedService === 'speechToText') {
                    result = await speechToText(url);
                } else if (selectedService === 'speechToIsl') {
                    // result = await speechToIsl(url);
                    console.log('speechToIsl service is not available');
                }
                break;

            case 'video':
                if (!videoServices.includes(selectedService)) {
                    throw new Error('Unsupported video service');
                }

                if (selectedService === 'IslVideoToText') {
                    // result = await IslVideoToText(url);
                    console.log('ISLVideoToText service is not available');
                } else if (selectedService === 'IslVideoToVoice') {
                    // result = await IslVideoToVoice(url);
                    console.log('IslVideoToVoice service is not available');
                }
                break;

            default:
                throw new Error('Unsupported media type');
        }
    }

    return result;
}
