import getCMCDRequestType from '../utils/getCMCDRequestType.js'
import { getCMCDParameter } from '../utils/getCMCDParameter.js';
import { cmcdValidator } from '../utils/cmcdValidator.js';
import { saveData } from '../utils/saveData.js';

export const cmcdExtractorService = async (id, req, reqURI, decodedJson, dateStart) => {
    const body = {};
    
    // reqest validation
    const type = getCMCDRequestType(req, id);
    const cmcdParam = getCMCDParameter(req, reqURI, type);
    const validatorRes = cmcdValidator(cmcdParam, type, id);

    body.id = id;
    body['user-agent'] = req.headers['user-agent'];
    body['request_ip'] = req.headers.origin;
    body['received_datetime'] = dateStart;
    body['returned_datetime'] = new Date().toISOString(); 
    body['cdn_request_url'] = reqURI;
    delete decodedJson.url;
    Object.assign(body, decodedJson);
    body.valid = validatorRes.valid;
    body.errors = validatorRes.errors;
    body.warnings = validatorRes.warnings;
    body['cmcd_keys'] = validatorRes.parsedData;
    body['cmcd_data'] = validatorRes.rawData;
    
    saveData(id, body);
}
