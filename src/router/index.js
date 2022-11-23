import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [

  {
    path: "/workers",
    name: "workerTableTab",
    component: () => import("../components/tabs/EmployeeTableTab.vue"),
  },
  {
    path: "/statistic",
    name: "statisticTab",
    component: () => import("../components/tabs/StatisticTab.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
