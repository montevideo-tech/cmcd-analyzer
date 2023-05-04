import { decodeBase64AndConcat } from "../services/cmcd-extractor.service";

    const base64String = "eyJ1cmwiOiJodHRwczovL2R4Y2xqOXZwM200NGMuY2xvdWRmcm9udC5uZXQvaGxzLyJ9";
    const videoFileUrl = "Costa_Rica_144.m3u8";
    const decodedJson = {
        url: "https://dxclj9vp3m44c.cloudfront.net/hls/",
    };
    
    const concatenatedUrl = decodeBase64AndConcat(base64String, videoFileUrl );
    
    expect(base).toStrictEqual(decodedJson);
    

    