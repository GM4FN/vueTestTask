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
        v-model="inputData.input"
        @change="validateInput(), transmitData()">
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
    <alert-message v-show="inputData.alert"> Введите пол </alert-message>
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
      inputData: {
        alert: false,
        input: "",
      },
    };
  },
  methods: {
    validateInput() {
      if (this.inputData.input === "") {
        this.inputData.alert = true;
      } else {
        this.inputData.alert = false;
      }
    },
    transmitData() {
      this.$emit("update:data-gender-alert", this.inputData.alert);
      this.$emit("update:data-gender-input", this.inputData.input);
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
