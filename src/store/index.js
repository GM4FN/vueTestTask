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
    workerDisplayForm: false,
    workerFormRaw: {
      name: "",
      gender: "",
      age: "",
      phone: "",
      chief: "",
      children: new Set(),
    },
    workerFormArr: [],
    maybeChief: [],
    normalFormArr: [],
    tableChildDisplay: true,
    agesWorkers: [],
    namesWorkers: [],
    genderCountWorkers: [],
  },
  getters: {},
  mutations: {
    hideWorkerForm(state) {
      state.workerDisplayForm = false;
    },
    showWorkerForm(state) {
      state.workerDisplayForm = true;
    },
    displayChild(state) {
      if (state.tableChildDisplay == false) {
        state.tableChildDisplay = true;
      } else {
        state.tableChildDisplay = false;
      }
    },
    pushWorkerRaw(state, obj) {
      let { name, value } = obj;
      state.workerFormRaw[name] = value;
    },
    pushWorkerArr(state) {
      // Лучше не смотреть на валидацию, вроде работает и хорошо...
      for (const key in state.workerFormRaw) {
        const element = state.workerFormRaw[key];
        if (key == "name" && (element.match(/[0-9]/g) || !element.match(/[А-яA-z]/g))) {
          alert("Имя должно содержать только буквы");
          return false;
        } else if (key == "gender" && !element.match(/[А-яA-z]/g)) {
          alert("Введите пол");
          return false;
        } else if (
          key == "age" &&
          (!Number.isInteger(+element) ||
            element.match(/[А-яA-z]/g) ||
            +element < 18 ||
            +element > 120)
        ) {
          alert("Возраст должен быть >18, но <120");
          return false;
        } else if (key == "phone" && (element.match(/[А-яA-z]/g) || !element.match(/[0-9]/g))) {
          alert("Введите телефон цифрами");
          return false;
        }
      }
      let cloneFormRaw = {};
      for (const key in state.workerFormRaw) {
        if (Object.hasOwnProperty.call(state.workerFormRaw, key)) {
          cloneFormRaw[key] = state.workerFormRaw[key];
        }
      }
      state.workerFormArr.push(cloneFormRaw);
      state.maybeChief.push(cloneFormRaw.name);
      state.workerFormRaw = {
        name: "",
        gender: "",
        age: "",
        phone: "",
        chief: "",
        children: new Set(),
      };
      state.workerFormArr.map((item, index) => {
        checkChief(item, index);
      });
      function checkChief(checking, index) {
        for (const propChild in checking) {
          state.workerFormArr.map((item) => {
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
      state.normalFormArr.length = 0;
      state.workerFormArr.map((itemArr) => {
        if (itemArr.chief == "" || itemArr.chief == undefined) {
          state.normalFormArr.push(itemArr);
        }
        // function deepClone(obj) {
        //   const clObj = {};
        //   for (const i in obj) {
        //     if (typeof obj[i] === "object" && obj[i].size > 0) {
        //       for (const iterator of obj[i]) {
        //         clObj[i] = iterator;
        //         if (typeof iterator === "object" && iterator.size > 0) {
        //           deepClone(iterator);
        //         }
        //       }
        //       continue;
        //     }
        //     clObj[i] = obj[i];
        //   }
        //   return clObj;
        // }
      });
    },
    checkStatistic(state) {
      let checkArrAges = [];
      let checkArrNames = [];
      let checkArrGender = [0, 0, 0];
      state.normalFormArr.map((item) => {
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
      state.namesWorkers.length = 0;
      state.agesWorkers.length = 0;
      state.genderCountWorkers.length = 0;
      checkArrGender.map((item) => state.genderCountWorkers.push(item));
      checkArrAges.map((item) => state.agesWorkers.push(item));
      checkArrNames.map((item) => state.namesWorkers.push(item));
    },
  },
  actions: {},
  modules: {},
});
