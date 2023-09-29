import { createApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import store from "@/store";
import { World } from "./world/World.js";
import vuexLocalStoragePlugin from "@/plugins/vuexLocalStorage";
import { createVuetify } from "vuetify/lib/framework.mjs";
import * as componentsVuetify from "vuetify/components";
import * as directives from "vuetify/directives";
import {aliases, mdi} from "vuetify/lib/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    },
  },
  componentsVuetify,
  directives,
});


async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world
  const world = new World(container);

  // complete async tasks
  await world.init();

  // start the animation loop
  world.start();
}

main().catch((err) => {
  console.error(err);
});


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
app.use(vuetify);
vuexLocalStoragePlugin(store);


app.mount("#app");

