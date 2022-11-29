<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Пол
    </span>
    <select
      class="form-select"
      v-model="gender"
      @change="validateInput">
      <option
        value=""
        selected>
        Выберите ваш пол
      </option>
      <option value="Женский">Женский</option>
      <option value="Мужской">Мужской</option>
      <option value="Неизвестно">Неизвестно</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "gender-input",
  data() {
    return {};
  },
  computed: {
    gender: {
      get() {
        return this.$store.state.employeesData.gender;
      },
      set(value) {
        this.$store.commit("bindFormInputs", { name: "gender", value });
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
      if (this.$store.state.formInputs.gender === "") {
        this.$store.commit("enableAlertInput", "genderAlert");
        this.$store.commit("disableButtonForm");
      } else {
        this.$store.commit("disableAlertInput", "genderAlert");
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
