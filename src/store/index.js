import Vue from "vue";
import Vuex from "vuex";
import sort from "./sort.js";

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
    formInputs: {
      name: "",
      gender: "",
      age: "",
      phone: "",
      chief: {},
      levelChild: "",
      chiefForSort: {},
      id: JSON.parse(localStorage.getItem("idCount")) || 0,
    },
    employeesData: JSON.parse(localStorage.getItem("employeesData")) || [],
    maybeChief: JSON.parse(localStorage.getItem("maybeChief")) || [],
    agesEmployees: JSON.parse(localStorage.getItem("agesEmployees")) || [],
    namesEmployees: JSON.parse(localStorage.getItem("namesEmployees")) || [],
    genderCount: JSON.parse(localStorage.getItem("genderCount")) || [],
    genderPercent: JSON.parse(localStorage.getItem("genderPercent")) || [],
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
    checkInputsForm(state) {
      for (const key in state.formInputs) {
        if (Object.hasOwnProperty.call(state.formInputs, key)) {
          const element = state.formInputs[key];
          if (
            element === "" &&
            key !== "chief" &&
            key !== "levelChild" &&
            key !== "chiefForSort" &&
            key !== "id"
          ) {
            return true;
          }
        }
      }
    },
    sortNameByIncrease(state) {
      let sortedData = [],
        maxLevelChild = 0,
        counterLevelChild = "";
      state.employeesData.forEach((item) => {
        maxLevelChild = Math.max(maxLevelChild, item.levelChild.length);
      });
      sortAllLevels();
      function sortAllLevels() {
        let sorting = state.employeesData.filter(
          (employee) => employee.levelChild === counterLevelChild
        );
        sorting.sort(function (a, b) {
          let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
        counterLevelChild += "-";
        sorting.forEach((item) => {
          if (!Object.hasOwnProperty.call(item.chiefForSort, "name")) {
            sortedData.push(item);
          }
        });
        sorting.reverse().forEach((itemChild) => {
          if (Object.hasOwnProperty.call(itemChild.chiefForSort, "name")) {
            sortedData.forEach((itemParent, indexParent) => {
              let count = 1;
              if (itemParent.id === itemChild.chiefForSort.id) {
                sortedData.splice(indexParent + count++, 0, itemChild);
              }
            });
          }
        });
        if (counterLevelChild.length === maxLevelChild + 1) {
          return;
        }
        sortAllLevels();
      }
      return sortedData;
    },
    sortNameByDecrease(state) {
      let sortedData = [],
        maxLevelChild = 0,
        counterLevelChild = "";
      state.employeesData.forEach((item) => {
        maxLevelChild = Math.max(maxLevelChild, item.levelChild.length);
      });
      sortAllLevels();
      function sortAllLevels() {
        let sorting = state.employeesData.filter(
          (employee) => employee.levelChild === counterLevelChild
        );
        sorting.sort(function (a, b) {
          let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA > nameB) {
            return 1;
          }
          if (nameA < nameB) {
            return -1;
          }
          return 0;
        });
        counterLevelChild += "-";
        sorting.forEach((item) => {
          if (!Object.hasOwnProperty.call(item.chiefForSort, "name")) {
            sortedData.push(item);
          }
        });
        sorting.reverse().forEach((itemChild) => {
          if (Object.hasOwnProperty.call(itemChild.chiefForSort, "name")) {
            sortedData.forEach((itemParent, indexParent) => {
              let count = 1;
              if (itemParent.id === itemChild.chiefForSort.id) {
                sortedData.splice(indexParent + count++, 0, itemChild);
              }
            });
          }
        });
        if (counterLevelChild.length === maxLevelChild + 1) {
          return;
        }
        sortAllLevels();
      }
      return sortedData;
    },
    sortGenderByIncrease(state) {
      sort.sortGender(state, "Increase");
      // let sortData = state.employeesData.map((item) => item);
      // sortData.sort(function (a, b) {
      //   if (a.gender > b.gender) {
      //     return -1;
      //   }
      //   if (a.gender < b.gender) {
      //     return 1;
      //   }
      //   return 0;
      // });
      // return sortData;
    },
    sortGenderByDecrease(state) {
      sort.sortGender(state, "Decrease");
      // let sortData = state.employeesData.map((item) => item);
      // sortData.sort(function (a, b) {
      //   if (a.gender > b.gender) {
      //     return 1;
      //   }
      //   if (a.gender < b.gender) {
      //     return -1;
      //   }
      //   return 0;
      // });
      // return sortData;
    },
    sortAgeByIncrease(state) {
      let sortData = state.employeesData.map((item) => item);
      sortData.sort((a, b) => +a.age - +b.age);
      return sortData;
    },
    sortAgeByDecrease(state) {
      let sortData = state.employeesData.map((item) => item);
      sortData.sort((a, b) => +b.age - +a.age);
      return sortData;
    },
    sortPhoneByIncrease(state) {
      let sortData = state.employeesData.map((item) => item);
      sortData.sort((a, b) => +a.phone - +b.phone);
      return sortData;
    },
    sortPhoneByDecrease(state) {
      let sortData = state.employeesData.map((item) => item);
      sortData.sort((a, b) => +b.phone - +a.phone);
      return sortData;
      sort.sortPhone(state, a.phone, b.phone)
      // sortPhone(state, b.phone, a.phone)
    },
  },
  mutations: {
    hideForm(state) {
      state.formIsDisplay = false;
    },
    showForm(state) {
      state.formIsDisplay = true;
    },
    bindFormInputs(state, obj) {
      let { name, value } = obj;
      state.formInputs[name] = value;
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
    setEmployeesData(state) {
      let cloneFormRaw = {};
      for (const key in state.formInputs) {
        if (Object.hasOwnProperty.call(state.formInputs, key)) {
          cloneFormRaw[key] = state.formInputs[key];
        }
      }
      state.employeesData.push(cloneFormRaw);
      state.maybeChief.push(cloneFormRaw);
      state.formInputs = {
        name: "",
        gender: "",
        age: "",
        phone: "",
        chief: {},
        levelChild: "",
        chiefForSort: {},
        id: ++cloneFormRaw.id,
      };
    },
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
      state.maybeChief.length = 0;
      state.employeesData.forEach((item) => {
        state.maybeChief.push(item);
      });
    },
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
    setPercentGender(state) {
      let genderValue = 0;
      state.genderCount.forEach((item) => {
        genderValue += item;
      });
      state.genderPercent = state.genderCount.map((item) => {
        return (item = Math.floor((item / genderValue) * 100));
      });
    },
    setLocalStorageData(state) {
      localStorage.setItem("employeesData", JSON.stringify(state.employeesData));
      localStorage.setItem("maybeChief", JSON.stringify(state.maybeChief));
      localStorage.setItem("agesEmployees", JSON.stringify(state.agesEmployees));
      localStorage.setItem("namesEmployees", JSON.stringify(state.namesEmployees));
      localStorage.setItem("genderCount", JSON.stringify(state.genderCount));
      localStorage.setItem("genderPercent", JSON.stringify(state.genderPercent));
      localStorage.setItem("idCount", JSON.stringify(state.formInputs.id));
    },
    clearData(state) {
      localStorage.clear();
      state.employeesData = [];
      state.maybeChief = [];
      state.agesEmployees = [];
      state.namesEmployees = [];
      state.genderCount = [];
      state.genderPercent = [];
      state.formInputs.id = 0;
    },
  },
  actions: {},
  modules: {},
});
