import Vue from "vue";
import VueRouter from "vue-router";
import employeeTableTab from "../components/tabs/EmployeeTableTab.vue";
import statisticTab from "../components/tabs/StatisticTab.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/workers",
    name: "employeeTableTab",
    component: employeeTableTab,
  },
  {
    path: "/statistic",
    name: "statisticTab",
    component: statisticTab,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
