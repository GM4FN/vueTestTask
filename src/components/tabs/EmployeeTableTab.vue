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
    <worker-item></worker-item>

    <worker-form v-show="this.$store.state.formIsDisplay"></worker-form>
  </section>
</template>
<script>
export default {
  components: {
    workerForm: () => import("../EmployeeForm.vue"),
    workerItem: () => import("../EmployeeItem.vue"),
  },
  data() {
    return {};
  },
  methods: {
    showForm() {
      this.$store.commit("showForm");
    },
  },
  computed: {
    // items: {
    //   get() {
    //     return this.$store.state.normalFormArr;
    //   },
    // },
  },
};
</script>

<style lang="sass" scoped>
.worker-tab
  width: 75vw
</style>
