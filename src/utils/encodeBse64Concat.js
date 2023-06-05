export const encodeUrl= (url, baseUrl, decodedJson) => {
    
    const fileName = url.split("/")[url.split("/").length - 1];
    const jsonUrl = {...decodedJson};
    jsonUrl.url = url.replace(fileName, '');

    const encodedUrl = Buffer.from(JSON.stringify(jsonUrl), 'utf8').toString('base64');
    const concatenatedUrl = baseUrl + encodedUrl + "/" + fileName;
    
    return {concatenatedUrl, encodedUrl};
    
};
