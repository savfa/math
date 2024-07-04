import { createApp, ref } from "vue";
import "./common/styles/styles.scss";
import App from "./App.vue";
import { router } from "./router.ts";

const progressLogs = ref({ logs: [], links: {} });

createApp(App).use(router).provide("progressLogs", progressLogs).mount("#root");
