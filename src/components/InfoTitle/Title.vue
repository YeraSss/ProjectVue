<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Информация по среднемесячной заработной плате работников",
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 2%;
}
</style>
