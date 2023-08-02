import { createApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import store from "@/store";
import vuexLocalStoragePlugin from "@/plugins/vuexLocalStorage";

const app = createApp(App);

const isAuthLocalStorage = localStorage.getItem("isAuth");
const tokenLocalStorage = localStorage.getItem("token");
if (isAuthLocalStorage !== null) {
  store.commit("setIsAuth", JSON.parse(isAuthLocalStorage));
}
if (tokenLocalStorage) {
  store.commit("setToken", JSON.parse(tokenLocalStorage));
}

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router);
app.use(store);
vuexLocalStoragePlugin(store);
app.mount("#app");
