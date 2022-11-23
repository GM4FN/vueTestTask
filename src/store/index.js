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
    alerts: {
      nameAlert: false,
      ganderAlert: false,
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
    agesEmployees: [],
    namesEmployees: [],
    genderCount: [],
    genderPercent: [],
  },
  getters: {},
  mutations: {
    hideForm(state) {
      state.formIsDisplay = false;
    },
    showForm(state) {
      state.formIsDisplay = true;
    },
    alertForm(state, nameAlert) {
      for (const key in state.alerts) {
        if (Object.hasOwnProperty.call(state.typeAlert, key)) {
          const element = state.typeAlert[key];
          key === nameAlert && element === false ? (element = true) : (element = false);
        }
      }
    },
    addEmployee(state, obj) {
      let { name, value } = obj;
      state.employeeInput[name] = value;
    },
    validateEmployee(state, nameAlert) {},
    pushWorkerArr(state) {
      // Лучше не смотреть на валидацию, вроде работает и хорошо...
      // for (const key in state.employeeInput) {
      //   const element = state.employeeInput[key];
      //   if (key == "name" && (element.match(/[0-9]/g) || !element.match(/[А-яA-z]/g))) {
      //     alert("Имя должно содержать только буквы");
      //     return false;
      //   } else if (key == "gender" && !element.match(/[А-яA-z]/g)) {
      //     alert("Введите пол");
      //     return false;
      //   } else if (
      //     key == "age" &&
      //     (!Number.isInteger(+element) ||
      //       element.match(/[А-яA-z]/g) ||
      //       +element < 18 ||
      //       +element > 120)
      //   ) {
      //     alert("Возраст должен быть >18, но <120");
      //     return false;
      //   } else if (key == "phone" && (element.match(/[А-яA-z]/g) || !element.match(/[0-9]/g))) {
      //     alert("Введите телефон цифрами");
      //     return false;
      //   }
      // }

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
      state.employeeFormRaw.map((item, index) => {
        checkChief(item, index);
      });
      function checkChief(checking, index) {
        for (const propChild in checking) {
          state.employeeFormRaw.map((item) => {
            const elementChild = checking[propChild];
            if (typeof elementChild === "object" && elementChild.size > 0) {
              for (const elem of elementChild) {
                checkChief(elem, index);
              }
            } else if (propChild == "chief" && elementChild != "") {
              if (item.name == elementChild) {
                item.children.add(checking);
              }
            }
          });
        }
      }
    },
    doFormArrMain(state) {
      state.employeesFormData.length = 0;
      state.employeeFormRaw.map((itemArr) => {
        if (itemArr.chief == "" || itemArr.chief == undefined) {
          state.employeesFormData.push(itemArr);
        }
      });
    },
    checkStatistic(state) {
      let checkArrAges = [];
      let checkArrNames = [];
      let checkArrGender = [0, 0, 0];
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
          } else if (key == "age") {
            checkArrAges.push(element);
          }
          if (key == "name") {
            checkArrNames.push(element);
          }
          if (key == "gender" && element == "Мужской") {
            checkArrGender[0]++;
          } else if (key == "gender" && element == "Женский") {
            checkArrGender[1]++;
          } else if (key == "gender" && element == "Неизвестно") {
            checkArrGender[2]++;
          }
        }
      }
      state.namesEmployees.length = 0;
      state.agesEmployees.length = 0;
      state.genderCount.length = 0;
      checkArrGender.map((item) => state.genderCount.push(item));
      checkArrAges.map((item) => state.agesEmployees.push(item));
      checkArrNames.map((item) => state.namesEmployees.push(item));
    },
    calculatePercentGender(state) {
      let genderValue = 0;
      state.genderCount.map((item) => {
        genderValue += item;
      });
      state.genderPercent = state.genderCount.map((item) => {
        return (item = Math.floor((item / genderValue) * 100));
      });
    },
  },
  actions: {},
  modules: {},
});
