import { decodeBase64AndConcat } from "../services/cmcd-extractor.service.js";

export const index = (req, res) => {
    const base64String = "eyJ1cmwiOiJodHRwczovL2R4Y2xqOXZwM200NGMuY2xvdWRmcm9udC5uZXQvaGxzLyJ9";
    const videoFileUrl = "Costa_Rica_144.m3u8";
    
    const concatenatedUrl = decodeBase64AndConcat(base64String, videoFileUrl );
    
    res.json({ message: concatenatedUrl });
  };
