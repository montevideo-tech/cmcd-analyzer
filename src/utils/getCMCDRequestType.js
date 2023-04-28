const getCMCDRequestType = (req) =>{

  console.log(req)

  console.log(req?.query.CMCD);
  console.log(req?.headers);
  console.log(req?.headers['CMCD-Request']? true : false);

  if (req.query?.CMCD) {
    console.log('query');
  } else if (req?.headers['CMCD-Request'] || req.headers['CMCD-Object'] || req.headers['CMCD-Status'] || req.headers['CMCD-Session']) {
    console.log('headers');
  } else {
    
  }
  
}

export default getCMCDRequestType;
