import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";

import Button from "primevue/button";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.component("TheButton", Button);
app.mount("#app");
