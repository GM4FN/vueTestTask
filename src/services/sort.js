export default {
  sortGender(state, by) {
    let sortData = state.employeesData.map((item) => item);
    switch (by) {
      case "Increase":
        sortData.sort(function (a, b) {
          if (a.gender > b.gender) {
            return -1;
          }
          if (a.gender < b.gender) {
            return 1;
          }
          return 0;
        });
        break;
      case "Decrease":
        sortData.sort(function (a, b) {
          if (a.gender > b.gender) {
            return 1;
          }
          if (a.gender < b.gender) {
            return -1;
          }
          return 0;
        });
        break;
    }
    // console.log(sortData);
    return sortData;
  },
  sortPhone(state, firseEl, secondEl) {
    let sortData = state.employeesData.map((item) => item);
    sortData.sort((a, b) => +firseEl - +secondEl);
    return sortData;
  },

  sortGenderByIncrease(state) {},
  sortGenderByDecrease(state) {},
};
