import Vue from "vue";
import VueRouter from "vue-router";
import Store from './store';
import { AUTH_RESTORE, AUTH_SIGN_OUT } from './store/modules/auth';
import Home from "./views/Home.vue";
import Login from './views/Login.vue';
import BenchmarkEditor from "./views/BenchmarkEditor.vue";
import BenchmarkViewer from "./views/BenchmarkViewer.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/logout",
      name: "logout",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/view",
      name: "bechmark-viewer",
      component: BenchmarkViewer,
    },
    {
      path: "/edit",
      name: "bechmark-editor",
      component: BenchmarkEditor,
      meta: {
        requiresAuth: true,
      },
    },
  ]
});

async function onBeforeEach(to, from, next) {
  if (to.name === 'logout') {
    // is logout route
    await Store.dispatch(AUTH_SIGN_OUT);
    next({ name: 'home' });
  } else {
    await Store.dispatch(AUTH_RESTORE);

    // route requires login and is not logged in
    if (to.meta.requiresAuth && !Store.getters.signedIn) {
      next({ name: 'login', query: { after_login: to.path } });

    // already logged in and headed to login page?
    } else if (to.name === 'login') {
      next({ name: 'home' })
    } else {
      next();
    }
  }
}

router.beforeEach(onBeforeEach);

export default router;
