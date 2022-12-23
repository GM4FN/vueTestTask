<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Руководитель
    </span>
    <select
      class="form-select"
      v-model="chief">
      <option
        disabled
        selected>
        Выберите вашего руководителя
      </option>
      <option
        :value="chief"
        v-for="chief in this.$store.state.employeesData">
        {{ chief.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "chief-input",
  computed: {
    /**
     * @param {object} chief Данные руководителя
     */
    chief: {
      get() {
        return this.$store.state.employeesData.chief;
      },
      set(value) {
        this.$emit("update:data-chief", value);
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
