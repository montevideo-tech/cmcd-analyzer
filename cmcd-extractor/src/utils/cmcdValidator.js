import { CMCDHeaderValidator, CMCDJsonValidator, CMCDQueryValidator } from "@montevideo-tech/cmcd-validator"; 
import log from "./logger.js";

// cmcdParam is a string, cmcdParam can be a header, a query or a json.
export const cmcdValidator = (cmcdParam, type, id) => {
    let valid;
    let validatorRes = {};
    switch (type) {
        case 'QUERY':
            validatorRes = CMCDQueryValidator(cmcdParam, null);
            valid = validatorRes.valid ?  'Query is valid.' : 'Query not valid.'
            log(id, {'message': valid}, 'info');
            log(id, validatorRes, 'info');
            break;
        case 'JSON':
            validatorRes = CMCDJsonValidator(cmcdParam, null, true);
            valid = validatorRes.valid ?  'Json is valid.' : 'Json not valid.';
            log(id, {'message': valid}, 'info');
            log(id, validatorRes, 'info');
            break;
        case 'HEADER':
            validatorRes = CMCDHeaderValidator(cmcdParam, null, true)
            valid =  validatorRes.valid ?  'Header is valid.' : 'Header not valid.'
            log(id, {'message': valid}, 'info');
            log(id, validatorRes, 'info');
            break;
        default:
            log(id, {'message': 'Invalid cmcd Parameter.'}, 'info');
            break;
    }
    return validatorRes;
}