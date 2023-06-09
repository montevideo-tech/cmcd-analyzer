import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
import { decodeBase64AndConcat } from '../utils/decodeBse64Concat.js'
import { modifyManifest } from '../utils/modifyManifest.js';
import { encodeUrl } from '../utils/encodeBse64Concat.js'
import path from 'path';
import log from '../utils/logger.js';

const MAX_PROXY_CACHE_SIZE = 20;

const proxyCache = {
  cache: {},
  queue: [],
  addProxy(target, proxy) {
    if (this.queue.length >= MAX_PROXY_CACHE_SIZE) {
      const expiredProxyTarget = this.queue.shift();
      delete this.cache[expiredProxyTarget];
    }
    this.cache[target] = proxy;
    this.queue.push(target);
  },
  getProxy(target) {
    return this.cache[target];
  }
};

export const video = (req, res, next) => {
    
    const dateStart = new Date().toISOString();
    const {id} = req.params;
    try {

        const videoURL = req.params[0];
        const jsonBase64 = req.params['jsonbase64'];
        const {concatenatedUrl, decodedJson}  = decodeBase64AndConcat(jsonBase64, videoURL);

        let proxy = proxyCache.getProxy(decodedJson.url);
        if (!proxy) {
            proxy = createProxyMiddleware({
                target: decodedJson.url,
                changeOrigin: true,
                selfHandleResponse: true,
                pathRewrite: (path, req) => {

                    const resPath = path.replace(`/video/${req.params.id}/${req.params.jsonbase64}`, '');

                    return resPath;
                },
                onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                    const statusCode = proxyRes.statusCode;

                    const baseUrl = `${req.protocol}://${req.get('host')}/video/${req.params.id}/`;
                    const ext = path.extname(req.params[0]);
                    const isManifest = ext === '.m3u8' || ext === '.mpd';
                    const jsonBase64 = req.params['jsonbase64'];
                    const videoURL = req.params[0];
                    const {concatenatedUrl, decodedJson} = decodeBase64AndConcat(jsonBase64, videoURL);
                    
                    if (statusCode === 200 && isManifest) {
                        let manifest = '';
                        manifest = responseBuffer.toString();                            
                        manifest = modifyManifest(concatenatedUrl, manifest, baseUrl, decodedJson);
                        return manifest;  
                    } else if (statusCode === 301 || statusCode === 302) {
                        const { concatenatedUrl } = encodeUrl(proxyRes.headers['location'], baseUrl, decodedJson);

                        res.statusCode = proxyRes.statusCode;
                        res.setHeader('location', concatenatedUrl);
                        return responseBuffer;
                    } else {
                        res.statusCode = proxyRes.statusCode;
                        res.headers = proxyRes.headers;
                        return responseBuffer;
                    }
                }),
            });
            proxyCache.addProxy(decodedJson.url, proxy);
        }

        proxy(req, res, next);
        // cmcdExtractorService(id, req, concatenatedUrl, decodedJson, dateStart)
        
    } catch (error) {
        log(id, error, 'error');
        res.status(500).json({ message: 'Internal Server Error' });
    }
};