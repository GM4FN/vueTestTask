<template>
  <div>
    <div class="input-group mb-2">
      <span
        class="input-group-text d-block"
        id="basic-addon1">
        Имя
      </span>
      <input
        type="text"
        class="form-control"
        placeholder="Как зовут"
        v-model="inputData.input"
        @keyup="validateInput(), transmitData()" />
    </div>
    <alert-message v-show="inputData.alert"> Имя должно содержать только буквы </alert-message>
  </div>
</template>

<script>
import alertMessage from "../AlertMessage.vue";

export default {
  name: "name-input",
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
      if (!this.inputData.input.match(/^[А-яЁёA-z]+$/g) || this.inputData.input.match(/[0-9]/g)) {
        this.inputData.alert = true;
      } else {
        this.inputData.alert = false;
      }
    },
    transmitData() {
      this.$emit("update:data-name-alert", this.inputData.alert);
      this.$emit("update:data-name-input", this.inputData.input);
    },
  },
};
</script>

<style lang="sass" scoped>
span
  width: 25%
</style>
