import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import 'pretty-checkbox/src/pretty-checkbox.scss';
 import axios from "./plugins/axios";
// import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//import babelPolyfill from "babel-polyfill";
import moment from "moment-jalaali";

import mainOidc from "./plugins/auth";

import { debounce } from "lodash";



Vue.config.productionTip = false;
window.debounce = debounce;
window.axios = axios;
window.moment = moment;

// new Vue({
//   el: "#app",
//   router,
//   store,
//   template: "<App/>",
//   vuetify,
//   components: {
//       App,
//   },
// });
// Oidc Event
mainOidc.$on('accessTokenExpiring', function () {
  // eslint-disable-next-line no-console
  console.log('access token expiring');
});

mainOidc.$on('accessTokenExpired', function () {
  // eslint-disable-next-line no-console
  console.log('access token expired');
});

mainOidc.$on('silentRenewError', function (err) {
  // eslint-disable-next-line no-console
  console.error('silent renew error', err);
});

mainOidc.$on('userLoaded', function (user) {
  // eslint-disable-next-line no-console
  console.log('user loaded', user);
});

mainOidc.$on('userUnloaded', function () {
  // eslint-disable-next-line no-console
  console.log('user unloaded');
});

mainOidc.$on('userSignedOut', function () {
  // eslint-disable-next-line no-console
  console.log('user signed out');
});

mainOidc.$on('userSessionChanged', function () {
  // eslint-disable-next-line no-console
  console.log('user session changed');
});


mainOidc.startup().then(ok => {
  if (ok) {
      
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

  }
});


