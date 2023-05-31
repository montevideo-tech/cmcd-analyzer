import axios from 'axios';
import getCMCDRequestType from '../utils/getCMCDRequestType.js'
import { Transform } from 'stream';
import { getCMCDParameter } from '../utils/getCMCDParameter.js';
import { cmcdValidator } from '../utils/cmcdValidator.js';
import jsLogger from 'js-logger';
import saveData from '../utils/saveData.js';


export const video = async (req, res) => {
  const response = await axios.get(reqURI, { headers: newHeaders, query: req.query, responseType: 'stream' });

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const modifiedChunk = chunk.toString().toUpperCase(); 

      this.push(modifiedChunk);

      callback();
    }
  });

  res.set(response.headers);

  response.data.pipe(transformStream);

  transformStream.pipe(res);
};



export const cmcdExtractorService = async (req, reqURI, decodedJson, dateStart) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    const id = req.params['id'];
    const newHeaders = {...req.headers};
    delete newHeaders.host;
    const body = {};
    
    // reqest validation
    const type = getCMCDRequestType(req, id);
    const cmcdParam = getCMCDParameter(req, reqURI, type);
    const validatorRes = cmcdValidator(cmcdParam, type, id);

    const response = await axios.get(reqURI, { responseType: 'stream', headers:newHeaders, query: req.query });

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {

            const modifiedChunk = chunk.toString().toUpperCase();
            
            this.push(modifiedChunk);
            
            callback();
        }
    });
    
    response.data.pipe(transformStream);
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
    
    jsLogger.info(`${id}: Saving data into the database...`)
    // saveData(id, body);
    
    return {headers: response.headers, data: transformStream};
}
