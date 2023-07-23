<template>
  <div class="navbar">
    <Search @showMain="showMainBySearch" />
    <Categories @showMainPage="showMain" />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Categories from "@/components/Categories.vue";
export default {
  components: {
    Search,
    Categories,
  },
  data() {
    return {};
  },
  methods: {
    showMain() {
      this.$emit("showMainPage");
    },
    showMainBySearch(id) {
      this.$emit("showMain", id);
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #127cc1;
  color: #ffffff;
  width: 20%;
  padding-top: 1%;
  padding-right: 0.5%;
  padding-left: 0.5%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
