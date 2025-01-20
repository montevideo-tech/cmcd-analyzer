import { saveData } from '../utils/saveData.js';
import parseCMCDQueryToJson from '../utils/parseCMCDQueryToJson.js';

export const cmcdExtractorService = async ({id, req, reqURI, decodedJson, dateStart, cmcdMode}) => {
    const body = {};
    const rawData = req?.query['CMCD']
    if(rawData){
        const cmcd_keys = parseCMCDQueryToJson(req?.query['CMCD'])
        
        body.id = id;
        body['user-agent'] = req.headers['user-agent'];
        body['request_origin'] = req.headers.origin;
        body['request_ip'] = req.ip;
        body['received_datetime'] = dateStart;
        body['returned_datetime'] = new Date().toISOString(); 
        body['cdn_request_url'] = reqURI;
        body['cmcd_mode'] = cmcdMode;

        if (decodedJson) {
            delete decodedJson.url;
            Object.assign(body, decodedJson);
        }

        body['cmcd_keys'] = cmcd_keys;
        if(body['cmcd_keys'] && body['cmcd_keys']['ts']){
            body['cmcd_keys']['ts-date'] = new Date(body['cmcd_keys']['ts']).toISOString()
        }
        body['cmcd_data'] = rawData;
        
        saveData(id, body);
    }
}