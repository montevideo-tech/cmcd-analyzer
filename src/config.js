import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;

export const VIDEO_TEST_URL = process.env.VIDEO_TEST_URL || 'https://dxclj9vp3m44c.cloudfront.net/hls/';
