import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    
    created: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("Post", postSchema);

export default Posts;
