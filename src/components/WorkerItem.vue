<template>
  <tr>
    <td>{{ table.name }}</td>
    <td>{{ table.gender }}</td>
    <td>{{ table.age }}</td>
    <td>{{ table.phone }}</td>
    <worker-item
      v-for="(table, prop, index) of this.table.children"
      :table="table"
      :key="table.name">
    </worker-item>
  </tr>
</template>

<script>
export default {
  name: "worker-item",
  props: ["table"],
  computed: {
    // child: {
    //   i: "pop",
    //   get() {},
    //   set() {
    //     for (const prop in this.table) {
    //       const element = this.table[prop];
    //       if (typeof element === "object" && element.size > 0) {
    //         console.log(element);
    //         return element.keys();
    //         for (const i of element) {
    //           console.log(i);
    //           return i;
    //         }
    //       }
    //     }
    //   },
    // },
  },
  data() {
    return {};
  },
};
</script>
