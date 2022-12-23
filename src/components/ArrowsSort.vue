<template>
  <span>
    <img
      src="../images/iconmonstr-angel-down.png"
      alt=""
      width="15"
      height="15"
      v-show="arrowDown" />
    <img
      src="../images/iconmonstr-angel-up.png"
      alt=""
      width="15"
      height="15"
      v-show="arrowUp" />
  </span>
</template>
<script>
export default {
  name: "arrows-sort",
  props: {
    arrowDown: Boolean,
    arrowUp: Boolean,
  },
};
</script>

<style lang="sass" scoped>
</style>
