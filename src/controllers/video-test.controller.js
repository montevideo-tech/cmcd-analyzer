import { videoTestService } from '../services/video-test.service.js';

export const videoTest = async (req, res) => {

    try {
        const {headers, data} = await videoTestService(req);
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
