import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import BenchmarkEditor from "./views/BenchmarkEditor.vue";
import BenchmarkViewer from "./views/BenchmarkViewer.vue";
import auth from './auth/authService';

Vue.use(VueRouter);

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/edit",
      name: "bechmark-editor",
      component: BenchmarkEditor,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/view",
      name: "bechmark-viewer",
      component: BenchmarkViewer,
      meta: {
        requiresAuth: false,
      },
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    auth.login({ target: to.path });
  } else {
    next();
  }
});

export default router;
