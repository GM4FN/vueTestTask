<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Возраст
    </span>
    <input
      type="text"
      class="form-control"
      placeholder="Сколько лет"
      v-model="age"
      @keyup="validateInput" />
  </div>
</template>

<script>
export default {
  name: "age-input",
  data() {
    return {};
  },
  computed: {
    age: {
      get() {
        return this.$store.state.employeeData.age;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "age", value });
      },
    },
    checkAlerts: {
      get() {
        return this.$store.getters.checkAlerts;
      },
    },
    checkEmployeeInput: {
      get() {
        return this.$store.getters.checkEmployeeInput;
      },
    },
  },
  methods: {
    validateInput() {
      if (
        !Number.isInteger(+this.$store.state.employeeInput.age) ||
        this.$store.state.employeeInput.age.match(/[А-яA-z]/g) ||
        +this.$store.state.employeeInput.age < 18 ||
        +this.$store.state.employeeInput.age > 120
      ) {
        this.$store.commit("enableAlertInput", "ageAlert");
        this.$store.commit("disableButtonForm");
      } else {
        this.$store.commit("disableAlertInput", "ageAlert");
        if (this.checkAlerts || this.checkEmployeeInput) {
          this.$store.commit("disableButtonForm");
        } else {
          this.$store.commit("enableButtonForm");
        }
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
