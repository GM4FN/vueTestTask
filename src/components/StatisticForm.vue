<template>
  <section class="statistic-form flex-column position-absolute justify-content-center">
    <form
      action=""
      class="statistic-form-modal d-flex flex-column align-self-center"
      @submit.prevent="">
      <div class="align-self-center mb-2">Являетесь ли вы сотрудником?</div>
      <name-input @set-name="setDataFromInputs" />
      <phone-input @set-phone="setDataFromInputs" />
      <alert-message v-show="isDataCorrect">Проверьте введенные данные</alert-message>
      <button
        class="btn btn-primary align-self-center mb-2"
        :disabled="buttonIsDisabled"
        @click.prevent="checkData">
        Проверить
      </button>
      
    </form>
  </section>
</template>

<script>
import nameInput from "./Inputs/NameInput.vue";
import phoneInput from "./Inputs/PhoneInput.vue";
import alertMessage from "./AlertMessage.vue";

export default {
  name: "statistic-form",
  components: {
    nameInput,
    phoneInput,
    alertMessage,
  },
  data() {
    return {
      alerts: {
        alertName: true,
        alertPhone: true,
      },
      inputs: {
        name: "",
        phone: "",
      },
      isDataCorrect: false,
    };
  },
  computed: {
    buttonIsDisabled: {
      get() {
        for (const key in this.alerts) {
          const element = this.alerts[key];
          if (element) {
            return true;
          }
        }
        return false;
      },
      set() {},
    },
  },
  methods: {
    hideForm() {
      this.buttonIsDisabled = true;
    },
    checkData() {
      for (const key in this.$store.state.employeesData) {
        const element = this.$store.state.employeesData[key];
        if (element.name === this.inputs.name && element.phone === this.inputs.phone) {
          this.$emit("update-display");
        } else {
          this.isDataCorrect = true;
        }
      }
      
    },
    setDataFromInputs(data) {
      this.alerts[data.alertType] = data.alert;
      this.inputs[data.inputType] = data.input;
    },
  },
};
</script>

<style lang="sass" scoped>
.statistic-form
  display: flex
  width: 75vw
  height: 100vh
  background-color: rgba(200, 200, 200, 0.8 )
  &-modal
    padding: 5px 15px
    width: 80%
    border: 2px solid rgba(150, 150, 150, 1 )
    border-radius: 10px
    background-color: white
.input-group
  span
    width: 25%
</style>
