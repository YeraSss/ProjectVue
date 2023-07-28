import { createApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import store from "@/store";
import vuexLocalStoragePlugin from "@/plugins/vuexLocalStoragePlugin";

const app = createApp(App);

const isAuthLocalStorage = localStorage.getItem("isAuth");
const tokenLocalStorage = localStorage.getItem("token");
const currentReportLocalStorage = localStorage.getItem("currentReportId");
const reportsOutListLocalStorage = localStorage.getItem("reportsOutList");
const categoriesLocal = localStorage.getItem("categories");
const subCategoriesLocal = localStorage.getItem("subCategories");
const reportsLocal = localStorage.getItem("reports");
const groupIndicatorsLocal = localStorage.getItem("groupIndicators");
const indicatorsLocal = localStorage.getItem("indicators");
const reportsOutListLocal = localStorage.getItem("reportsOutList");
const reportsIdcValuesLocal = localStorage.getItem("reportsIdcValues");
const outputReportIdLocal = localStorage.getItem("outputReportId");
const isChangableLocal = localStorage.getItem("isChangable");
const breadCrumbsLocal = localStorage.getItem("breadCrumbs");
if (reportsOutListLocal) {
  store.commit("setReportsOutList", JSON.parse(reportsOutListLocal));
}
if (reportsIdcValuesLocal) {
  store.commit("setReportsIdcValues", JSON.parse(reportsIdcValuesLocal));
}
if (outputReportIdLocal) {
  store.commit("setOutputReportId", JSON.parse(outputReportIdLocal));
}
if (isChangableLocal) {
  store.commit("setIsChangable", JSON.parse(isChangableLocal));
}
if (breadCrumbsLocal) {
  store.commit("setBreadCrumbs", JSON.parse(breadCrumbsLocal));
}
if (groupIndicatorsLocal) {
  store.commit("setGroupIndicators", JSON.parse(groupIndicatorsLocal));
}
if (indicatorsLocal) {
  store.commit("setIndicators", JSON.parse(indicatorsLocal));
}
if (categoriesLocal) {
  store.commit("setCategories", JSON.parse(categoriesLocal));
}
if (subCategoriesLocal) {
  store.commit("setCategories", JSON.parse(subCategoriesLocal));
}
if (reportsLocal) {
  store.commit("setReports", JSON.parse(reportsLocal));
}
if (reportsOutListLocalStorage) {
  store.commit("setReportsOutList", JSON.parse(reportsOutListLocalStorage));
}
if (isAuthLocalStorage) {
  store.commit("setIsAuth", JSON.parse(isAuthLocalStorage));
}
if (tokenLocalStorage) {
  store.commit("setToken", JSON.parse(tokenLocalStorage));
}
if (currentReportLocalStorage) {
  store.commit("setCurrentReportId", JSON.parse(currentReportLocalStorage));
}
components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router);
app.use(store);
vuexLocalStoragePlugin(store);
app.mount("#app");
