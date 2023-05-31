import { PORT } from "../config.js";
export const encodeUrl= (url, host, id) => {
    
    const fileName = url.split("/")[url.split("/").length - 1];
    const encodedUrl = Buffer.from(url, 'utf8').toString('base64');
    const concatenatedUrl = host + ":" + PORT + "/video/" + id + "/" + encodedUrl + "/" + fileName;
    
    return {concatenatedUrl, encodedUrl};
    
};

export const decodeUrl= (url) => {
    const base64String = url.split("/")[url.split("/").length - 2];
    const decodedUrl = Buffer.from(base64String, 'base64').toString();
    return {decodedUrl};
    
};