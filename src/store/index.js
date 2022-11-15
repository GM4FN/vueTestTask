import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    btnDataAside: [
      { id: 1, slot: "На главную", namePath: "home" },
      { id: 2, slot: "К сотрудникам", namePath: "workerTableTab" },
      { id: 3, slot: "К статистике", namePath: "statisticTab" },
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
