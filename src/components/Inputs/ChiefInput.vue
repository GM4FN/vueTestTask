<template>
  <div class="input-group mb-3">
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="chief">
      <option
        disabled
        selected>
        Выберите вашего руководителя
      </option>
      <option
        :value="chief"
        v-for="chief in this.$store.state.maybeChief">
        {{ chief }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "chief-input",
  data() {
    return {};
  },
  computed: {
    chief: {
      get() {
        return this.$store.state.employeeFormRaw.chief;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "chief", value });
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
