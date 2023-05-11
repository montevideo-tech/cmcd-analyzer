import jsLogger from 'js-logger';

const getCMCDRequestType = (req) =>{
  jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
  let type;

  if (req.query?.CMCD) {
    jsLogger.info('The request type is: QUERY.');
    type = 'QUERY';
  } else if (req?.headers['cmcd-request'] || req.headers['cmcd-object'] || req.headers['cmcd-status'] || req.headers['cmcd-session']) {
    jsLogger.info('The request type is: HEADER.');
    type = 'HEADER';
  } else if (req?.headers['Content-Type'] === 'application/json') {
    jsLogger.info('The request type is: JSON.');
    type = 'JSON';
  } else {
    jsLogger.info('No CMCD parameters in the request.');
    type = 'QUERY';
  }

  return type;
}

export default getCMCDRequestType;
