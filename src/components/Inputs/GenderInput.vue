<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Пол
    </span>
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="gender"
      required>
      <option
        disabled
        selected>
        Выберите ваш пол
      </option>
      <option value="Женский">Женский</option>
      <option value="Мужской">Мужской</option>
      <option value="Неизвестно">Неизвестно</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "gender-input",
  data() {
    return {};
  },
  computed: {
    gender: {
      get() {
        return this.$store.state.employeeFormRaw.gender;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "gender", value });
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.input-group
span
  width: 25%
</style>
