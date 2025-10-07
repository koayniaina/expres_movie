<template>
  <div class="container mt-4">
    <h2>Edit Post</h2>

    <form @submit.prevent="updatePost" class="mt-3" v-if="post">
      <div class="form-group mb-2">
        <label>Title</label>
        <input type="text" v-model="post.title" class="form-control" required />
      </div>

      <div class="form-group mb-3">
        <label>Status</label>
        <select v-model="post.status" class="form-control">
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "UpdatePost",
  data() {
    return {
      post: null,
      postId: null, // store post ID from route
    };
  },
  async created() {
    this.postId = this.$route.params.id;
    await this.fetchPost();
  },
  methods: {
    // Fetch post by ID
    async fetchPost() {
      try {
        const res = await axios.get(`http://localhost:5000/posts/get/${this.postId}`);
        this.post = res.data.data;
      } catch (err) {
        this.showToast("error", "Failed to fetch post data");
      }
    },

    // Update post
    async updatePost() {
      try {
        const url = `http://localhost:5000/posts/update/${this.postId}`;
        await axios.patch(url, this.post);

        // Optional: reset fields
        this.post.title = "";
        this.post.status = "open";

        this.showToast("success", "Post updated successfully!");

        // Redirect to list page
        this.$router.push("/dashboard");
      } catch (err) {
        this.showToast("error", "Failed to update post");
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
