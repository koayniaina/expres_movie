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
<template>
  <div class="dashboard">
    <div class="logo">
      <div class="logo-right">
        <img src="../assets/ticket.png" alt="Logo" />
        <p>Ticket</p>
      </div>
    </div>
    <div class="user-info">
      <p>Welcome, {{ user ? user.username : "Loading..." }}!</p>
      <img src="../assets/user.png" alt="" />
      <!-- <span @click="logout" class="material-symbols-outlined"> logout </span> -->
    </div>
  </div>
  <div class="post">
    <PostList />
  </div>
</template>

<style scoped>
.dashboard {
  padding: 0.3rem 2rem;
  display: flex;
  align-items: center;
  background-color: rgba(218, 218, 218, 0.637);
  justify-content: space-between;
}

.logo {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.logo-right {
  display: block;
  text-align: center;

  img {
    padding-bottom: 0.6rem;
  }

  p {
    margin-top: -0.5rem;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 0.8rem;
  }
}
.user-info {
  display: flex;
  gap: 1rem;
  align-items: center;

  p {
    color: rgb(29, 29, 29);
    font-weight: 500;
  }
}
</style>
