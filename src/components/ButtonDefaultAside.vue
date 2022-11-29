<template>
  <button
    type="button"
    class="btn btn-outline-primary text-wrap"
    @click="$router.push({ name: namePath })">
    <slot></slot>
  </button>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "button-default-aside",
  props: {
    namePath: String,
  },
};
</script>
