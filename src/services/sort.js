export default {
  /**
   * Сортирует по имени таблицу
   * @param {object} state State из главного store
   * @param {number[]} returns Массив из 2 чисел, определяет направление сортировки
   * @returns {object[]} Отсортированный по имени новый массив
   */
  sortName(state, returns) {
    /**
     * @param {object[]} sortData Отсортированный массив
     * @param {number} maxLevelChild Максимальный уровень вложенности
     * @param {string} counterLevelChild Счётчик уровня вложенности
     */
    let sortData = [],
      maxLevelChild = 0,
      counterLevelChild = "";
    state.employeesData.forEach((item) => {
      maxLevelChild = Math.max(maxLevelChild, item.levelChild.length);
    });
    sortAllLevels();
    /**
     * @returns {void} Сортирует каждый уровень вложенности и записывает в sortData по порядку
     */
    function sortAllLevels() {
      /**
       * @param {object[]} sorting Скопированный массив таблицы
       */
      let sorting = state.employeesData.filter(
        (employee) => employee.levelChild === counterLevelChild
      );
      sorting.sort(function (a, b) {
        let nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return returns[0];
        }
        if (nameA < nameB) {
          return returns[1];
        }
        return 0;
      });
      counterLevelChild += "-";
      sorting.forEach((item) => {
        if (!Object.hasOwnProperty.call(item.chiefForSort, "name")) {
          sortData.push(item);
        }
      });
      sorting.reverse().forEach((itemChild) => {
        if (Object.hasOwnProperty.call(itemChild.chiefForSort, "name")) {
          sortData.forEach((itemParent, indexParent) => {
            let count = 1;
            if (itemParent.id === itemChild.chiefForSort.id) {
              sortData.splice(indexParent + count++, 0, itemChild);
            }
          });
        }
      });
      if (counterLevelChild.length === maxLevelChild + 1) {
        return;
      }
      sortAllLevels();
    }
    return sortData;
  },
  /**
   * Сортирует по полу таблицу
   * @param {object} state State из главного store
   * @param {number[]} returns Массив из 2 чисел, определяет направление сортировки
   * @returns {object[]} Отсортированный по полу новый массив
   */
  sortGender(state, returns) {
    /**
     * @param {object[]} sortData Отсортированный массив
     */
    let sortData = state.employeesData.map((item) => item);
    sortData.sort(function (a, b) {
      if (a.gender > b.gender) {
        return returns[0];
      }
      if (a.gender < b.gender) {
        return returns[1];
      }
      return 0;
    });
    return sortData;
  },
  /**
   * Сортирует по возрасту таблицу
   * @param {object} state State из главного store
   * @param {number[]} returns Массив из 2 чисел, определяет направление сортировки
   * @returns {object[]} Отсортированный по возрасту новый массив
   */
  sortAge(state, returns) {
    /**
     * @param {object[]} sortData Отсортированный массив
     */
    let sortData = state.employeesData.map((item) => item);
    sortData.sort(function (a, b) {
      if (+a.age > +b.age) {
        return returns[0];
      }
      if (+a.age < +b.age) {
        return returns[1];
      }
      return 0;
    });
    return sortData;
  },
  /**
   * Сортирует по телефону таблицу
   * @param {object} state State из главного store
   * @param {number[]} returns Массив из 2 чисел, определяет направление сортировки
   * @returns {object[]} Отсортированный по телефону новый массив
   */
  sortPhone(state, returns) {
    /**
     * @param {object[]} sortData Отсортированный массив
     */
    let sortData = state.employeesData.map((item) => item);
    sortData.sort(function (a, b) {
      if (+a.phone > +b.phone) {
        return returns[0];
      }
      if (+a.phone < +b.phone) {
        return returns[1];
      }
      return 0;
    });
    return sortData;
  },
};
