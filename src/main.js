import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";

import axios from "./plugins/axios";
//import babelPolyfill from "babel-polyfill";
import moment from "moment-jalaali";

Vue.config.productionTip = false;
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

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
