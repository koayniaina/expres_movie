<template>
  <div class="p-4 max-w-md mx-auto text-center">
    <h2 class="text-2xl font-semibold mb-4">
      Welcome, {{ user ? user.username : "Loading..." }}!
    </h2>

    <button
      @click="logout"
      class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-3 rounded"
    >
      Logout
    </button>
  </div>

  <PostList class="mt-6" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import API from "../services/api.js";
import PostList from "./PostList.vue";

const user = ref(null);
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const { data } = await API.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    user.value = data;
  } catch (error) {
    console.error(
      "❌ Erreur lors de la récupération de l'utilisateur :",
      error
    );
    localStorage.removeItem("token");
    router.push("/login");
  }
});

const logout = () => {
  localStorage.removeItem("token");
  user.value = null;
  router.push("/login");
};
</script>
