<template>
  <div class="app">
    <Header />
    <div class="main__content">
      <NavBar
        @showMain="showMainBySearch"
        @showMainPage="showMainPage = true"
      />
      <MainPage v-if="showMainPage" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "@/components/Header.vue";
import NavBar from "@/components/NavBar.vue";
import MainPage from "@/components/MainPage.vue";
export default {
  data() {
    return {
      showMainPage: false,
    };
  },
  components: {
    Header,
    NavBar,
    MainPage,
  },
  methods: {
    ...mapActions({
      fetchReports: "fetchReports",
      fetchCategories: "fetchCategories",
      fetchReportsHistory: "fetchReportsHistory",
      fetchReportsOutList: "fetchReportsOutList",
    }),
    showMainBySearch(id) {
      this.showMainPage = true;
      this.fetchReportsOutList(id);
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchReports();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
html,
body {
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.main__content {
  width: 100%;
  min-height: 100%;
  max-height: max-content;
  display: flex;
}
</style>
