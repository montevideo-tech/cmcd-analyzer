import log from './logger.js';

const getCMCDRequestType = (req, id) =>{
  let type;

  if (req.query?.CMCD) {
    log(id, {'message': 'The request type is: QUERY.'}, 'info');
    type = 'QUERY';
  } else if (req?.headers['cmcd-request'] || req.headers['cmcd-object'] || req.headers['cmcd-status'] || req.headers['cmcd-session']) {
    log(id, {'message': 'The request type is: HEADER.'}, 'info');
    type = 'HEADER';
  } else if (req?.headers['Content-Type'] === 'application/json') {
    log(id, {'message': 'The request type is: JSON.'}, 'info');
    type = 'JSON';
  } else {
    log(id, {'message': 'No CMCD parameters in the request.'}, 'info');
    type = 'QUERY';
  }

  return type;
}

export default getCMCDRequestType;
