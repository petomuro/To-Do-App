import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router/index";

import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

import "primevue/resources/themes/lara-dark-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "primeflex/primeflex.css";

import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(PrimeVue);
app.use(router);
app.component("TheButton", Button);
app.component("TheCalendar", Calendar);
app.component("TheCard", Card);
app.component("InputText", InputText);
app.component("TheTextarea", Textarea);
app.mount("#app");
