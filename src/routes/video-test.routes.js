import {Router} from 'express';
import { videoTest } from "../controllers/video-test.controller.js";

const router = Router();

router.get("/:id/:filename", videoTest);

export default router;