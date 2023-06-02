import jsLogger from 'js-logger';
import xml2js from 'xml2js';

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

const obtainManifestPathMpd = (manifest) => {
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
        return videoURL;
      }
    }
    return null;
}

const obtainManifestPathM3u8 = (manifest) => {
    const lines = manifest.split('\n');
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].startsWith('#')){
          return lines[i];
        }
    }
    return null;
}

export const isManifestRelative = (path, content) => {
    const manifestPath = path.includes('.m3u8') ? obtainManifestPathM3u8(content) : obtainManifestPathMpd(content);
    if(manifestPath === null){
        jsLogger.error('No manifest path found in this manifest.')
    }
    return ((manifestPath.startsWith("http://") || manifestPath.startsWith("https://")) ? false : true);
}

