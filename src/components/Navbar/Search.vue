<template>
  <div class="search">
    <my-input
      v-model="searchTerm"
      class="search__input"
      placeholder="Поиск..."
    />
    <ul v-if="filteredItems.length && searchTerm" class="dropdown">
      <li
        v-for="item in filteredItems"
        :key="item.id"
        @click="selectItem(item.short_name)"
      >
        {{ item.short_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    filteredItems() {
      return [
        ...this.$store.state.categories,
        ...this.$store.state.subCategories,
        ...this.$store.state.reports,
      ].filter((item) =>
        item.short_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions({
      fetchReportsOutList: "fetchReportsOutList",
      fetchGroupIndicators: "fetchGroupIndicators",
    }),
    selectItem(item) {
      this.searchTerm = item;
      let foundObj = null;
      foundObj = this.$store.state.categories.find(
        (obj) => obj.short_name === item
      );
      if (foundObj) {
        this.$store.commit("setClickedKey", foundObj);
      } else {
        foundObj = this.$store.state.subCategories.find(
          (obj) => obj.short_name === item
        );
        if (foundObj) {
          this.$store.commit("setClickedKey", foundObj);
        } else {
          foundObj = this.$store.state.reports.find(
            (obj) => obj.short_name === item
          );
          this.$store.commit("setClickedKey", foundObj);
        }
      }
      if (foundObj.category_report) {
        this.fetchReportsOutList(foundObj.id);
        this.fetchGroupIndicators(foundObj.id);
        this.$router.push("reports_history");
        this.$store.commit("setBreadCrumbs", foundObj);
      }
    },
  },
};
</script>

<style scoped>
.search__input {
  width: 100%;
  outline: none;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 12px;
}
.dropdown {
  width: 100%;
  position: relative;
  top: 3px;
  list-style-type: none;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
}
.dropdown li {
  padding: 5px;
  cursor: pointer;
  color: #000000;
  font-size: 12px;
}
.dropdown li:hover {
  background-color: rgba(0, 158, 227, 0.15);
}
</style>
