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
      <name-input></name-input>
      <alert-message v-show="this.$store.state.alerts.nameAlert">
        Имя должно содержать только буквы
      </alert-message>
      <gender-input></gender-input>
      <alert-message v-show="this.$store.state.alerts.nameAlert"> Введите пол </alert-message>
      <age-input></age-input>
      <alert-message v-show="this.$store.state.alerts.nameAlert">
        Вы должны быть старше 18, но младше 120...
      </alert-message>
      <phone-input></phone-input>
      <alert-message v-show="this.$store.state.alerts.nameAlert">
        Введите телефон цифрами
      </alert-message>
      <chief-input></chief-input>
      <button
        class="btn btn-primary align-self-center"
        @click="setData">
        Заполнить
      </button>
    </form>
  </section>
</template>
<!-- 1 Имя(буквы валид) !!обязательно
    2 Пол !!обязательно
    3 Возраст(>18 валид) !!обязательно
    4 Номер тлф !!обязательно
    5 select(кто наставник) -->
<script>
export default {
  name: "worker-form",
  components: {
    nameInput: () => import("./Inputs/NameInput.vue"),
    genderInput: () => import("./Inputs/GenderInput.vue"),
    ageInput: () => import("./Inputs/AgeInput.vue"),
    phoneInput: () => import("./Inputs/PhoneInput.vue"),
    chiefInput: () => import("./Inputs/ChiefInput.vue"),
    alertMessage: () => import("./AlertMessage.vue"),
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    hideForm() {
      this.$store.commit("hideForm");
    },
    setData() {
      // this.$store.commit("validateEmployee")
      this.$store.commit("pushWorkerArr");
      this.$store.commit("doFormArrMain");
      this.$store.commit("checkStatistic");
      this.$store.commit("calculatePercentGender");
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
