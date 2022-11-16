<template>
  <tr>
    <td>{{ table.name }}</td>
    <td>{{ table.gender }}</td>
    <td>{{ table.age }}</td>
    <td>{{ table.phone }}</td>
  </tr>
</template>

<script>
export default {
  name: "worker-item",
  props: [
    "table"
  ]
};
</script>
