import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import MainPage from "@/pages/MainPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

const routes = [
  {
    name: "Main",
    path: "/",
    component: MainPage,
    meta: {
      needAuth: false,
    },
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
