import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@/router/routes';
import { GlobalGuardBeforeEach } from "@/router/guards";

Vue.use(VueRouter);

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes,
});

router.beforeEach(GlobalGuardBeforeEach);

export default router;
