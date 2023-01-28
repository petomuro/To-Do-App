import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";

import Button from "primevue/button";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
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
app.component("TheButton", Button);
app.component("TheCalendar", Calendar);
app.component("InputText", InputText);
app.component("TheMenubar", Menubar);
app.component("TheTextarea", Textarea);
app.mount("#app");
