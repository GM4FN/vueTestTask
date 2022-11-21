<template>
  <div class="d-flex">
    <!-- checkStatistic -->
    <bar-statistic></bar-statistic>
    <pie-statistic></pie-statistic>
  </div>
</template>

<script>
import barStatistic from "../AgeWorkersBar.vue";
import pieStatistic from "../GenderWorkersPie.vue";
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
<style lang="sass" scoped>

</style>
