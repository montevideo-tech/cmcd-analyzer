import {Router} from 'express';
import { stream } from "../controllers/stream.controller.js";

const router = Router();

router.get("/:filename", stream);

export default router;