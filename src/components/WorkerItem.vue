<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear=""></b-table>
    <!-- <worker-item v-for="table of items"> </worker-item> -->
  </div>
  <!-- <tr >
    <td>{{ table.name }}</td>
    <td>{{ table.gender }}</td>
    <td>{{ table.age }}</td>
    <td>{{ table.phone }}</td>
    <worker-item
      v-for="(table, prop, index) of child"
      :table="table"
      v-show="this.$store.state.tableChildDisplay"
      :key="table.name">
    </worker-item>
  </tr> -->
</template>

<script>
export default {
  name: "worker-item",
  props: ["table"],
  data() {
    return {
      fields: [
        { key: "name", sortable: true, label: "Имя" },
        { key: "gender", sortable: true, label: "Пол" },
        { key: "age", sortable: true, label: "Возраст" },
        { key: "phone", sortable: false, label: "Телефон" },
        { key: "children", sortable: false, label: "Дочерний" },
      ],
    };
  },
  computed: {
    child: {
      get() {
        return this.table.children;
      },
    },
    items: {
      items: [],
      get() {
        return this.$store.state.normalFormArr;
      },
    },
  },
};
</script>

<style lang="sass"></style>
