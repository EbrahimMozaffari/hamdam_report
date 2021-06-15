import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";


// import store from "../store/index";
import Home from "../views/Home.vue";

import mainAuth from "../plugins/auth";

const Page404 = () => import("@/views/error/Page404");
const Login = () => import("@/views/Login.vue");
const Selector = () => import("@/views/Selector.vue");

Vue.use(Router);
/*
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import( "../views/About.vue"),
  },
  {
    path: "/selector",
    name: "Selector",

    component: () =>
      import( "../views/Selector.vue"),
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
*/
const router = new Router({
  mode: "history",
  routes: configRoutes(),
});

router.beforeResolve((to, from, next) => {
 // store.dispatch("app/setOverlay", true);
  next();
});

router.afterEach((to, from) => {
  setTimeout(() => {
  //  store.dispatch("app/setOverlay", false);
  }, 3000);
});

mainAuth.useRouter(router);

export default router;


function configRoutes() {
  return [
    {
      path: "/",
      name: "Home",
      beforeEnter: (to, from, next) => {
        mainAuth.isAuthenticated
          ? next({ name: "Selector" })
          : next({ name: "Login" });
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: (to, from, next) => {
        mainAuth.isAuthenticated ? next({ name: "Selector" }) : next();
      },
    },
    {
      path: "/selector",
      name: "Selector",
      component: Selector,
      beforeEnter: (to, from, next) => {
        mainAuth.isAuthenticated ? next() : next({ name: "Login" });
      },
      // meta: {
      //   authName: mainAuth.authName,
      // },
    },
    {
      path: "/error",
      redirect: "/error/404",
      name: "Error",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page404,
        },
      ],
    },
    { path: "*", redirect: "/error/404" },
  ];
}
