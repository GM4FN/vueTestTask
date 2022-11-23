<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Имя
    </span>
    <ValidationProvider
      rules="alpha|required"
      v-slot="v">
      <input
        name="name"
        type="text"
        class="form-control"
        placeholder="Как зовут"
        :value="name"
        @change="onInputChanged" />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider, extend } from "vee-validate";
import { alpha, required } from "vee-validate/dist/rules";

extend("alpha", { ...alpha, message: "Введите буквы" });
extend("required", {
  ...required,
  message: "Это поле обязательно",
});
export default {
  components: {
    ValidationProvider,
  },
  name: "name-input",
  data() {
    return {};
  },
  computed: {
    name: {
      get() {
        return this.$store.state.employeeFormRaw.name;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "name", value });
      },
    },
  },
  methods: {
    onInputChanged(value) {
      this.$store.commit("addEmployee", { name: "name", value })
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
