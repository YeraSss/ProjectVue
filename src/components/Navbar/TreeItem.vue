<template>
  <div class="tree-item" :class="{ active: isOpen }">
    <div class="parent" @click.stop="handleItemClick">
      <div class="parent__short__name">{{ item.short_name }}</div>
      <span class="arrow" :class="{ 'arrow-down': isOpen }"></span>
    </div>
    <ul class="tree-list" v-if="item.children && isOpen">
      <TreeItem v-for="child in children" :key="child.id" :item="child" />
    </ul>
    <ul class="tree-list" v-else-if="!item.children && isOpen">
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
    type: {
      String,
    }
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
      fetchDocumentsList: "fetchDocumentsList",
    }),
    async handleItemClick() {
    if (this.item.children) {
      await this.fetchSubCategories(this.item.id);
      this.children = [...this.$store.state.subCategories];
      this.isOpen = !this.isOpen;
    } else {
      if (this.type === 'report')
      {
      await this.fetchReports(this.item.id);
      this.children = [...this.$store.state.reports];
      }
      else {
      await this.fetchDocumentsList(this.item.id);
      this.children = [...this.$store.state.documentsList];
      }
     
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
  padding-left: 2%;
}

.tree-report {
  margin-left: 2%;
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
  display: flex;
  align-items: center;
}
.parent:hover {
  background: rgba(0, 158, 227, 0.15);
  color: black;
}
.arrow {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 8px;
  border: solid #000000;
  border-width: 0 1px 1px 0;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
}
.arrow-down {
  transform: rotate(45deg);
}
.parent__short__name {
  width: 98%;
}
</style>