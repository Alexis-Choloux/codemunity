import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Message from "@/views/Message.vue";
import EditMessage from "@/views/EditMessage.vue";
import App from "@/App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/message/:id",
    name: "Message",
    component: Message,
  },
  {
    path: "/editmessage/:id",
    name: "EditMessage",
    component: EditMessage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
