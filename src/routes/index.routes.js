import {Router} from 'express';
import { index } from "../controllers/index.controllers.js";

const router = Router();

router.get('/:base64json/:filename', index);

export default router;