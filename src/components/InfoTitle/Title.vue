<template>
  <h1>{{ this.$store.state.FullName}}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "this.$store.state.fullName",
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
