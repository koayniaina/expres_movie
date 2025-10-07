<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Post List</h2>
      <router-link to="/CreatePost" class="btn btn-success">+ New Post</router-link>
    </div>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post._id">
          <td>{{ post.title }}</td>
          <td>
            <span
              class="badge"
              :class="post.status === 'open' ? 'bg-success' : 'bg-secondary'"
            >
              {{ post.status }}
            </span>
          </td>
          <td>{{ new Date(post.createdAt).toLocaleDateString() }}</td>
          <td>
            <router-link
              :to="`/UpdatePost/${post._id}`" 
              class="btn btn-warning btn-sm me-2"
            >
              Edit
            </router-link>
            <button class="btn btn-danger btn-sm" @click="remove(post._id)">
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="posts.length === 0">
          <td colspan="4" class="text-center">No data found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "PostList",
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.loadPosts();
  },
  methods: {
    async loadPosts() {
      try {
        const res = await axios.get("http://localhost:5000/posts/getAll");
        this.posts = res.data.data;
      } catch (err) {
        this.showToast("error", "Unable to load posts");
      }
    },

    // Delete without confirmation
    async remove(id) {
      try {
        await axios.delete(`http://localhost:5000/posts/delete/${id}`);
        this.showToast("success", "Post deleted successfully!");
        this.loadPosts();
      } catch (err) {
        this.showToast("error", "Failed to delete post");
      }
    },

    showToast(icon, message) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        icon: icon,
        title: message,
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
