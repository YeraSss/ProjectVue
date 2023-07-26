<template>
  <div class="categories">
    <div
      class="gri__block"
      v-for="category in $store.state.categories"
      :key="category.id"
      :class="{ active: category.showSubCategory }"
    >
      <div class="gri category" @click="toggleSubCategory(category)">
        <span class="sc__name">{{ category.short_name }}</span>
        <span
          class="arrow"
          :class="{ 'arrow-down': category.showSubCategory }"
        ></span>
      </div>
      <div class="gri__subCategory" v-show="category.showSubCategory">
        <div
          v-for="subCategory in getSubCategories(category.id)"
          :key="subCategory.id"
        >
          <div class="gri sub__category" @click="toggleReports(subCategory)">
            <span class="sc__name">{{ subCategory.short_name }}</span>
            <span
              class="arrow"
              :class="{ 'arrow-down': subCategory.showReports }"
            ></span>
          </div>
          <div class="gri__report" v-show="subCategory.showReports">
            <div
              class="gri reports"
              v-for="report in getReports(subCategory.id)"
              :key="report.id"
              @click="
                toggleReport(report);
                fetchReportsOutList(report.id);
                $store.commit('setCurrentReportId', report.id);
                $store.commit('setBreadCrumb', {
                  label: report.short_name,
                  link: '/reports_history',
                });
                $router.push('reports_history');
              "
              :style="{
                backgroundColor: report.clicked
                  ? 'rgba(0, 158, 227, 0.3)'
                  : 'transparent',
              }"
            >
              {{ report.short_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      fetchGroupIndicators: "fetchGroupIndicators",
      fetchReportsOutList: "fetchReportsOutList",
    }),
    toggleSubCategory(category) {
      category.showSubCategory = !category.showSubCategory;
    },
    toggleReports(subCategory) {
      subCategory.showReports = !subCategory.showReports;
    },
    toggleReport(report) {
      this.$store.commit("setReportsClickToTrue", report);
      this.$store.commit("setReportsClickToFalse", report);
      this.fetchGroupIndicators(report.id);
    },
  },
  computed: {
    getSubCategories() {
      return (parentId) =>
        this.$store.state.subCategories.filter(
          (subCategory) => subCategory.parent === parentId
        );
    },
    getReports() {
      return (subCategoryId) =>
        this.$store.state.reports.filter(
          (report) => report.category_report === subCategoryId
        );
    },
  },
};
</script>

<style scoped>
span {
  display: block;
}
.sc__name {
  width: 92%;
}
.gri {
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  padding: 1%;
}
.gri:hover {
  background-color: #36c0ef;
  color: #000000;
}
.category {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.category:hover {
  background-color: #ffffff;
  color: black;
}
.sub__category {
  width: 98%;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 1%;
  padding: 1.2%;
}
.sub__category::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
}
.sub__category:hover {
  background-color: rgba(0, 158, 227, 0.15);
}
.reports {
  font-size: 14px;
  font-weight: 400;
  position: relative;
  margin-bottom: 1%;
  padding: 1%;
}
.reports::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
}
.reports:hover {
  background-color: rgba(0, 158, 227, 0.15);
}
.gri__subCategory {
  padding-left: 5%;
}
.gri__report {
  padding-left: 10%;
}
.gri__block.active {
  background-color: #edf5f9;
  color: #000000;
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
.gri__block {
  margin-bottom: 2%;
}
</style>
