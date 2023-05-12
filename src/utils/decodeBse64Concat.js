export const decodeBase64AndConcat = (b64Json, videoUrl) => {
    
    const decodedJson = JSON.parse(Buffer.from(b64Json, 'base64').toString().replaceAll('“','"').replaceAll('”','"'));
    let b64url = decodedJson.url;

    if(!b64url.endsWith("/")){
      b64url = `${b64url+'/'}`
    }
    
    const concatenatedUrl = `${b64url}${videoUrl}`;
  

    return concatenatedUrl;
};