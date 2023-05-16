import axios from 'axios';
import getCMCDRequestType from '../utils/getCMCDRequestType.js'
import { getCMCDParameter } from '../utils/getCMCDParameter.js';
import { cmcdValidator } from '../utils/cmcdValidator.js';
import jsLogger from 'js-logger';
import saveData from '../utils/saveData.js';

export const cmcdExtractorService = async (req, reqURI) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    const id = req.params['id'];
    const newHeaders = {...req.headers};
    delete newHeaders.host;
    
    // reqest validation
    const type = getCMCDRequestType(req, id);
    const cmcdParam = getCMCDParameter(req, reqURI, type);
    const validatorRes = cmcdValidator(cmcdParam, type, id);

    const {headers, data} = await axios.get(reqURI, { responseType: 'stream', headers:newHeaders, query: req.query });
    jsLogger.info(`${id}: Saving data into the database...`)
    saveData(id, validatorRes);
    
    return {headers: headers, data: data};
}
