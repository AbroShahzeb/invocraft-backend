import express from "express";
const app = express();

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION 🚚! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import { configDotenv } from "dotenv";
import { connectDB } from "./utils/db.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
configDotenv();

app.get("/", (req, res, next) => {
  res.json({ message: "Hello world" });
});

connectDB();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on PORT`, process.env.PORT || 3000);
});

app.all("*", (req, res, next) => {
  next(
    new AppError(`Cannot find ${req.originalUrl} on this server! testtt`, 404)
  );
});

app.get("/", (req, res, next) => {
  res.json("Some middleware in the between");
});

app.use(globalErrorHandler);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION 🔥! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
