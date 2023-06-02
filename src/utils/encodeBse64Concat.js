export const encodeUrl= (url, baseUrl) => {
    
    const fileName = url.split("/")[url.split("/").length - 1];
    const encodedUrl = Buffer.from(url, 'utf8').toString('base64');
    const concatenatedUrl = baseUrl + encodedUrl + "/" + fileName;
    
    return {concatenatedUrl, encodedUrl};
    
};
