import {Router} from 'express';
import { video } from '../controllers/video.controller.js';

const router = Router();

router.get("/:id/:jsonbase64/*", video);

export default router;