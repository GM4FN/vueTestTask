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
    employeeFormRaw: [],
    maybeChief: [],
    employeesFormData: [],
    employeeTableData: new Set(),
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
    childEmployees(state) {
      return state.employeesFormData.children;
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
      state.employeeFormRaw.push(cloneFormRaw);
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
      state.employeeFormRaw = state.employeeFormRaw.map((item, index) => {
        console.log(item.name);
        return (item = [
          ["name", item.name],
          ["gender", item.gender],
          ["age", item.age],
          ["phone", item.phone],
          ["chief", item.chief],
        ]);
      });
    },
    setChildrenRaw(state) {
      state.employeeFormRaw.map((item) => {
        checkChief(item);
      });
      function checkChief(checking) {
        for (const propChild in checking) {
          state.employeeFormRaw.map((item) => {
            const elementChild = checking[propChild];
            if (typeof elementChild === "object" && elementChild.size > 0) {
              for (const elem of elementChild) {
                checkChief(elem);
              }
            } else if (propChild === "chief" && elementChild !== "") {
              if (item.name === elementChild) {
                item.children.add(checking);
              }
            }
          });
        }
      }
    },
    setEmployeesData(state) {
      state.employeesFormData.length = 0;
      state.employeeFormRaw.map((itemArr) => {
        if (itemArr.chief === "" || itemArr.chief == undefined) {
          state.employeesFormData.push(itemArr);
        }
      });
    },
    setStatistic(state) {
      let checkAges = [];
      let checkNames = [];
      let checkGender = [0, 0, 0];
      state.employeesFormData.map((item) => {
        checkingStats(item);
      });
      function checkingStats(obj) {
        for (const key in obj) {
          const element = obj[key];
          if (typeof element === "object" && element.size > 0) {
            for (const elem of element) {
              checkingStats(elem);
            }
          }
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
    // делит
    setEmployeeTableData(state) {
      state.employeesFormData.map((item) => {
        checkEmployeeFormData(item);
      });
      function checkEmployeeFormData(obj) {
        for (const key in obj) {
          const element = obj[key];
          if (typeof element === "object" && element.size > 0) {
            for (const elem of element) {
              checkEmployeeFormData(elem);
            }
          }
          state.employeeTableData.add(obj);
        }
      }
    },
  },
  actions: {
    setAllData(state) {
      state.commit("setEmployeeFormRaw");
      state.commit("setChildrenRaw");
      state.commit("setEmployeesData");
      state.commit("setStatistic");
      state.commit("setPercentGender");
      state.commit("formatEmployeeFormRaw");
      state.commit("setEmployeeTableData");
      state.commit("disableButtonForm");
    },
  },
  modules: {},
});
