import axios from 'axios';

const url = 'https://dxclj9vp3m44c.cloudfront.net/hls/'

export const stream = async (req, res) => {

    try {
        const { filename } = req.params
        const reqURI = url.concat(filename);
        const { data }  = await axios.get(reqURI, { responseType: 'stream', query: req.query });
        data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

};
