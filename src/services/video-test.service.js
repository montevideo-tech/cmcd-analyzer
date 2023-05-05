import axios from 'axios';
import { VIDEO_TEST_URL } from '../config.js';
import { cmcdValidator } from '../services/cmcd-extractor.service.js';
import getCMCDRequestType from '../utils/getCMCDRequestType.js';

export const videoTestService = async (req) => {
    const { filename } = req.params
    const reqURI = VIDEO_TEST_URL.concat(filename);
    const newHeaders = {...req.headers};
    delete newHeaders.host;
    var cmcdParam = '';
    const type = getCMCDRequestType(req);
    switch (type) {
        case 'QUERY':
            const queryParamString = new URLSearchParams(req?.query).toString();
            cmcdParam = `${reqURI}?${queryParamString}`;
            break;
        case 'JSON':
            cmcdParam = req?.body;
            break;
        case 'HEADER':
            cmcdParam = Object.entries(req?.headers).map(([key, value]) => `${key}: ${value}`).join('\n');
            break;
    }

    cmcdValidator(cmcdParam, type);
    const {headers, data} = await axios.get(reqURI, { responseType: 'stream', headers:newHeaders, query: req.query });
    return {headers: headers, data: data};
}