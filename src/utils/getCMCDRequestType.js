import jsLogger from 'js-logger';

const getCMCDRequestType = (req) =>{
  jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
  let type;

  if (req.query?.CMCD) {
    jsLogger.info('The request type is: QUERY.');
    type = 'QUERY';
  } else if (req?.headers['CMCD-Request'] || req.headers['CMCD-Object'] || req.headers['CMCD-Status'] || req.headers['CMCD-Session']) {
    jsLogger.info('The request type is: HEADER.');
    type = 'HEADER';
  } else if (req?.headers['Content-Type'] === 'application/json') {
    jsLogger.info('The request type is: JSON.');
    type = 'JSON';
  } else {
    jsLogger.info('No CMCD parameters in the request.');
    type = 'NoCMCD';
  }

  return type;
}

export default getCMCDRequestType;
