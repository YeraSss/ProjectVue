<template>
  <div class="table">
    <table class="report__table">
      <thead>
        <tr>
          <th>Наименование показателя</th>
          <th>Введенные данные</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id">
          <td>
            {{ item.indicator_name }}
          </td>
          <td>
            {{ item.indicator_value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.report__table {
  width: 100%;
  border-collapse: collapse;
}
.report__table th,
.report__table td {
  padding: 8px;
  border: 2px solid #417690;
}
</style>
