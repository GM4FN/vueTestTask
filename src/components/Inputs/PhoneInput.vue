<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Телефон
    </span>
    <input
      type="text"
      class="form-control"
      placeholder="Номер телефона"
      aria-label="Username"
      aria-describedby="basic-addon1"
      v-model="phone"
      required
      @keyup="validateInput" />
  </div>
</template>

<script>
export default {
  name: "phone-input",
  data() {
    return {};
  },
  computed: {
    phone: {
      get() {
        return this.$store.state.employeeData.phone;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "phone", value });
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
        this.$store.state.employeeInput.phone.match(/[А-яA-z]/g) ||
        this.$store.state.employeeInput.phone.match(/\s/g) ||
        this.$store.state.employeeInput.phone === ""
      ) {
        this.$store.commit("enableAlertInput", "phoneAlert");
        this.$store.commit("disableButtonForm");
      } else {
        this.$store.commit("disableAlertInput", "phoneAlert");
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
