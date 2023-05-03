import { videoTestService } from '../services/video-test.service.js';

export const videoTest = async (req, res) => {

    try {
        const {headers, data} = await videoTestService(req);
        console.log(headers, data)
        res.header(headers)
        data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

};
