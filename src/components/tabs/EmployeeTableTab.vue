<template>
  <section class="worker-tab d-flex flex-column gap-5">
    <div class="d-flex justify-content-around">
      <button
        class="btn btn-outline-secondary rounded-pill mt-5 align-self-center"
        type="button"
        @click="clearData"
        value="toDefault">
        Очистить таблицу
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary rounded-pill mt-5 align-self-center"
        @click="showForm">
        Добавить
      </button>
    </div>
    <employee-table />
    <employee-form
      v-if="formIsDisplay"
      @hide-form="formIsDisplay = $event" />
  </section>
</template>

<script>
import employeeTable from "../EmployeeTable.vue";

export default {
  components: {
    employeeForm: () => import("../EmployeeForm.vue"),
    employeeTable,
  },
  data() {
    return {
      /**
       * @param {boolean} formIsDisplay Отображается ли форма
       */
      formIsDisplay: false,
    };
  },
  methods: {
    showForm() {
      this.formIsDisplay = true;
    },
    /**
     * Очищает все данные из Store
     */
    clearData() {
      this.$store.commit("clearData");
    },
  },
};
</script>

<style lang="sass" scoped>
.worker-tab
  width: 75vw
</style>
