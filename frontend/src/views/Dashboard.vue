<template>
  <div class="p-4 max-w-md mx-auto text-center">
    <h2 class="text-2xl font-semibold mb-4">Welcome, {{ user?.username }}!</h2>

    <button
      @click="logout"
      class="bg-red-600 text-white px-4 py-2 mt-3 rounded"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import API from "../services/api.js";

const user = ref(null);
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const { data } = await API.get("/me");
    user.value = data;
  } catch (err) {
    console.error("Erreur récupération utilisateur:", err);
    router.push("/login");
  }
});

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
