<template>
  <div>
    <section
      class="statistic d-flex"
      v-if="statisticIsDisplay">
      <bar-statistic />
      <pie-statistic />
    </section>
    <statistic-form
      v-else-if="formIsDisplay"
      @update-display="showStatistic" />
  </div>
</template>

<script>
import barStatistic from "../AgeEmployeeBar.vue";
import pieStatistic from "../GenderEmployeePie.vue";
import statisticForm from "../StatisticForm.vue";

export default {
  components: {
    barStatistic,
    pieStatistic,
    statisticForm,
  },
  data() {
    return {
      /**
       * @param {boolean} formIsDisplay Отображение формы
       * @param {boolean} statisticIsDisplay Отображение статистики
       */
      formIsDisplay: true,
      statisticIsDisplay: false,
    };
  },
  methods: {
    showStatistic() {
      this.formIsDisplay = false;
      this.statisticIsDisplay = true;
    },
  },
};
</script>

<style lang="sass" scoped>
.statistic
  width: 75vw
</style>
