<template>
  <div class="main">
    <Path />
    <Title />
    <div class="create">
      <button
        class="create__btn"
        :class="{ gray__background: clicked }"
        @click="toggleGroupInd"
      >
        Создать отчет
      </button>
    </div>
    <ReportsHistory @showGP="showGroupIndicatorsByTable" v-if="showHistory" />
    <Form v-if="showGroupInd" @close="toggleHistory" />
    <GroupIndicatorsByTable v-if="showGIbyTable" />
  </div>
</template>

<script>
import Path from "@/components/Path.vue";
import Title from "@/components/Title.vue";
import ReportsHistory from "@/components/ReportsHistory.vue";
import Form from "@/components/Form.vue";
import GroupIndicatorsByTable from "@/components/GroupIndicatorsByTable.vue";
export default {
  components: {
    Path,
    Title,
    ReportsHistory,
    Form,
    GroupIndicatorsByTable,
  },
  data() {
    return {
      showHistory: true,
      showGroupInd: false,
      clicked: false,
      showGIbyTable: false,
    };
  },
  methods: {
    toggleGroupInd() {
      this.showGroupInd = true;
      this.showHistory = false;
      this.clicked = true;
    },
    toggleHistory() {
      (this.showGroupInd = false), (this.showHistory = true);
      this.clicked = false;
    },
    showGroupIndicatorsByTable() {
      this.showHistory = false;
      this.showGroupInd = false;
      this.showGIbyTable = true;
    },
  },
};
</script>

<style scoped>
.main {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-top: 1%;
}
.create {
  padding-left: 1%;
}
.create__btn {
  background-color: #36c0ef;
  border: none;
  width: 117px;
  height: 36px;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 1%;
  font-size: 10.5px;
  font-weight: 500;
}
.gray__background {
  background: #afaead;
}
</style>
