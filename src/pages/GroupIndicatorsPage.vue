<template>
  <div class="group__indicators__page">
    <Title />
    <GroupIndicators />
  </div>
</template>

<script>
import GroupIndicators from "@/components/GroupIndicators/GroupIndicators.vue";
import Title from "@/components/InfoTitle/Title.vue";
export default {
  components: {
    GroupIndicators,
    Title,
  },
};
</script>

<style scoped>
.group__indicators__page {
  padding: 1%;
}
</style>
