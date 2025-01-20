import {Router} from 'express';
import { cmcdResponseMode, cmcdEventMode } from '../controllers/cmcd.controller.js';

const router = Router();

router.get("/response-mode", cmcdResponseMode);
router.post("/response-mode", cmcdResponseMode);

router.get("/event-mode", cmcdEventMode);
router.post("/event-mode", cmcdEventMode);

export default router;