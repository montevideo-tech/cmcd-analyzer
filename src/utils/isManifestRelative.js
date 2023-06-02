import jsLogger from 'js-logger';
import xml2js from 'xml2js';
import { encodeUrl } from './encodeBse64Concat.js';

const findElement = (obj, elementName, elementPath) => {
    if (typeof obj === 'object') {
      if (obj.hasOwnProperty(elementName)) {
        return obj[elementName];
      } else {
        for (const key in obj) {
          elementPath.push(key);
          const result = findElement(obj[key], elementName, elementPath);
          if (result) {
            return result;
          }
          elementPath.pop();
        }
      }
    }
    return null;
  }

const obtainManifestPathMpd = (manifest, baseUrl) => {
  let modifiedManifest = manifest;
    const parser = new xml2js.Parser();
    let xmlDoc;
    parser.parseString(manifest, (err, res) => {
      if (err) {
        jsLogger.error('Error parsing DASH manifest:', err);
        return;
      }
      xmlDoc = res;
    });
    let elementPath = [];
    const elements = ['BaseURL', 'media'];
    for (let e in elements) {
      const res = findElement(xmlDoc, elements[e], elementPath);
      if (res !== null) {
        const videoURL = res instanceof Array ? res[0] : res;
        if (videoURL.startsWith("http://") || videoURL.startsWith("https://") ){
        const encodedUrl = encodeUrl(videoURL, baseUrl);
        modifiedManifest.replace(videoURL, encodedUrl.concatenatedUrl);
      }
      }
    }
    return modifiedManifest;
}

const obtainManifestPathM3u8 = (manifest, baseUrl) => {
    const lines = manifest.split('\n');
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].startsWith('#') && (lines[i].startsWith("http://") || lines[i].startsWith("https://")) ){
          const encodedUrl = encodeUrl(lines[i], baseUrl);
          manifest.replace(lines[i], encodedUrl.concatenatedUrl);
        }
    }
    return manifest;
}

export const modifyManifest = (path, content, baseUrl) => {
    const manifest = path.includes('.m3u8') ? obtainManifestPathM3u8(content, baseUrl) : obtainManifestPathMpd(content, baseUrl);
    if(manifest === null){
        jsLogger.error('No manifest path found in this manifest.')
    }
    return manifest;
}

