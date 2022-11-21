<template>
  <section class="worker-tab d-flex flex-column gap-5">
    <div class="d-flex justify-content-around">
      <button
        type="button"
        class="btn btn-outline-secondary rounded-pill mt-5 align-self-center"
        @click="displayChild">
        Показать дочерние
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary rounded-pill mt-5 align-self-center"
        @click="showForm">
        Добавить
      </button>
    </div>

    <div>
      <b-table
        striped
        hover
        :items="items"
        :fields="fields"></b-table>
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
    <worker-item> </worker-item>

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
    displayChild() {
      this.$store.commit("displayChild");
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
