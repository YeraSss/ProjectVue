<template>
  <div class="navbar">
    <Search />
    <Categories />
  </div>
</template>

<script>
import Search from "@/components/Navbar/Search.vue";
import Categories from "@/components/Navbar/Categories.vue";
export default {
  components: {
    Search,
    Categories,
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
