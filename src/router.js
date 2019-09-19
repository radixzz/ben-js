import Vue from "vue";
import VueRouter from "vue-router";
import Store from './store';
import { AUTH_RESTORE, AUTH_SIGN_OUT } from './store/modules/types/action-types';
import Home from "./views/Home.vue";
import Login from './views/Login.vue';
import BenchmarkWorkspace from "./views/BenchmarkWorkspace.vue";
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
      path: "/:username/:slug",
      name: "benchmark-viewer",
      component: BenchmarkViewer,
    },
    {
      path: "/create",
      name: "benchmark-editor-unpublished",
      component: BenchmarkWorkspace,
      meta: {
        auth: {
          enabled: true,
          roles: ['guest', 'user'],
        }
      },
    },
    {
      path: "/guest/:slug/edit",
      name: "benchmark-editor-guest",
      component: BenchmarkWorkspace,
      meta: {
        auth: {
          enabled: true,
          roles: ['guest', 'user'],
        }
      }
    },
    {
      path: "/:username/:slug/edit",
      name: "benchmark-editor",
      component: BenchmarkWorkspace,
      meta: {
        auth: {
          enabled: true,
          roles: ['user'],
        }
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
    const { auth } = to.meta;
    const { userRole } = Store.getters;
    const toLogin = auth && auth.enabled && !auth.roles.includes(userRole);
    if (toLogin) {
      next({ name: 'login', query: { after_login: to.path } });
    // already logged in and headed to login page?
    } else if (to.name === 'login' && Store.getters.signedIn) {
      next({ name: 'home' })
    } else {
      next();
    }
  }
}

router.beforeEach(onBeforeEach);

export default router;
