<template>
  <div class="treeview">
    <TreeItem
      v-for="item in $store.state.docCategories"
      :key="item.id"
      :item="item"
      :type="'documentTab'"
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