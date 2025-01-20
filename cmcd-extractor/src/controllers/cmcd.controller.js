import { cmcdExtractorService } from '../services/cmcd-extractor.service.js';
// import log from '../utils/logger.js';


export const cmcdEventMode = (req, res) => {
    req.dateStart = new Date().toISOString();
    const dateStart = req.dateStart;
    // const {id} = req.params;
    // console.log('id: ', id);
    const decodedJson = null;
    const id = "1";
    const reqURI= req.reqURI;
    const cmcdMode = "event"
    cmcdExtractorService({id, req, reqURI, decodedJson, dateStart, cmcdMode});
    res.send('ok');
};

export const cmcdResponseMode = (req, res) => { 
    req.dateStart = new Date().toISOString();
    const dateStart = req.dateStart;
    // const {id} = req.params;
    // console.log('id: ', id);
    const decodedJson = null;
    const id = "1";
    const reqURI= req.reqURI;
    const cmcdMode = "response"
    cmcdExtractorService({id, req, reqURI, decodedJson, dateStart, cmcdMode});
    res.send('ok');
};