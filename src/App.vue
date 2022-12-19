<template>
  <div
    id="app"
    class="d-flex">
    <aside-menu></aside-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import asideMenu from "./components/AsideMenu.vue";

export default {
  components: { asideMenu },
};
</script>

<style lang="sass">
body #app
  height: 100vh
</style>
