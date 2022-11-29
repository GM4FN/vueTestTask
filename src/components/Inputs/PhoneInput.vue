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
      v-model="phone"
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
        return this.$store.state.employeesData.phone;
      },
      set(value) {
        this.$store.commit("bindFormInputs", { name: "phone", value });
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
        this.$store.state.formInputs.phone.match(/[А-яA-z]/g) ||
        this.$store.state.formInputs.phone.match(/\s/g) ||
        this.$store.state.formInputs.phone === ""
      ) {
        this.$store.commit("enableAlertInput", "phoneAlert");
        this.$store.commit("disableButtonForm");
      } else {
        this.$store.commit("disableAlertInput", "phoneAlert");
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
