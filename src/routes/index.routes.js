import {Router} from 'express';
import { index } from '../controllers/index.controller.js'

const router = Router();

router.get('/:base64json/:filename', index);

export default router;