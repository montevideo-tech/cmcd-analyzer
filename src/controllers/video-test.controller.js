import { VIDEO_TEST_URL } from '../config.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
import path from 'path';
import zlib from 'zlib';

export const videoTest = (req, res, next) => {
    
    const dateStart = new Date().toISOString();
    const {id} = req.params;
    const ext = path.extname(req.params[0]);
    const isManifest = ext === '.m3u8' || ext === '.mpd';

    try {
        const proxy = createProxyMiddleware({
            target: VIDEO_TEST_URL,
            changeOrigin: true,
            selfHandleResponse: isManifest,
            pathRewrite: function (path, req) {

                const resPath = path.replace(`/video-test/${req.params.id}/`, '');

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
                            if ( contentEncoding === 'gzip') {
                                const data = zlib.gunzipSync(Buffer.concat(body));
    
                                modifiedBody = data.toString();
                            } else if (contentEncoding === 'br') {
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
                        res.end(modifiedBody);
                    });
                }

            }

        });

        proxy(req, res, next);
        const reqURI = `${VIDEO_TEST_URL}${req.params[0]}${req._parsedUrl.search || ''}`;
        cmcdExtractorService(id, req, reqURI, {}, dateStart)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};