<template>
  <div class="treeview">
    <TreeItem
      v-for="item in $store.state.categories"
      :key="item.id"
      :item="item"
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