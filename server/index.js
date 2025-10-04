import express from "express";
import dotenv from "dotenv";
import postsRouter from './routes/posts.js';
import authRoutes from './routes/auth.js';
import { connectmongoDB } from "./config/mongoDB.js";

const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/posts", postsRouter);
app.use("/users", authRoutes)

app.listen(PORT, () => {
  connectmongoDB();
  console.log(`This is running on port ${PORT}`);
});
