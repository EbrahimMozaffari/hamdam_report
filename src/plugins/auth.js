import Vue from "vue";
import { createOidcAuth, SignInType, LogLevel } from "../../node_modules/vue-oidc-client/vue2/dist/vue-oidc-client.common";

const loco = window.location;
//const appRootUrl = 'https://my.accounts.idall.pro';
 const appRootUrl = `${loco.protocol}//${loco.host}${process.env.BASE_URL}`;

var mainOidc = createOidcAuth("main", SignInType.Window, appRootUrl, {
  authority: 'https://accounts.idall.pro',
  client_id: 'hamdam-admin',
  response_type: 'code',
  scope: 'openid profile phone hamdam-api.admin',
  post_logout_redirect_uri: `${appRootUrl}`,
    //https://myaccount.idall.pro/auth/signinwin/main
  //redirect_uri:"https://my.accounts.idall.pros/auth/signinwin/main",
  loadUserInfo: true,
});
Vue.prototype.$oidc = mainOidc;
export default mainOidc;

