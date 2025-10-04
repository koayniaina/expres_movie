import express from "express";
import Posts from "../models/posts.js"; 

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/" , async(req, res)=> {
 try {
    const { title, price , description } = req.body;
    const posts = new Posts({
      title,
      price , 
      description
    });
    await posts.save();
    res.status(201).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).json({ message: "Ticket not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Ticket not found" });
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
