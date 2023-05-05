import express from "express";

import indexRoutes from "./routes/index.routes.js";
import videoTestRoutes from "./routes/video-test.routes.js"
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.use("/", indexRoutes);

app.use("/video-test", videoTestRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

export default app;