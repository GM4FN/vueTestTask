<template>
  <section class="worker-tab d-flex flex-column gap-5">
    <div class="d-flex justify-content-around">
      <button
        type="button"
        class="btn btn-outline-secondary rounded-pill mt-5 align-self-center"
        @click="showForm">
        Добавить
      </button>
    </div>
    <!-- <table class="table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Пол</th>
          <th>Возраст</th>
          <th>Телефон</th>
        </tr>
      </thead>

      <tbody>
        
      </tbody>
    </table> -->
    <employee-table></employee-table>
    <employee-form v-show="this.$store.state.formIsDisplay"></employee-form>
  </section>
</template>
<script>
export default {
  components: {
    employeeForm: () => import("../EmployeeForm.vue"),
    employeeTable: () => import("../EmployeeTable.vue"),
  },
  data() {
    return {};
  },
  methods: {
    showForm() {
      this.$store.commit("showForm");
    },
  },
  computed: {},
};
</script>

<style lang="sass" scoped>
.worker-tab
  width: 75vw
</style>
