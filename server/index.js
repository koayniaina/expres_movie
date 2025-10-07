import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import { connectmongoDB } from "./config/mongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", authRoutes);

// Start server after DB connects
connectmongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
