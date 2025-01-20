const parseCMCDQueryToJson = (input) => {
  const regex = /([a-zA-Z0-9_]+)=("[^"]*"|[^,]*)(?=,|$)|([a-zA-Z0-9_]+)(?=,|$)/g;
  const result = {};
  let match;

  while ((match = regex.exec(input)) !== null) {
    const key = match[1] || match[3]; // Match key with or without value
    let value = match[2];

    // If the key has no value, it's a boolean true
    if (value === undefined) {
      result[key] = true;
    } else {
      // Remove enclosing quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Attempt to infer the type of the value
      if (/^-?\d+$/.test(value)) { // Integer
        result[key] = parseInt(value, 10);
      } else if (/^-?\d*\.\d+$/.test(value)) { // Float
        result[key] = parseFloat(value);
      } else if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
        result[key] = value.toLowerCase() === "true";
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}

export default parseCMCDQueryToJson;