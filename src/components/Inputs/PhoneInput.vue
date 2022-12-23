<template>
  <div>
    <div class="input-group mb-2">
      <span
        class="input-group-text d-block"
        id="basic-addon1">
        Телефон
      </span>
      <input
        type="text"
        class="form-control"
        placeholder="Номер телефона"
        v-model="inputData.input"
        @keyup="validateInput(), transmitData()" />
    </div>
    <alert-message v-show="inputData.alert"> Введите телефон цифрами </alert-message>
  </div>
</template>

<script>
import alertMessage from "../AlertMessage.vue";

export default {
  name: "phone-input",
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
      if (
        this.inputData.input.match(/[А-яA-z]/g) ||
        this.inputData.input.match(/\s/g) ||
        this.inputData.input === ""
      ) {
        this.inputData.alert = true;
      } else {
        this.inputData.alert = false;
      }
    },
    transmitData() {
      this.$emit("update:data-phone-alert", this.inputData.alert);
      this.$emit("update:data-phone-input", this.inputData.input );
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
