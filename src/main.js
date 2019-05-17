import 'sanitize.css/sanitize.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import store from './store';
import ViewportSizeDirective from "./directives/ViewportSize";

Vue.directive('viewport-size', ViewportSizeDirective);

Vue.config.productionTip = false;
const router = new VueRouter(routes);
Vue.use(VueRouter);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
