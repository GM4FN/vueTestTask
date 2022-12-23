<template>
  <div>
    <div class="input-group mb-2">
      <span
        class="input-group-text d-block"
        id="basic-addon1">
        Возраст
      </span>
      <input
        type="text"
        class="form-control"
        placeholder="Сколько лет"
        v-model="inputData.input"
        @keyup="validateInput(), transmitData()" />
    </div>
    <alert-message v-show="inputData.alert">
      Вы должны быть старше 18, но младше 120...
    </alert-message>
  </div>
</template>

<script>
import alertMessage from "../AlertMessage.vue";

export default {
  name: "age-input",
  components: {
    alertMessage,
  },
  data() {
    return {
      /**
       * @param {object} inputData Данные поля ввода
       */
      inputData: {
        /**
         * @param {boolean} alert Данные поля ввода
         * @param {string} input Данные поля ввода
         */
        alert: false,
        input: "",
      },
    };
  },
  methods: {
    validateInput() {
      if (
        !Number.isInteger(+this.inputData.input) ||
        this.inputData.input.match(/[А-яA-z]/g) ||
        +this.inputData.input < 18 ||
        +this.inputData.input > 120
      ) {
        this.inputData.alert = true;
      } else {
        this.inputData.alert = false;
      }
    },
    transmitData() {
      this.$emit("update:data-age-alert", this.inputData.alert);
      this.$emit("update:data-age-input", this.inputData.input);
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
