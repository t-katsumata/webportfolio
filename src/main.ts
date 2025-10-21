import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import "./styles/base.css";
import App from "./App.vue";
import router from "./router";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/themes/material.css'
import vTooltip from "./directives/vTooltip";

const app = createApp(App);
const head = createHead();
app.directive('tooltip', vTooltip);

app.use(head);
app.use(router);
app.mount("#app");
