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
  computed: "",
  methods: "",
  name: "button-Default",
  props: {
    namePath: String,
  },
};
</script>
