<template>
  <section class="worker-tab d-flex flex-column align-items-center justify-content-start gap-5">
    <button
      type="button"
      class="btn btn-outline-secondary rounded-pill mt-5"
      @click="showForm">
      Добавить
    </button>
    <table class="table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Пол</th>
          <th>Возраст</th>
          <th>Номер телефона</th>
        </tr>
      </thead>
      <tbody>
        <worker-item
          v-for="(table, index) in $store.state.normalFormArr"
          :table="table"
          :key="index">
        </worker-item>
      </tbody>
    </table>
    <worker-form v-show="this.$store.state.workerDisplayForm"></worker-form>
  </section>
</template>
<script>
export default {
  components: {
    workerForm: () => import("../WorkerForm.vue"),
    workerItem: () => import("../WorkerItem.vue"),
  },
  data() {
    return {};
  },
  methods: {
    showForm() {
      this.$store.commit("showWorkerForm");
    },
  },
};
</script>

<style lang="sass" scoped>
.worker-tab
  width: 75vw
</style>
