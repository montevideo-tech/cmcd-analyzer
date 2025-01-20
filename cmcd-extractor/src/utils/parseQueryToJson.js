const parseQueryToJson = (queryString) => {
    const values = queryString.split(',');
    const obj = {};
    values.forEach((value) => {
      if (!value.includes('=')) {
        obj[value] = true;
      } else {
        // eslint-disable-next-line prefer-const
        let [key, val] = value.split('=');
        val = Number.isNaN(Number(val)) ? val.replace(/"/g, '') : Number(val);
        obj[key] = val;
      }
    });
    return obj;
  };
  
  export default parseQueryToJson;