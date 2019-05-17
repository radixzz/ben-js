
import Home from './views/Home.vue';
import Benchmark from './views/Benchmark.vue';

const routes = {
  base: '/',
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/benchmark', name: 'bechmark', component: Benchmark },
  ],
};

export default routes;
