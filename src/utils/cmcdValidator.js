import { CMCDHeaderValidator, CMCDJsonValidator, CMCDQueryValidator } from "@montevideo-tech/cmcd-validator"; 
import jsLogger from 'js-logger';

// cmcdParam is a string, cmcdParam can be a header, a query or a json.
export const cmcdValidator = (cmcdParam, type, id) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    let valid;
    let validatorRes = {};
    switch (type) {
        case 'QUERY':
            validatorRes = CMCDQueryValidator(cmcdParam, null);
            valid = validatorRes.valid ?  'Query is valid.' : 'Query not valid.'
            jsLogger.info(`${id}: ${valid}`);
            jsLogger.info(`${id}: ${validatorRes}`);
            break;
        case 'JSON':
            validatorRes = CMCDJsonValidator(cmcdParam, null, true);
            valid = validatorRes.valid ?  'Json is valid.' : 'Json not valid.';
            jsLogger.info(`${id}: ${valid}`);
            jsLogger.info(`${id}: ${validatorRes}`);
            break;
        case 'HEADER':
            validatorRes = CMCDHeaderValidator(cmcdParam, null, true)
            valid =  validatorRes.valid ?  'Header is valid.' : 'Header not valid.'
            jsLogger.info(`${id}: ${valid}`);
            jsLogger.info(`${id}: ${validatorRes}`);
            break;
        default:
            jsLogger.info(`${id}: Invalid cmcd Parameter.`);
            break;
    }
    return validatorRes;
}