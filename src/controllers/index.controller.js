import getCMCDRequestType from "../utils/getCMCDRequestType.js";


export const index = (req, res) => {
  res.json({ message: "Hello World Controller" });
  getCMCDRequestType(req);
};
