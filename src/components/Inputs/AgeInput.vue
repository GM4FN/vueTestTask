<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Возраст
    </span>
    <input
      type="text"
      class="form-control"
      placeholder="Сколько лет"
      aria-label="Username"
      aria-describedby="basic-addon1"
      v-model="age"
      required />
  </div>
</template>

<script>
export default {
  name: "age-input",
  data() {
    return {};
  },
  computed: {
    age: {
      get() {
        return this.$store.state.employeeFormRaw.age;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "age", value });
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
