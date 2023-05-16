import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
import { VIDEO_TEST_URL } from '../config.js';

export const videoTest = async (req, res) => {

    try {
        const dateStart = new Date().toISOString();
        const { filename } = req.params
        const reqURI = VIDEO_TEST_URL.concat(filename);
        const {headers, data} = await cmcdExtractorService(req, reqURI, {}, dateStart);
        res.header(headers)
        data.pipe(res);
    } catch (error) {
        if (error.response) {
            // The client was given an error response (5xx, 4xx)
            console.log(error.response.status, error.response.statusText);
            res.status(error.response.status).send(error.response.statusText);
        // } else if (error.request) {
        //     // The client never received a response, and the request was never left
        } else {
            // Anything else
            res.status(500).send('Internal server error');
        }

    }

};
