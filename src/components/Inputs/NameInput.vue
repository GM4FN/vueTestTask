<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Имя
    </span>
    <input
      name="name"
      type="text"
      class="form-control"
      placeholder="Как зовут"
      v-model="name"
      @keyup="validateInput" />
  </div>
</template>

<script>
export default {
  name: "name-input",
  data() {
    return {};
  },
  computed: {
    name: {
      get() {
        return this.$store.state.employeeData.name;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "name", value });
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
        !this.$store.state.employeeInput.name.match(/[А-яA-z]/g) ||
        this.$store.state.employeeInput.name.match(/[0-9]/g)
      ) {
        this.$store.commit("enableAlertInput", "nameAlert");
        this.$store.commit("disableButtonForm");
      } else {
        this.$store.commit("disableAlertInput", "nameAlert");
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
