import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store/index";
import Home from "../views/Home.vue";
const Page404 = () => import("@/views/error/Page404");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/selector",
    name: "Selector",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Selector.vue"),
  },
  {
    path: "/404",
    name: "Page404",
    component: Page404,
  },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
