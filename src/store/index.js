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
  },
  getters: {},
  mutations: {
    hideWorkerForm(state) {
      state.workerDisplayForm = false;
    },
    showWorkerForm(state) {
      state.workerDisplayForm = true;
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
          (!Number.isInteger(+element) || element.match(/[А-яA-z]/g) || +element < 18)
        ) {
          alert("Возраст должен быть >18");
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
      function checkChief(checking, index) {
        for (const propChild in checking) {
          state.workerFormArr.map((item) => {
            const elementChild = checking[propChild];
            if (typeof elementChild === "object" && elementChild.size > 0) {
              checkChief(elementChild, index);
              console.log("BUG");
            } else if (propChild == "chief" && elementChild != "") {
              if (item.name == elementChild) {
                item.children.add(checking);
                state.workerFormArr.splice(index, 1)
              }
            }
          });
        }
      }

      state.workerFormArr.map((item, index) => {
        checkChief(item, index);
      });
    },
    childCheckingPush(state) {
      // let checking1 = checking;
      //   let chief;
      //   for (const prop in checking) {
      //     if (typeof checking[prop] === "object" && checking[prop].size !== 0) {
      //       console.log("pizda");
      //       checkChief(checking[prop]);
      //     } else if (prop == "chief" && checking[prop] !== "") {
      //       chief = checking[prop];
      //       console.log("Передалось");
      //       for (const prop1 in checking) {
      //         console.log(checking[prop1]);
      //         if (prop1 == "name" && checking1[prop1] == checking[prop]) {
      //         }
      //       }
      //       // state.workerFormArr.children.add(checking);
      //       // checking = null;
      //     }
      //   }
      //
      //
      // checkChief(state);
      // state.workerFormArr.map((item, index) => {
      //   if (item.children.size == 0) {
      //     checkChief(item, index);
      //   } else if (item.children.size != 0) {
      //     console.log("Есть дети");
      //     while (item.children.size != 0) {
      //       checkChief(item, index);
      //     }
      //   }
      // });
      // function checkChief(item, index) {
      //   // Поиск у кого есть шеф
      //   for (const key in item) {
      //     const chief = item[key];
      //     if (key == "chief" && chief !== "") {
      //       let child = item;
      //       console.log(item.name);
      //       // --------
      //       state.workerFormArr.map((item1) => {
      //         for (const key1 in item1) {
      //           const element = item1[key1];
      //           if (key1 == "name" && element == chief) {
      //             item1.children.add(child);
      //             state.workerFormArr.splice(index, 1);
      //           }
      //         }
      //       });
      //     }
      //   }
      // }
    },
  },
  actions: {
    pushArr(state) {
      state.commit("pushWorkerArr");
      state.commit("childCheckingPush");
    },
  },
  modules: {},
});
