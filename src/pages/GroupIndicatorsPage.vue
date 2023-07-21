<template>
  <div class="group__indicators__page">
    <GroupIndicators />
  </div>
</template>

<script>
import GroupIndicators from "@/components/GroupIndicators/GroupIndicators.vue";
export default {
  components: {
    GroupIndicators,
  },
};
</script>

<style scoped>
.group__indicators__page {
  padding: 1%;
}
</style>
