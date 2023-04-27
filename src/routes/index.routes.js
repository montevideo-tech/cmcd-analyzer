import express, {Router} from 'express';
import { index } from "../controllers/index.controllers.js";

const app = express();

app.get("/", index);

export default app;