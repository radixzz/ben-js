import 'sanitize.css/sanitize.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewportSizeDirective from "./directives/ViewportSize";

Vue.directive('viewport-size', ViewportSizeDirective);
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
