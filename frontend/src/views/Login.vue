<template>
  <form @submit.prevent="login" class="p-4 max-w-sm mx-auto">
    <h2 class="text-2xl mb-4">Login</h2>
    <input v-model="email" placeholder="Email" class="border p-2 w-full mb-2" />
    <input type="password" v-model="password" placeholder="Password" class="border p-2 w-full mb-2" />
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
  </form>
</template>

<script>
import API from "../services/api.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();

    // Reactive data
    const email = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const res = await API.post("/login", {
          email: email.value,
          password: password.value,
        });

        // Save JWT token and username
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);

        // Show success toast
        toast.success(`Welcome back, ${res.data.username}!`);

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    };

    return { email, password, login };
  },
};
</script>
