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
        v-model="name"
        @keyup="validateInput" />
    </div>
    <alert-message v-show="alertName"> Имя должно содержать только буквы </alert-message>
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
      alertName: false,
      name: "",
    };
  },
  computed: {},
  methods: {
    validateInput() {
      if (!this.name.match(/[А-яA-z]/g) || this.name.match(/[0-9]/g)) {
        this.alertName = true;
      } else {
        this.alertName = false;
      }
      let nameInputData = {
        alert: this.alertName,
        alertType: "alertName",
        input: this.name,
        inputType: "name",
      };
      this.$emit("set-name", nameInputData);
    },
  },
};
</script>

<style lang="sass" scoped>
span
  width: 25%
</style>
