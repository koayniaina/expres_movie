import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import PostList from "../views/PostList.vue";
import UpdatePost from "../views/UpdatePost.vue";
import CreatePost from "../views/CreatePost.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/PostList",
    name: "PostList",
    component: PostList,
  },

  {
    name: "CreatePost",
    path: "/CreatePost",
    component: CreatePost,
  },

  {
    path: "/UpdatePost/:id",
    component: UpdatePost,
    name: "UpdatePost",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
