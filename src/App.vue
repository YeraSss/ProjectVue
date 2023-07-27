<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("serUrls");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
</style>
