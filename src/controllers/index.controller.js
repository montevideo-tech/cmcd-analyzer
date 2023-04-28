import getCMCDRequestType from "../utils/getCMCDRequestType";


export const index = (req, res) => {
  // console.log(req);
  res.json({ message: "Hello World Controller" });
  getCMCDRequestType(req);
};
