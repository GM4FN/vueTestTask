export default {
  sortName(state, returns) {
    let sortData = [],
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
  sortGender(state, returns) {
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
  sortAgeOrPhone(state, returns, sortingBy) {
    let sortData = state.employeesData.map((item) => item);
    sortData.sort(function (a, b) {
      if (+a[sortingBy] > +b[sortingBy]) {
        return returns[0];
      }
      if (+a[sortingBy] < +b[sortingBy]) {
        return returns[1];
      }
      return 0;
    });
    return sortData;
  },
};
