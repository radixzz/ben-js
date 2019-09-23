import Home from "@/views/Home.vue";
import Login from '@/views/Login.vue';
import BenchmarkWorkspace from "@/views/BenchmarkWorkspace.vue";
import BenchmarkViewer from "@/views/BenchmarkViewer.vue";
import { GuardBeforeLogout, GuardBeforeLogin } from "@/router/guards";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/logout",
    name: "logout",
    component: Home,
    beforeEnter: GuardBeforeLogout,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: GuardBeforeLogin,
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
];

export default routes;
