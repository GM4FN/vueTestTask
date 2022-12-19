<template>
  <div>
    <div class="input-group mb-2">
      <span
        class="input-group-text d-block"
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
    <alert-message v-show="alertGender"> Введите пол </alert-message>
  </div>
</template>

<script>
import alertMessage from "../AlertMessage.vue";

export default {
  name: "gender-input",
  components: {
    alertMessage,
  },
  data() {
    return {
      alertGender: false,
      gender: "",
    };
  },
  methods: {
    validateInput() {
      if (this.gender === "") {
        this.alertGender = true;
      } else {
        this.alertGender = false;
      }
      let genderInputData = {
        alert: this.alertGender,
        alertType: "alertGender",
        input: this.gender,
        inputType: "gender",
      };
      this.$emit("set-gender", genderInputData);
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
