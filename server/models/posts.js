import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,

    created: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("Post", postSchema);

export default Posts;
