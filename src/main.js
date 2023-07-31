import { createApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import store from "@/store";
import vuexLocalStoragePlugin from "@/plugins/vuexLocalStoragePlugin";

const app = createApp(App);

const localStorageKeys = {
  isAuth: "setIsAuth",
  token: "setToken",
  currentReportId: "setCurrentReportId",
  reportsOutList: "setReportsOutList",
  categories: "setCategories",
  subCategories: "setCategories",
  reports: "setReports",
  groupIndicators: "setGroupIndicators",
  indicators: "setIndicators",
  reportsIdcValues: "setReportsIdcValues",
  outputReportId: "setOutputReportId",
  isChangable: "setIsChangable",
  breadCrumbs: "setBreadCrumbs",
};

for (const [key, mutation] of Object.entries(localStorageKeys)) {
  const value = localStorage.getItem(key);
  if (value) {
    store.commit(mutation, JSON.parse(value));
  }
}

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router);
app.use(store);
vuexLocalStoragePlugin(store);
app.mount("#app");
