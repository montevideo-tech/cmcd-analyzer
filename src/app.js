import express from "express";

import indexRoutes from "./routes/index.routes.js";
import streamRoutes from "./routes/stream.routes.js"

const app = express();

app.use("/", indexRoutes);

app.use("/stream", streamRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

export default app;