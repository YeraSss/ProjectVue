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
            <th>Просмотр</th>
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
            <td>
              <my-button
                class="view__btn"
                @click="
                  fetchGroupIndicatorsByHistory(item.id);
                  toggleTableByStatus(item.report_status);
                  $router.push('/filled_tables');
                "
              >
                Просмотреть отчет
              </my-button>
            </td>
            <td class="button__td">
              <a href="#" @click="downloadHistoryFile(item.id)">Скачать</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      fetchGroupIndicatorsByHistory: "fetchGroupIndicatorsByHistory",
    }),
    toggleTableByStatus(status) {
      if (status === "Черновик") {
        this.$store.commit("setIsChangable", true);
      } else {
        this.$store.commit("setIsChangable", false);
      }
    },
    async downloadHistoryFile(id) {
      try {
        const response = await axios.post(
          this.$store.state.urlDownloadFromHistory,
          { output_id: id },
          {
            responseType: "blob",
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        );
        console.log(response);
        const contentDisposition = response.headers["content-disposition"];
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        let serverFilename =
          matches && matches[1]
            ? matches[1].replace(/['"]/g, "")
            : "template.xlsx";
        serverFilename = decodeURIComponent(serverFilename);
        const transformedStr = serverFilename.replace(/^utf-\d+-\d+_/, "");
        serverFilename = transformedStr.replace(/_/g, " ");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", serverFilename);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        alert("Ошибка при скачивании");
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
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
  width: 10%;
  font-size: 10px;
  font-weight: 600;
}
.view__btn {
  width: 90%;
  height: 34px;
  background-color: #36c0ef;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-weight: 400;
  padding: 2px;
}
</style>
