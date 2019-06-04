import 'sanitize.css/sanitize.css';
import Vue from 'vue';
import authPlugin from './auth/authPlugin';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewportSizeDirective from "./directives/ViewportSize";

Vue.directive('viewport-size', ViewportSizeDirective);
Vue.use(authPlugin);
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
