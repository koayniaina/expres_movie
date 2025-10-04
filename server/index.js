import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/mongoDB.js";
const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
dotenv.config();

app.listen(PORT, () => {
  mongoDB();
  console.log(`This is running on port ${PORT}`);
});
