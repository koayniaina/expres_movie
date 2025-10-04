// import './style.css'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

// Use Vue Router
app.use(router);

// Use Toastification with options
app.use(Toast, {
  position: POSITION.TOP_RIGHT, // more readable
  timeout: 3000,

});

// Mount the app
app.mount("#app");

