import axios from 'axios';
import { VIDEO_TEST_URL } from '../config.js';

export const videoTestService = async (req) => {
    const { filename } = req.params
    const reqURI = VIDEO_TEST_URL.concat(filename);
    const newHeaders = {...req.headers};
    delete newHeaders.host;
    const {headers, data} = await axios.get(reqURI, { responseType: 'stream', headers:newHeaders, query: req.query });
    return {headers: headers, data: data};
}