<template>
  <div>
    <TreeItem
      v-for="item in $store.state.categories"
      :key="item.id"
      :item="item"
      type="reportTab"
    />
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";
export default {
  components: {
    TreeItem,
  },
};
</script>

<style scoped>
</style>