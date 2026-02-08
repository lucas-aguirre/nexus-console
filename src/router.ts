import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "./views/DashboardView.vue";
import RequestView from "./views/RequestView.vue";
import StateView from "./views/StateView.vue";
import RunsView from "./views/RunsView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: DashboardView },
    { path: "/request", component: RequestView },
    { path: "/state", component: StateView },
    { path: "/runs", component: RunsView },
  ],
});
