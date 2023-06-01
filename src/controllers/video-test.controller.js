import { VIDEO_TEST_URL } from '../config.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import zlib from 'zlib';

export const videoTest = (req, res, next) => {

    try {
        const proxy = createProxyMiddleware({
            target: VIDEO_TEST_URL,
            changeOrigin: true,
            selfHandleResponse: true,
            pathRewrite: function (path, req) {

                const resPath = path.replace(`/video-test/${req.params.id}/`, '');

                return resPath;
            },
            onProxyRes: function (proxyRes, req, res) {

                const headers = proxyRes.headers['content-encoding'];
                
                let body = [];
                proxyRes.on('data', function (chunk) {
                    body.push(chunk);
                });            

                proxyRes.on('end', function () {
                    let modifiedBody = '';
                    try {
                        if ( headers === 'gzip') {
                            const data = zlib.gunzipSync(Buffer.concat(body));

                            modifiedBody = data.toString().toUpperCase();
                        } else {
                            modifiedBody = Buffer.concat(body).toString().toUpperCase();
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                    res.end(modifiedBody);
                });

            }

        });

        proxy(req, res, next);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};