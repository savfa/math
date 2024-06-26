import { createApp } from "vue";
import "./common/styles/styles.scss";
import App from "./App.vue";
import { router } from "./router.ts";

createApp(App).use(router).mount("#root");
