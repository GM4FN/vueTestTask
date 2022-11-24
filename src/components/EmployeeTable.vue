<template>
  <div>
    <!-- v-for="(item, key, index) in items"
          :key="index" -->
    <b-table
      hover
      :items="items"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear="">
      <!-- <b-thead>
        <b-tr>
          <b-th>Имя</b-th>
          <b-th>Пол</b-th>
          <b-th>Возраст</b-th>
          <b-th>Телефон</b-th>
        </b-tr>
      </b-thead>
      <b-tbody
        v-for="(item, key, index) in items"
        :key="index">
        <b-tr>
          <b-td> {{ item.name }} </b-td>
          <b-td> {{ item.gender }} </b-td>
          <b-td> {{ item.age }} </b-td>
          <b-td> {{ item.phone }} </b-td>
        </b-tr>
        <b-tr v-for="(itemChild, keyChild, indexChild) of item.children">
          <b-td> -{{ itemChild.name }} </b-td>
          <b-td> {{ itemChild.gender }} </b-td>
          <b-td> {{ itemChild.age }} </b-td>
          <b-td> {{ itemChild.phone }} </b-td>
        </b-tr>
      </b-tbody> -->
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
        { key: "name", sortable: true, label: "Имя" },
        { key: "gender", sortable: true, label: "Пол" },
        { key: "age", sortable: true, label: "Возраст" },
        { key: "phone", sortable: false, label: "Телефон" },
      ],
    };
  },
  computed: {
    items: {
      get() {
        return this.$store.state.employeeFormRaw;
      },
    },
  },
};
</script>

<style lang="sass"></style>
