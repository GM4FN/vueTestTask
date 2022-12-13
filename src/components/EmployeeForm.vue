<template>
  <section class="worker-form flex-column position-absolute justify-content-center">
    <form
      action=""
      class="worker-form-modal d-flex flex-column align-self-center"
      @submit.prevent="">
      <button
        type="button"
        class="btn-close align-self-end justify-center mb-1"
        @click="hideForm"></button>
      <div class="align-self-center mb-2">Добавить сотрудника</div>
      <name-input />
      <alert-message v-show="alertName"> Имя должно содержать только буквы </alert-message>
      <gender-input />
      <alert-message v-show="alertGender"> Введите пол </alert-message>
      <age-input />
      <alert-message v-show="alertAge"> Вы должны быть старше 18, но младше 120... </alert-message>
      <phone-input />
      <alert-message v-show="alertPhone"> Введите телефон цифрами </alert-message>
      <chief-input />
      <button
        class="btn btn-primary align-self-center"
        :disabled="buttonIsDisabled"
        @click="setData">
        Заполнить
      </button>
    </form>
  </section>
</template>

<script>
import nameInput from "./Inputs/NameInput.vue";
import genderInput from "./Inputs/GenderInput.vue";
import ageInput from "./Inputs/AgeInput.vue";
import phoneInput from "./Inputs/PhoneInput.vue";
import chiefInput from "./Inputs/ChiefInput.vue";
import alertMessage from "./AlertMessage.vue";

export default {
  name: "employee-form",
  components: {
    nameInput,
    genderInput,
    ageInput,
    phoneInput,
    chiefInput,
    alertMessage,
  },
  data() {
    return {};
  },
  computed: {
    buttonIsDisabled: {
      get() {
        return this.$store.state.buttonFormIsDisabled;
      },
    },
    alertName: {
      get() {
        return this.$store.state.alerts.nameAlert;
      },
    },
    alertGender: {
      get() {
        return this.$store.state.alerts.genderAlert;
      },
    },
    alertAge: {
      get() {
        return this.$store.state.alerts.ageAlert;
      },
    },
    alertPhone: {
      get() {
        return this.$store.state.alerts.phoneAlert;
      },
    },
  },
  methods: {
    hideForm() {
      this.$store.commit("hideForm");
      this.$store.commit("disableButtonForm");
    },
    setData() {
      this.$store.commit("setEmployeesData");
      this.$store.commit("addLevelChild");
      this.$store.commit("setStatistic");
      this.$store.commit("setPercentGender");
      this.$store.commit("setLocalStorageData");
      this.$store.commit("disableButtonForm");
    },
  },
};
</script>

<style lang="sass" scoped>
.worker-form
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
