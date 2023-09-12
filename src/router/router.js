import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import MainPage from "@/pages/MainPage.vue";
import ReportHistoryPage from "@/pages/ReportHistoryPage.vue";
import FormPage from "@/pages/FormPage.vue";
import GroupIndicatorsPage from "@/pages/GroupIndicatorsPage.vue";
import GroupDocIndicatorsPage from "@/pages/GroupDocIndicatorsPage.vue";
import FilledTablesPage from "@/pages/FilledTablesPage.vue";
import FilledDocTablesPage from "@/pages/FilledDocTablesPage.vue";
import FreeFormPage from "@/pages/FreeFormPage.vue";
import FilledFreeFormPage from "@/pages/FilledFreeFormPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

const routes = [
  {
    name: "Main",
    path: "/",
    component: MainPage,
    meta: {
      needAuth: true,
    },
    children: [
      {
        name: "ReportsHistory",
        component: ReportHistoryPage,
        path: "reports_history",
      },
      {
        name: "Form",
        component: FormPage,
        path: "form_page",
      },
      {
        name: "GroupIndicators",
        component: GroupIndicatorsPage,
        path: "group_indicators",
      },
      {
        name: "GroupDocIndicators",
        component: GroupDocIndicatorsPage,
        path: "group_doc_indicators",
      },
      {
        name: "FreeForm",
        component: FreeFormPage,
        path: "free_form",
      },
      {
        name: "FilledTables",
        component: FilledTablesPage,
        path: "filled_tables",
      },
      {
        name: "FilledDocTables",
        component: FilledDocTablesPage,
        path: "filled_doc_tables",
      },
      {
        name: "FilledFreeText",
        component: FilledFreeFormPage,
        path: "filled_freeform",
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: LoginPage,
  },
  {
    name: "Registration",
    path: "/registration",
    component: RegistrationPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

router.beforeEach((to, from) => {
  const store = useStore();
  if (to.meta.needAuth && !store.state.isAuth) {
    return { name: "Login" };
  }
});

router.beforeEach((to, from, next) => {
  if (to === from) {
    next("/");
  } else {
    next();
  }
});

export default router;
