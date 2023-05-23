import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
import { decodeBase64AndConcat } from '../utils/decodeBse64Concat.js';
import log from '../utils/logger.js';

export const video = async (req, res) => {
    const id = req.params['id'];

    try {
        const dateStart = new Date().toISOString();
        const jsonBase64 = req.params['jsonbase64'];
        const videoURL = req.params['filename'];
        const {concatenatedUrl, decodedJson}  = decodeBase64AndConcat(jsonBase64, videoURL);
        const {headers, data} = await cmcdExtractorService(id, req, concatenatedUrl, decodedJson, dateStart);
        res.header(headers)
        data.pipe(res);
    } catch (error) {
        if (error.response) {
            // The client was given an error response (5xx, 4xx)
            log(id, {'error.response.status': error.response.status, 'error.response.statusText': error.response.statusText}, error);
            res.status(error.response.status).send(error.response.statusText);
        // } else if (error.request) {
        //     // The client never received a response, and the request was never left
        } else {
            // Anything else
            res.status(500).send('Internal server error');
        }

    }

};
