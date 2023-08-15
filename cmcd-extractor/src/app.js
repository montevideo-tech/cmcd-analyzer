import express from "express";
import videoTestRoutes from "./routes/video-test.routes.js";
import videoRoutes from "./routes/video.routes.js";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

app.use("/video-test", videoTestRoutes);
app.use("/video", videoRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

export default app;