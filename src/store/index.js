import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * @param {number} id id сотрудника(для сортировки)
     * @param {object[]} employeesData Основной массив таблицы сотрудников
     * @param {string[]} agesEmployees Массив из возрастов сотрудников
     * @param {string[]} namesEmployees Массив из имен сотрудников
     * @param {number[]} genderCount Массив из счётчиков на каждый пол
     * @param {number[]} genderPercent Массив из процентов на каждый пол
     */
    id: JSON.parse(localStorage.getItem("idCount")) || 0,
    employeesData: JSON.parse(localStorage.getItem("employeesData")) || [],
    agesEmployees: JSON.parse(localStorage.getItem("agesEmployees")) || [],
    namesEmployees: JSON.parse(localStorage.getItem("namesEmployees")) || [],
    genderCount: JSON.parse(localStorage.getItem("genderCount")) || [],
    genderPercent: JSON.parse(localStorage.getItem("genderPercent")) || [],
  },
  getters: {},
  mutations: {
    /**
     * Задает state.employeesData из полей ввода inputs
     * @param {object} state
     * @param {object} inputs
     */
    setEmployeesData(state, inputs) {
      let cloneFormRaw = {};
      for (const key in inputs) {
        if (Object.hasOwnProperty.call(inputs, key)) {
          cloneFormRaw[key] = inputs[key];
        }
      }
      state.employeesData.push(cloneFormRaw);
      state.id = ++cloneFormRaw.id;
    },
    /**
     * Добавляет вложенность дочерних элементов
     * @param {object} state
     */
    addLevelChild(state) {
      state.employeesData.forEach((item, index) => {
        state.employeesData.forEach((itemChild) => {
          if (item.id === itemChild.chief.id) {
            itemChild.levelChild += "-";
            if (item.levelChild !== "") {
              itemChild.levelChild = item.levelChild + "-";
            }
            itemChild.chiefForSort = itemChild.chief;
            itemChild.chief = {};
            state.employeesData.splice(index + 1, 0, itemChild);
            state.employeesData.splice(-1, 1);
          }
        });
      });
    },
    /**
     * Устанавливает данные для статистики
     * @param {object} state
     */
    setStatistic(state) {
      let checkAges = [];
      let checkNames = [];
      let checkGender = [0, 0, 0];
      state.employeesData.forEach((item) => {
        checkingStats(item);
      });
      function checkingStats(obj) {
        for (const key in obj) {
          const element = obj[key];
          if (key === "age") {
            checkAges.push(element);
          }
          if (key === "name") {
            checkNames.push(element);
          }
          if (key === "gender" && element === "Мужской") {
            checkGender[0]++;
          } else if (key === "gender" && element === "Женский") {
            checkGender[1]++;
          } else if (key === "gender" && element === "Неизвестно") {
            checkGender[2]++;
          }
        }
      }
      state.namesEmployees.length = 0;
      state.agesEmployees.length = 0;
      state.genderCount.length = 0;
      checkGender.forEach((item) => state.genderCount.push(item));
      checkAges.forEach((item) => state.agesEmployees.push(item));
      checkNames.forEach((item) => state.namesEmployees.push(item));
    },
    /**
     * Устанавливает процент каждого пола
     * @param {object} state
     */
    setPercentGender(state) {
      let genderValue = 0;
      state.genderCount.forEach((item) => {
        genderValue += item;
      });
      state.genderPercent = state.genderCount.map((item) => {
        return (item = Math.floor((item / genderValue) * 100));
      });
    },
    /**
     * Записывает данные в localStorage
     * @param {object} state
     */
    setLocalStorageData(state) {
      localStorage.setItem("employeesData", JSON.stringify(state.employeesData));
      localStorage.setItem("agesEmployees", JSON.stringify(state.agesEmployees));
      localStorage.setItem("namesEmployees", JSON.stringify(state.namesEmployees));
      localStorage.setItem("genderCount", JSON.stringify(state.genderCount));
      localStorage.setItem("genderPercent", JSON.stringify(state.genderPercent));
      localStorage.setItem("idCount", state.id);
    },
    /**
     * Очищает все данные
     * @param {object} state
     */
    clearData(state) {
      localStorage.clear();
      state.employeesData = [];
      state.agesEmployees = [];
      state.namesEmployees = [];
      state.genderCount = [];
      state.genderPercent = [];
      state.id = 0;
    },
  },
});
