import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    buttonsAsideData: [
      { id: 2, slot: "К сотрудникам", namePath: "workerTableTab" },
      { id: 3, slot: "К статистике", namePath: "statisticTab" },
    ],
    formIsDisplay: false,
    buttonFormIsDisabled: true,
    alerts: {
      nameAlert: false,
      genderAlert: false,
      ageAlert: false,
      phoneAlert: false,
    },
    employeeInput: {
      name: "",
      gender: "",
      age: "",
      phone: "",
      chief: "",
      children: new Set(),
    },
    employeeData: [],
    maybeChief: [],
    agesEmployees: [],
    namesEmployees: [],
    genderCount: [],
    genderPercent: [],
  },
  getters: {
    checkAlerts(state) {
      for (const key in state.alerts) {
        if (Object.hasOwnProperty.call(state.alerts, key)) {
          const element = state.alerts[key];
          if (element) {
            return element;
          }
        }
      }
    },
    checkEmployeeInput(state) {
      for (const key in state.employeeInput) {
        if (Object.hasOwnProperty.call(state.employeeInput, key)) {
          const element = state.employeeInput[key];
          if (element === "" && key !== "chief" && key !== "children") {
            return true;
          }
        }
      }
    },
  },
  mutations: {
    hideForm(state) {
      state.formIsDisplay = false;
    },
    showForm(state) {
      state.formIsDisplay = true;
    },
    addEmployee(state, obj) {
      let { name, value } = obj;
      state.employeeInput[name] = value;
    },
    enableButtonForm(state) {
      state.buttonFormIsDisabled = false;
    },
    disableButtonForm(state) {
      state.buttonFormIsDisabled = true;
    },
    enableAlertInput(state, typeAlert) {
      state.alerts[typeAlert] = true;
    },
    disableAlertInput(state, typeAlert) {
      state.alerts[typeAlert] = false;
    },
    setEmployeeFormRaw(state) {
      let cloneFormRaw = {};
      for (const key in state.employeeInput) {
        if (Object.hasOwnProperty.call(state.employeeInput, key)) {
          cloneFormRaw[key] = state.employeeInput[key];
        }
      }
      state.employeeData.push(cloneFormRaw);
      state.maybeChief.push(cloneFormRaw.name);
      state.employeeInput = {
        name: "",
        gender: "",
        age: "",
        phone: "",
        chief: "",
        children: new Set(),
      };
    },
    formatEmployeeFormRaw(state) {
      state.employeeData.map((item, index) => {
        state.employeeData.map((itemChild) => {
          if (item.name === itemChild.chief) {
            let indexOfMinus = item.name.lastIndexOf("-");
            itemChild.name = "-" + item.name.slice(0, indexOfMinus + 1) + itemChild.name;
            itemChild.chief = "";
            state.employeeData.splice(index + 1, 0, itemChild);
            state.employeeData.splice(-1, 1);
          }
        });
      });
      state.maybeChief.length = 0;
      state.employeeData.map((item) => {
        state.maybeChief.push(item.name);
      });
    },
    setStatistic(state) {
      let checkAges = [];
      let checkNames = [];
      let checkGender = [0, 0, 0];
      state.employeeData.map((item) => {
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
      checkGender.map((item) => state.genderCount.push(item));
      checkAges.map((item) => state.agesEmployees.push(item));
      checkNames.map((item) => state.namesEmployees.push(item));
    },
    setPercentGender(state) {
      let genderValue = 0;
      state.genderCount.map((item) => {
        genderValue += item;
      });
      state.genderPercent = state.genderCount.map((item) => {
        return (item = Math.floor((item / genderValue) * 100));
      });
    },
  },
  actions: {
    setAllData(state) {
      state.commit("setEmployeeFormRaw");
      state.commit("formatEmployeeFormRaw");
      state.commit("setStatistic");
      state.commit("setPercentGender");
      state.commit("disableButtonForm");
    },
  },
  modules: {},
});
