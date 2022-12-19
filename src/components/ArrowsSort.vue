<template>
  <span>
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-show="arrowDown">
      <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
    </svg>
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      v-show="arrowUp">
      <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" />
    </svg>
  </span>
</template>
<script>
export default {
  name: "arrows-sort",
  props: {
    arrowDown: Boolean,
    arrowUp: Boolean,
  }
};
</script>

<style lang="sass" scoped>
svg
  scale: 0.5
</style>
