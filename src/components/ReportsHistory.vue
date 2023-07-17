<template>
  <div class="reports__history">
    <div class="history__title">
      <h2>Журнал отчетов:</h2>
    </div>
    <div>
      <table class="report__table">
        <thead>
          <tr>
            <th>Организация</th>
            <th>Дата добавления</th>
            <th>Автор</th>
            <th>Период</th>
            <th>Год</th>
            <th>Квартал</th>
            <th>Месяц</th>
            <th>Статус</th>
            <th>Экспорт Excel</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in $store.state.reportsOutList" :key="item.id">
            <td>{{ item.org }}</td>
            <td>{{ item.date_time }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.report_period }}</td>
            <td>{{ item.report_year }}</td>
            <td>{{ item.report_quarter }}</td>
            <td>{{ item.report_month }}</td>
            <td>{{ item.report_status }}</td>
            <td><a href="#" @click="fetchHistoryFile(item.id)">Скачать</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    async fetchHistoryFile(id) {
      await axios
        .post("http://127.0.0.1:8000/api/reports-export/", {output_id: id}, {
          responseType: "blob",
          headers: {
            Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
          },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "template.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((e) => {
          alert("Ошибка при скачивании");
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.reports__history {
  padding-left: 1%;
}
h2 {
  font-size: 21px;
  font-weight: 500;
}
.history__title {
  margin-bottom: 2%;
}
thead {
  background-color: #bbd7ea;
}
tr {
  height: 53px;
}
.report__table {
  width: 99.5%;
  border-collapse: collapse;
  border: 1px solid #dddfe5;
}
.report__table th,
.report__table td {
  border: 1px solid #dddfe5;
  text-align: center;
  width: 11%;
  font-size: 10px;
  font-weight: 600;
}
</style>
