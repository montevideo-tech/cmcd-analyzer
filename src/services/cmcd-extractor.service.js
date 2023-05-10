import { CMCDHeaderValidator, CMCDJsonValidator, CMCDQueryValidator } from "@montevideo-tech/cmcd-validator"; 
import jsLogger from 'js-logger';

// cmcdParam is a string, cmcdParam can be a header, a query or a json.
export const cmcdValidator = (cmcdParam, type) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    let valid;
    let validatorRes = {};
    switch (type) {
        case 'QUERY':
            validatorRes = CMCDQueryValidator(cmcdParam, null);
            valid = validatorRes.valid ?  'Query is valid.' : 'Query not valid.'
            jsLogger.info(valid);
            jsLogger.info(validatorRes);
            break;
        case 'JSON':
            validatorRes = CMCDJsonValidator(cmcdParam, null, true);
            valid = validatorRes.valid ?  'Json is valid.' : 'Json not valid.';
            jsLogger.info(valid);
            jsLogger.info(validatorRes);
            break;
        case 'HEADER':
            validatorRes = CMCDHeaderValidator(cmcdParam, null, true)
            valid =  validatorRes.valid ?  'Header is valid.' : 'Header not valid.'
            jsLogger.info(valid);
            jsLogger.info(validatorRes);
            break;
        default:
            jsLogger.info('Invalid cmcd Parameter.');
            break;
    }
    return validatorRes;
}

export const decodeBase64AndConcat = (b64Json, videoUrl) => {
    
    const decodedJson = JSON.parse(Buffer.from(b64Json, 'base64').toString());
    let b64url = decodedJson.url;

    if(!b64url.endsWith("/")){
      b64url = `${b64url+'/'}`
    }
    
    const concatenatedUrl = `${b64url}${videoUrl}`;
  

    return concatenatedUrl;
  };