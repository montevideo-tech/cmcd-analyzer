import { getMockReq, getMockRes } from '@jest-mock/express'
import { index } from "../../src/controllers/index.controller";


test("mockup test", async () => {

  const req = getMockReq({
    query: {
      CMCD: 'ot=m,sid="ca107b7b-2dd2-4417-ae65-a99ee4405242"',
    },
    headers: {
      'CMCD-Object': 'br=759,d=4000,ot=v,tb=14932',
      'CMCD-Request': 'nor="bbb_30fps_480x270_600k_2.m4v",su',
      'CMCD-Session': 'sf=d,sid="d168ce66-ef0b-465f-af97-15d73cbb1ab5",st=v',
      'CMCD-Status': 'rtp=30400',
    },
    method: 'GET',
    url: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps_480x270_600k/bbb_30fps_480x270_600k_1.m4v',
  });

  const { res } = getMockRes();

  await index(req, res);

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({ 
      message: "Hello World Controller" 
    }),
  );

})