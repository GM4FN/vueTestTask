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
        return this.$store.state.employeesData.age;
      },
      set(value) {
        this.$store.commit("bindFormInputs", { name: "age", value });
      },
    },
    checkAlerts: {
      get() {
        return this.$store.getters.checkAlerts;
      },
    },
    checkInputsForm: {
      get() {
        return this.$store.getters.checkInputsForm;
      },
    },
  },
  methods: {
    validateInput() {
      if (
        !Number.isInteger(+this.$store.state.formInputs.age) ||
        this.$store.state.formInputs.age.match(/[А-яA-z]/g) ||
        +this.$store.state.formInputs.age < 18 ||
        +this.$store.state.formInputs.age > 120
      ) {
        this.$store.commit("enableAlertInput", "ageAlert");
        this.$store.commit("disableButtonForm");
      } else {
        this.$store.commit("disableAlertInput", "ageAlert");
        if (this.checkAlerts || this.checkInputsForm) {
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
