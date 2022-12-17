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
        v-model="age"
        @keyup="validateInput" />
    </div>
    <alert-message v-show="alertAge"> Вы должны быть старше 18, но младше 120... </alert-message>
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
      alertAge: false,
      age: "",
    };
  },
  computed: {
   
  },
  methods: {
    validateInput() {
      if (
        !Number.isInteger(+this.age) ||
        this.age.match(/[А-яA-z]/g) ||
        +this.age < 18 ||
        +this.age > 120
      ) {
        this.alertAge = true;
      } else {
        this.alertAge = false;
      }
      let ageInputData = {
        alert: this.alertAge,
        alertType: "alertAge",
        input: this.age,
        inputType: "age",
      };
      this.$emit("set-age", ageInputData);
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
