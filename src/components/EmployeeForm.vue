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
      <name-input
        :data-name-alert.sync="alerts.alertName"
        :data-name-input.sync="inputs.name" />
      <gender-input
        :data-gender-alert.sync="alerts.alertGender"
        :data-gender-input.sync="inputs.gender" />
      <age-input
        :data-age-alert.sync="alerts.alertAge"
        :data-age-input.sync="inputs.age" />
      <phone-input
        :data-phone-alert.sync="alerts.alertPhone"
        :data-phone-input.sync="inputs.phone" />
      <chief-input :data-chief.sync="inputs.chief" />
      <button
        class="btn btn-primary align-self-center"
        :disabled="buttonIsDisabled"
        @click.prevent="setData">
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

export default {
  name: "employee-form",
  components: {
    nameInput,
    genderInput,
    ageInput,
    phoneInput,
    chiefInput,
  },
  data() {
    return {
      alerts: {
        alertName: true,
        alertGender: true,
        alertAge: true,
        alertPhone: true,
      },
      inputs: {
        name: "",
        gender: "",
        age: "",
        phone: "",
        chief: {},
        levelChild: "",
        chiefForSort: {},
        id: this.$store.state.id,
      },
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
      this.$emit("hide-form", false);
      this.buttonIsDisabled = true;
    },
    setData() {
      this.$store.commit("setEmployeesData", this.inputs);
      this.$emit("hide-form", false);
      this.inputs = {
        name: "",
        gender: "",
        age: "",
        phone: "",
        chief: {},
        levelChild: "",
        chiefForSort: {},
        id: this.$store.state.id,
      };
      this.buttonIsDisabled = true;
      this.$store.commit("addLevelChild");
      this.$store.commit("setStatistic");
      this.$store.commit("setPercentGender");
      this.$store.commit("setLocalStorageData");
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
