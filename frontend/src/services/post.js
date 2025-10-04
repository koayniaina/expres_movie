import axios from "axios";

const API_URL = "http://localhost:5000/posts"; // your Express API

export const getPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPost = async (post) => {
  const res = await axios.post(API_URL, post);
  return res.data;
};

export const updatePost = async (id, post) => {
  const res = await axios.put(`${API_URL}/${id}`, post);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
