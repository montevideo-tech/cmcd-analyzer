import { createProxyMiddleware } from 'http-proxy-middleware';
import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
import { decodeBase64AndConcat } from '../utils/decodeBse64Concat.js'
import path from 'path';
import zlib from 'zlib';

export const video = (req, res, next) => {
    
    const dateStart = new Date().toISOString();
    const {id} = req.params;
    const ext = path.extname(req.params[0]);
    const isManifest = ext === '.m3u8' || ext === '.mpd';
    const jsonBase64 = req.params['jsonbase64'];
    const videoURL = req.params[0];
    const {concatenatedUrl, decodedJson}  = decodeBase64AndConcat(jsonBase64, videoURL);

    try {
        const proxy = createProxyMiddleware({
            target: decodedJson.url,
            changeOrigin: true,
            selfHandleResponse: isManifest,
            pathRewrite: function (path, req) {

                const resPath = path.replace(`/video/${req.params.id}/${req.params.jsonbase64}`, '');

                return resPath;
            },
            onProxyRes: function (proxyRes, req, res) {

                if (isManifest)
                {
                    const contentEncoding = proxyRes.headers['content-encoding'];
                
                    let body = [];
                    proxyRes.on('data', function (chunk) {
                        body.push(chunk);
                    });            
    
                    proxyRes.on('end', function () {
                        let modifiedBody = '';
                        try {
                            if (contentEncoding === 'gzip') {
                                const data = zlib.gunzipSync(Buffer.concat(body));
    
                                modifiedBody = data.toString();
                            }
                            else if (contentEncoding === 'br') {
                                const data = zlib.brotliDecompressSync(Buffer.concat(body));
                                modifiedBody = data.toString();
                            }
                            else {
                                modifiedBody = Buffer.concat(body).toString();
                            }
                        }
                        catch (err) {
                            console.log(err);
                        }
                        //modifyManifest
                        console.log(modifiedBody);
                        res.end(modifiedBody);
                    });
                }

            }

        });

        proxy(req, res, next);
        cmcdExtractorService(id, req, concatenatedUrl, decodedJson, dateStart)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};