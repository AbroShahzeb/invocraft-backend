import express from "express";
const app = express();

import { configDotenv } from "dotenv";
import { connectDB } from "./utils/db.js";
configDotenv();

app.get("/", (req, res, next) => {
  res.json({ message: "Hello world" });
});

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on PORT`, process.env.PORT || 3000);
  });
});
