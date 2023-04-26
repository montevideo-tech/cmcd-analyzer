import { getMockReq, getMockRes } from '@jest-mock/express'
import { index } from "../../src/controllers/index.controller";


test("mockup test", async () => {

  const req = getMockReq();
  const { res, next } = getMockRes();

  await index(req, res);

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({ 
      message: "Hello World Controller" 
    }),
  );

})