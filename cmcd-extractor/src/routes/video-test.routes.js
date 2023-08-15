import {Router} from 'express';
import { videoTest } from "../controllers/video-test.controller.js";

const router = Router();

router.get("/:id/*", videoTest);

export default router;