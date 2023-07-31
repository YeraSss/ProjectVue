<template>
  <div class="categories">
    <div
      class="category"
      :class="{ active: category.showSubCategory }"
      v-for="category in $store.state.categories"
      :key="category.id"
    >
      <span
        class="short__name"
        @click="
          toggleSubCategory(category);
          showSubCategory(category);
        "
        >{{ category.short_name }}</span
      >
      <div class="sub__category" v-show="category.showSubCategory">
        <div
          class="sub__category__shortName"
          v-for="subCategory in categorySubCategories(category.id)"
          :key="subCategory.id"
        >
          <span
            @click="
              toggleReports(subCategory);
              showReport(subCategory);
            "
            >{{ subCategory.short_name }}</span
          >
          <div v-show="subCategory.showReports">
            <div
              class="report__short__name"
              v-for="report in subCategoryReports(subCategory.id)"
              :key="report.id"
            >
              <span>{{ report.short_name }}</span>
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
  data() {
    return {
      subCategories: [],
      reports: [],
    };
  },
  methods: {
    ...mapActions({
      fetchSubCategories: "fetchSubCategories",
      fetchReports: "fetchReports",
    }),
    async toggleSubCategory(category) {
      await this.fetchSubCategories(category.id);
      if (this.subCategories.length) {
        for (let i = 0; i < this.subCategories.length; i++) {
          if (
            this.subCategories[i].id === this.$store.state.subCategories[0].id
          ) {
            return;
          }
        }
        this.subCategories.push(...this.$store.state.subCategories);
      } else {
        this.subCategories = [...this.$store.state.subCategories];
      }
    },
    showSubCategory(category) {
      this.$store.commit("setShowSubCategory", category);
    },
    async toggleReports(subCategory) {
      await this.fetchReports(subCategory.id);
      if (this.reports.length) {
        for (let i = 0; i < this.reports.length; i++) {
          if (this.reports[i] === this.$store.state.reports[0].id) {
            return;
          }
        }
        this.reports.push(...this.$store.state.reports);
      } else {
        this.reports = [...this.$store.state.reports];
      }
    },
    showReport(subCategory) {
      this.$store.commit("setShowReports", subCategory);
      console.log(this.reports);
    },
  },
  computed: {
    categorySubCategories() {
      return (categoryId) => {
        return this.subCategories.filter(
          (subCategory) => subCategory.parent === categoryId
        );
      };
    },
    subCategoryReports() {
      return (subCategoryId) => {
        return this.reports.filter((report) => {
          report.category_report === subCategoryId;
        });
      };
    },
  },
};
</script>

<style scoped>
.categories {
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
  font-size: 14px;
}
.category {
  padding: 1%;
}
.category:hover {
  background: white;
  color: black;
  cursor: pointer;
}
span {
  display: block;
}
.short__name {
  width: 93%;
}
.active {
  background: white;
  color: black;
}
.sub__category {
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  padding-top: 2%;
}
.sub__category__shortName:hover {
  background: rgba(0, 158, 227, 0.15);
}
.sub__category__shortName {
  padding: 2px;
}
</style>
