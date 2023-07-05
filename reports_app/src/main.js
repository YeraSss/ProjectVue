import App from "@/App";
import { createApp } from "vue";
import VFocus from "@/directives/VFocus";
import { registerPlugins } from "@/plugins";

const app = createApp(App);

app.directive("focus", VFocus);

registerPlugins(app);

app.mount("#app");
