import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
// import { errorHandler } from "./utils/error.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// maine middle ware  use kiya hai frequent same username entry pr error dene ke liye
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
////////////..............................
