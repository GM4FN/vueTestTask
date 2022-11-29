<template>
  <div class="d-flex">
    <bar-statistic />
    <pie-statistic />
  </div>
</template>

<script>
import barStatistic from "../AgeEmployeeBar.vue";
import pieStatistic from "../GenderEmployeePie.vue";

export default {
  components: {
    barStatistic,
    pieStatistic,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="sass" scoped></style>
