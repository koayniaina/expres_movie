import express from "express";
import dotenv from "dotenv";
// import  Posts from "./models/post.js";
import postsRouter from './routes/posts.js'
import { connectmongoDB } from "./config/mongoDB.js";

const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/posts", postsRouter);

app.listen(PORT, () => {
  connectmongoDB();
  console.log(`This is running on port ${PORT}`);
});
