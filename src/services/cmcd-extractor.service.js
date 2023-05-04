import { CMCDHeaderValidator, CMCDJsonValidator, CMCDQueryValidator } from "@montevideo-tech/cmcd-validator"; 
import jsLogger from 'js-logger';

// cmcdParam is a string, cmcdParam can be a header, a query or a json.
export const cmcdValidator = (cmcdParam, type) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    let valid;
    switch (type) {
        case 'QUERY':
            valid = CMCDQueryValidator(cmcdParam, null, true).valid ?  'Query is valid.' : 'Query not valid.'
            jsLogger.info(valid);
            jsLogger.info(CMCDQueryValidator(cmcdParam, null, true));
            break;
        case 'JSON':
            valid = CMCDJsonValidator(cmcdParam, null, true).valid ?  'Json is valid.' : 'Json not valid.'
            jsLogger.info(valid);
            jsLogger.info(CMCDJsonValidator(cmcdParam, null, true));
            break;
        case 'HEADER':
            valid = CMCDHeaderValidator(cmcdParam, null, true) ?  'Header is valid.' : 'Header not valid.'
            jsLogger.info(valid);
            jsLogger.info(CMCDHeaderValidator(cmcdParam, null, true));
            break;
        default:
            jsLogger.info('Invalid cmcd Parameter.');
            break;
    }
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