import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "primeflex/primeflex.css";

import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
app.component("TheAccordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("TheButton", Button);
app.component("TheCalendar", Calendar);
app.component("TheCard", Card);
app.component("TheCheckbox", Checkbox);
app.component("ConfirmDialog", ConfirmDialog);
app.component("InputText", InputText);
app.component("TheTextarea", Textarea);
app.component("TheToast", Toast);
app.mount("#app");
