<template>
  <div class="container mt-4">
    <h2>Create New Post</h2>

    <form @submit.prevent="createPost" class="mt-3">
      <div class="form-group mb-2">
        <label>Title</label>
        <input
          type="text"
          v-model="post.title"
          class="form-control"
          placeholder="Enter title"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label>Status</label>
        <select v-model="post.status" class="form-control">
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CreatePost",
  data() {
    return {
      post: { title: "", status: "open" },
    };
  },
  methods: {
    async createPost() {
      try {
        await axios.post("http://localhost:5000/posts/create", this.post);

        // Reset form
        this.post.title = "";
        this.post.status = "open";

        this.showToast("success", "Post created successfully!");

        // Redirect to post list
        this.$router.push("/dashboard");
      } catch (err) {
        this.showToast("error", "Failed to create post");
      }
    },

    // Toast helper
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
  max-width: 600px;
}
</style>
