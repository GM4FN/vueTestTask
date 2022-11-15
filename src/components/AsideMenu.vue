<template>
  <aside
    class="d-flex flex-column h-100 border-end border-2 border-secondary justify-content-center gap-5 bg-light">
    <button-default
      v-for="button in $store.state.btnDataAside"
      :key="button.id"
      :namePath="button.namePath"
      >{{ button.slot }}</button-default
    >
  </aside>
</template>

<script>
import buttonDefault from "./ButtonDefault.vue";

export default {
  data() {
    return {};
  },
  components: {
    buttonDefault,
  },
};
</script>
<style lang="sass" scoped>
aside
  width: 15%
  &.d-flex
    padding: 10px
    padding-right: 25px
</style>
