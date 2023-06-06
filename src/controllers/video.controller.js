import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
import { decodeBase64AndConcat } from '../utils/decodeBse64Concat.js'
import { modifyManifest } from '../utils/modifyManifest.js';
import { encodeUrl } from '../utils/encodeBse64Concat.js'
import path from 'path';
import zlib from 'zlib';
import log from '../utils/logger.js';

export const video = (req, res, next) => {
    
    const dateStart = new Date().toISOString();
    const {id} = req.params;
    try {
        const ext = path.extname(req.params[0]);
        const isManifest = ext === '.m3u8' || ext === '.mpd';
        const jsonBase64 = req.params['jsonbase64'];
        const videoURL = req.params[0];
        const {concatenatedUrl, decodedJson}  = decodeBase64AndConcat(jsonBase64, videoURL);
        const baseUrl = `${req.protocol}://${req.get('host')}/video/${id}/`;

        const proxy = createProxyMiddleware({
            target: decodedJson.url,
            changeOrigin: true,
            selfHandleResponse: isManifest,
            pathRewrite: function (path, req) {

                const resPath = path.replace(`/video/${req.params.id}/${req.params.jsonbase64}`, '');

                return resPath;
            },
            onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                    
                switch (proxyRes.statusCode) {
                    case 200:
                        if (isManifest) {
                            let manifest = '';
                            manifest = responseBuffer.toString();                            
                            manifest = modifyManifest(concatenatedUrl, manifest, baseUrl, decodedJson);
                            return manifest;
                        } else {
                            return responseBuffer;
                        }
                            
                    // eslint-disable-next-line no-unreachable
                    break;

                    case 302:
                        // eslint-disable-next-line no-case-declarations
                        const newLocation = encodeUrl(proxyRes.headers['location'], baseUrl, decodedJson);

                        res.statusCode = proxyRes.statusCode;
                        res.setHeader('location', newLocation.concatenatedUrl);
                        return responseBuffer;
                    // eslint-disable-next-line no-unreachable
                    break;
                    case 301:
                    // ...
                    break;

                    default:
                        res.statusCode = proxyRes.statusCode;
                        return responseBuffer; 
                }
                
            }),

        });

        proxy(req, res, next);
        // cmcdExtractorService(id, req, concatenatedUrl, decodedJson, dateStart)
        
    } catch (error) {
        log(id, error, 'error');
        res.status(500).json({ message: 'Internal Server Error' });
    }
};