<template>
  <div
    @click.stop="handleItemClick"
    class="tree-item"
    :class="{ active: isOpen }"
  >
    <div class="parent">{{ item.short_name }}</div>
    <ul class="tree-list" v-if="item.children && isOpen">
      <TreeItem v-for="child in children" :key="child.id" :item="child" />
    </ul>
    <ul class="tree-list" v-else-if="!item.children">
      <div
        v-for="report in children"
        :key="report.id"
        class="tree-report"
        :class="{ clicked: report.clicked }"
        @click.stop="getMainPage(report)"
      >
        {{ report.short_name }}
      </div>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      children: [],
    };
  },
  methods: {
    ...mapActions({
      fetchSubCategories: "fetchSubCategories",
      fetchReports: "fetchReports",
      fetchReportsOutList: "fetchReportsOutList",
      fetchGroupIndicators: "fetchGroupIndicators",
    }),
    async handleItemClick() {
      if (this.item.children) {
        await this.fetchSubCategories(this.item.id);
        this.children = [...this.$store.state.subCategories];
        this.isOpen = !this.isOpen;
      } else {
        await this.fetchReports(this.item.id);
        this.children = [...this.$store.state.reports];
        this.isOpen = !this.isOpen;
      }
    },
    getMainPage(report) {
      report.clicked = true;
      this.$store.commit("setCurrentReportId", report.id);
      this.$store.commit("setBreadCrumbs", report);
      this.fetchReportsOutList(report.id);
      this.fetchGroupIndicators(report.id);
      this.$router.push("/reports_history");
    },
  },
};
</script>

<style scoped>
.tree-item {
  margin-bottom: 2%;
  cursor: pointer;
  font-size: 14px;
}
.active {
  background: white;
  color: black;
}
.tree-item:hover {
  background: white;
  color: black;
}
.tree-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tree-report {
  margin-left: 5%;
  margin-bottom: 2%;
  margin-top: 2%;
  padding: 2%;
}
.tree-report:hover {
  background: rgba(0, 158, 227, 0.15);
  color: black;
}
.parent {
  width: 100%;
  height: 100%;
  padding: 1%;
}
.parent:hover {
  background: rgba(0, 158, 227, 0.15);
  color: black;
}
</style>
