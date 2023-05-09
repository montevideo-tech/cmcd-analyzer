import axios from 'axios';
import { getCMCDRequestType } from '../utils/getCMCDRequestType.js'
import { getCMCDParameter } from '../utils/getCMCDParameter.js';
import { cmcdValidator } from '../utils/cmcdValidator.js';

export const cmcdExtractorService = async (req, reqURI) => {
    // const { filename } = req.params
    // const reqURI = VIDEO_TEST_URL.concat(filename);
    const newHeaders = {...req.headers};
    delete newHeaders.host;
    
    // reqest validation
    const type = getCMCDRequestType(req);
    const cmcdParam = getCMCDParameter(req, reqURI, type);
    cmcdValidator(cmcdParam, type);

    const {headers, data} = await axios.get(reqURI, { responseType: 'stream', headers:newHeaders, query: req.query });
    return {headers: headers, data: data};
}
