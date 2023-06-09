import { VIDEO_TEST_URL } from '../config.js';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
import path from 'path';
import log from '../utils/logger.js';

const proxy = createProxyMiddleware({
    target: VIDEO_TEST_URL,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: function (path, req) {

        const resPath = path.replace(`/video-test/${req.params.id}/`, '');

        return resPath;
    },
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        const statusCode = proxyRes.statusCode;

        const baseUrl = `${req.protocol}://${req.get('host')}/video-test/${req.params.id}/`;
        const ext = path.extname(req.params[0]);
        const isManifest = ext === '.m3u8' || ext === '.mpd';
        
        if (statusCode === 200 && isManifest) {
            let manifest = '';
            manifest = responseBuffer.toString();                       
            manifest = manifest.replace(VIDEO_TEST_URL, baseUrl);
            return manifest;  
        } else if (statusCode === 301 || statusCode === 302) {
            res.statusCode = 403;
            log(req.params.id, 'This method does not support redirect responses', 'error');
            return responseBuffer;
        } else {
            res.statusCode = proxyRes.statusCode;
            res.headers = proxyRes.headers;
            return responseBuffer;
        }
    }),

});

export const videoTest = (req, res, next) => {
    
    const dateStart = new Date().toISOString();
    const {id} = req.params;
    const reqURI = `${VIDEO_TEST_URL}${req.params[0]}${req._parsedUrl.search || ''}`;

    try {
        proxy(req, res, next);
        // cmcdExtractorService(id, req, reqURI, {}, dateStart)
        
    } catch (error) {
        log(id, error, 'error');
        res.status(500).json({ message: 'Internal Server Error' });
    }
};