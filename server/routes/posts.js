import express from "express";
import Posts from "../models/posts.js";

const router = express.Router();

// ✅ GET all posts
router.get("/getAll", async (req, res) => {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ CREATE a new post
router.post("/create", async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newPost = new Posts({ title, status });

    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ✅ UPDATE post by ID
router.patch("/update/:id", async (req, res) => {
  try {
    const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: updatedPost });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ✅ DELETE post by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
