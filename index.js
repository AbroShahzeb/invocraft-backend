import express from "express";
const app = express();

import { configDotenv } from "dotenv";
configDotenv();

app.get("/", (req, res, next) => {
  res.json({ message: "Hello world" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on PORT`, process.env.PORT || 3000);
});
