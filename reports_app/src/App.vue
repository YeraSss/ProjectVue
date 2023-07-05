<template>
  <v-card>
    <v-layout>
      <div class="app">
        <Header
          :options="arrayForSearch"
          @logedIn="isLogedIn = true"
          @getRegisterData="registerUser"
          @logedOut="
            isLogedIn = false;
            showTables = false;
          "
        />
        <NavBar
          v-if="isLogedIn"
          :reports="reports"
          :group-pokazateli="groupPokazateli"
          @reportId="reportId"
          @getGroupId="getGroupId"
        />
      </div>
      <main v-if="showTables && isLogedIn">
        <Table
          @indicatorChanges="indicatorChangesFn"
          :reportArray="pokazateli"
          :group-indicator="groupIndicator"
          @showFinishedTable="openFinishedTable"
        />
        <FinishedTable
          v-if="showFinishedTable && showTables"
          :tableData="tableData"
        />
      </main>
    </v-layout>
  </v-card>
</template>

<script>
import Header from "@/components/Header.vue";
import NavBar from "@/components/NavBar.vue";
import Table from "@/components/Table.vue";
import FinishedTable from "@/components/FinishedTable.vue";
import axios from "axios";

export default {
  components: {
    Header,
    NavBar,
    Table,
    FinishedTable,
  },
  data() {
    return {
      urlReports: "http://127.0.0.1:8000/api/reports-list/",
      urlGroupReports: "http://127.0.0.1:8000/api/reports-gp-list/?report=",
      urlIndicators: "http://127.0.0.1:8000/api/reports-idc-list/?group=",
      urlRegistration: "http://127.0.0.1:8000/api/register/",
      token: "8dd87cdc61a0f3dc391848de9712409f0465e800",
      reports: [],
      groupPokazateli: [],
      pokazateli: [],
      indicatorChanges: [],
      groupId: null,
      groupPokazatelId: null,
      tableData: [],
      showTables: false,
      showFinishedTable: false,
      registerForm: {},
      isLogedIn: false,
      groupIndicator: "",
      arrayForSearch: [],
    };
  },
  methods: {
    reportId(id) {
      this.groupId = id;
    },
    getGroupId(id, title) {
      this.groupPokazatelId = id;
      this.groupIndicator = title;
      this.showTables = true;
      this.showFinishedTable = false;
    },
    async fetchingReports() {
      try {
        const response = await axios.get(this.urlReports, {
          headers: {
            Authorization: "Token 8dd87cdc61a0f3dc391848de9712409f0465e800",
          },
        });
        this.reports = response.data.results;
        this.reports.forEach((item) =>
          this.arrayForSearch.push(item.report_title)
        );
      } catch (e) {
        alert("Error");
      }
    },
    async fetchingGroupReports() {
      try {
        if (this.groupId === null) {
          this.groupPokazateli = [];
        } else {
          const url = `${this.urlGroupReports + this.groupId}`;
          const groupReports = await axios.get(url, {
            headers: {
              Authorization: "Token 8dd87cdc61a0f3dc391848de9712409f0465e800",
            },
          });
          this.groupPokazateli = groupReports.data.results;
          this.groupPokazateli.forEach((item) =>
            this.arrayForSearch.push(item.group_title)
          );
        }
      } catch (e) {
        alert("groupReports error");
      }
    },
    async fetchingIndicators() {
      try {
        if (this.groupPokazatelId === null) {
          this.pokazateli = [];
        } else {
          const url = `${this.urlIndicators + this.groupPokazatelId}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: "Token 8dd87cdc61a0f3dc391848de9712409f0465e800",
            },
          });
          this.pokazateli = response.data.results;
        }
      } catch (e) {
        alert("Indicator error");
      }
    },
    async patchIndicators() {
      try {
        await axios.patch(
          "http://127.0.0.1:8000/api/reports-idc-list/",
          {
            update: this.indicatorChanges,
          },
          {
            headers: {
              Authorization: "Token 8dd87cdc61a0f3dc391848de9712409f0465e800",
            },
          }
        );
      } catch (e) {
        alert("patching error");
      }
    },
    async fetchChangedIndicators() {
      try {
        const url = `${this.urlIndicators + this.groupPokazatelId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: "Token 8dd87cdc61a0f3dc391848de9712409f0465e800",
          },
        });
        this.tableData = response.data.results;
      } catch (e) {
        alert("error");
      }
    },
    async indicatorChangesFn(array) {
      this.indicatorChanges = array;
      await this.patchIndicators();
      this.fetchChangedIndicators();
      this.showFinishedTable = true;
    },
    async registerUser(registrationData) {
      try {
        await axios.post(this.urlRegistration, registrationData);
        console.log(registrationData);
      } catch (e) {
        alert("Не удалось зарегестрироваться");
        console.log(registrationData);
      }
    },
    openFinishedTable() {
      this.fetchChangedIndicators();
      this.showFinishedTable = true;
    },
  },
  mounted() {
    this.fetchingReports();
  },
  watch: {
    groupId(newGroupId) {
      this.fetchingGroupReports();
    },
    groupPokazatelId(newGroupPokazatelId) {
      this.fetchingIndicators();
    },
  },
};
</script>
<style>
main {
  margin-top: 5%;
  margin-left: 17%;
  padding-top: 3%;
  padding-bottom: 5%;
  padding-right: 3%;
}
</style>
