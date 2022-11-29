<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Имя
    </span>
    <input
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
        return this.$store.state.employeesData.name;
      },
      set(value) {
        this.$store.commit("bindFormInputs", { name: "name", value });
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
        !this.$store.state.formInputs.name.match(/[А-яA-z]/g) ||
        this.$store.state.formInputs.name.match(/[0-9]/g)
      ) {
        this.$store.commit("enableAlertInput", "nameAlert");
        this.$store.commit("disableButtonForm");
      } else {
        this.$store.commit("disableAlertInput", "nameAlert");
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
