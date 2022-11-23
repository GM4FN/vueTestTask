<template>
  <div class="input-group mb-3">
    <span
      class="input-group-text d-inline-block"
      id="basic-addon1">
      Телефон
    </span>
    <input
      type="text"
      class="form-control"
      placeholder="Номер телефона"
      aria-label="Username"
      aria-describedby="basic-addon1"
      v-model="phone"
      required />
  </div>
</template>

<script>
export default {
  name: "phone-input",
  data() {
    return {};
  },
  computed: {
    phone: {
      get() {
        return this.$store.state.employeeFormRaw.phone;
      },
      set(value) {
        this.$store.commit("addEmployee", { name: "phone", value });
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
