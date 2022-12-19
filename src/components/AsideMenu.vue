<template>
  <aside
    class="d-flex flex-column border-end border-2 border-secondary justify-content-center gap-5 bg-light">
    <button-default-aside
      v-for="button in this.buttonsAsideData"
      :key="button.id"
      :namePath="button.namePath"
      class="btn btn-outline-primary"
      @click="$router.push({ name: namePath })">
      {{ button.slot }}
    </button-default-aside>
  </aside>
</template>

<script>
import ButtonDefaultAside from "./ButtonDefaultAside.vue";

export default {
  data() {
    return {
      buttonsAsideData: [
        { id: 2, slot: "К сотрудникам", namePath: "employeeTableTab" },
        { id: 3, slot: "К статистике", namePath: "statisticTab" },
      ],
    };
  },
  components: {
    ButtonDefaultAside,
  },
};
</script>

<style lang="sass" scoped>
aside
  width: 25%
  height: 100vh
  &.d-flex
    padding: 10px
    padding-right: 25px
</style>
