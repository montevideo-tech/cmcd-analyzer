import express from "express";

import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use("/", indexRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
  });

export default app;