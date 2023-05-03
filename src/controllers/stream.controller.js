import axios from 'axios';

const url = 'https://dxclj9vp3m44c.cloudfront.net/dash/'

export const stream = async (req, res) => {

    try {
        const { filename } = req.params
        const reqURI = url.concat(filename);
        const newHeaders = {...req.headers};
        delete newHeaders.host;
        console.log(newHeaders);
        const {headers, data} = await axios.get(reqURI, { responseType: 'stream', headers:newHeaders, query: req.query });
        res.header(headers)
        data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

};
