import jsLogger from 'js-logger';

const getCMCDRequestType = (req, id) =>{
  jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
  let type;

  if (req.query?.CMCD) {
    jsLogger.info(`${id}: The request type is: QUERY.`);
    type = 'QUERY';
  } else if (req?.headers['cmcd-request'] || req.headers['cmcd-object'] || req.headers['cmcd-status'] || req.headers['cmcd-session']) {
    jsLogger.info(`${id}: The request type is: HEADER.`);
    type = 'HEADER';
  } else if (req?.headers['Content-Type'] === 'application/json') {
    jsLogger.info(`${id}: The request type is: JSON.`);
    type = 'JSON';
  } else {
    jsLogger.info(`${id}: No CMCD parameters in the request.`);
    type = 'QUERY';
  }

  return type;
}

export default getCMCDRequestType;
