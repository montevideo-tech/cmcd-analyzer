import axios from 'axios';
import { VIDEO_TEST_URL } from '../config.js';
import { cmcdValidator } from '../services/cmcd-extractor.service.js';
import getCMCDRequestType from '../utils/getCMCDRequestType.js';
import jsLogger from 'js-logger';
import saveData from '../utils/saveData.js';

export const videoTestService = async (req) => {
    jsLogger.useDefaults({ defaultLevel: jsLogger.TRACE });
    const { filename, id } = req.params
    const reqURI = VIDEO_TEST_URL.concat(filename);
    const newHeaders = {...req.headers};
    delete newHeaders.host;
    var cmcdParam = '';
    const type = getCMCDRequestType(req);
    switch (type) {
        case 'QUERY':
            // eslint-disable-next-line no-case-declarations
            const queryParamString = new URLSearchParams(req?.query).toString();
            cmcdParam = `${reqURI}?${queryParamString}`;
            break;
        case 'JSON':
            cmcdParam = req?.body;
            break;
        case 'HEADER':
            cmcdParam = req.rawHeaders
                .reduce((acc, curr, i) => {
                    if (i % 2 === 0) {
                        return [...acc, `${curr}:`];
                    } else {
                        const lastIndex = acc.length - 1;
                        acc[lastIndex] = `${acc[lastIndex]} ${curr}`;
                        return acc;
                    }
                }, [])
                .join('\n');
            break;
    }

    const validatorRes = cmcdValidator(cmcdParam, type);
    const {headers, data} = await axios.get(reqURI, { responseType: 'stream', headers:newHeaders, query: req.query });
    
    jsLogger.info('Saving data into the database...')
    saveData(id, validatorRes);
    
    
    return {headers: headers, data: data};
}