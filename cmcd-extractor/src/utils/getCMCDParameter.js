export const getCMCDParameter = (req, reqURI, type) => {
    var cmcdParam = '';
    switch (type) {
        case 'QUERY':
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
    return cmcdParam;
}