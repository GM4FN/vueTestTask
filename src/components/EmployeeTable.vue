<template>
  <div>
    <b-table
      hover
      :items="items"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear="">
    </b-table>
  </div>
</template>

<script>
export default {
  name: "employee-table",
  components: {
    employeeFormItem: () => import("./EmployeeTableItem.vue"),
  },
  props: [],
  data() {
    return {
      fields: [
        { key: "name", sortable: false, label: "Имя" },
        { key: "gender", sortable: true, label: "Пол" },
        { key: "age", sortable: true, label: "Возраст" },
        { key: "phone", sortable: false, label: "Телефон" },
      ],
    };
  },
  computed: {
    items: {
      get() {
        return this.$store.state.employeeData;
      },
    },
  },
};
</script>

<style lang="sass"></style>
