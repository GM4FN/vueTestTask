<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear="">
      <!-- <b-tr v-for="child in items.children">
        <b-td>
          {{ child.name }}
        </b-td>
        <b-td>
          {{ child.gender }}
        </b-td>
        <b-td>
          {{ child.age }}
        </b-td>
        <b-td>
          {{ child.phone }}
        </b-td>
      </b-tr> -->
      <template #thead-top>
        <b-tr>
          <b-td></b-td>
          <b-td>dasdsa </b-td>
          <b-td>dasdas</b-td>
          <b-td>dasdas</b-td>
        </b-tr>
      </template>
      <template>
        <b-tr>
          <b-td> жопа </b-td>
          <b-td> попа </b-td>
          <b-td> папа </b-td>
          <b-td> папап </b-td>
        </b-tr>
      </template>
    </b-table>
  </div>
  <!-- <worker-item v-for="table of items"> </worker-item> -->
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
  props: [],
  data() {
    return {
      fields: [
        { key: "name", sortable: true, label: "Имя" },
        { key: "gender", sortable: true, label: "Пол" },
        { key: "age", sortable: true, label: "Возраст" },
        { key: "phone", sortable: false, label: "Телефон" },
      ],
      items: this.$store.state.employeesFormData,
    };
  },
  computed: {},
};
</script>

<style lang="sass"></style>
