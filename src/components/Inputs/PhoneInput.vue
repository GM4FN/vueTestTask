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
        v-model="phone"
        @keyup="validateInput" />
    </div>
    <alert-message v-show="alertPhone"> Введите телефон цифрами </alert-message>
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
      alertPhone: false,
      phone: "",
    };
  },
  methods: {
    validateInput() {
      if (this.phone.match(/[А-яA-z]/g) || this.phone.match(/\s/g) || this.phone === "") {
        this.alertPhone = true;
      } else {
        this.alertPhone = false;
      }
      let phoneInputData = {
        alert: this.alertPhone,
        alertType: "alertPhone",
        input: this.phone,
        inputType: "phone",
      };
      this.$emit("set-phone", phoneInputData);
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
