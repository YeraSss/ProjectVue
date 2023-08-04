<template>
  <div class="group__indicators__page">
    <BreadCrumbs />
    <Title />
    <GroupIndicators />
  </div>
</template>

<script>
import GroupIndicators from "@/components/GroupIndicators/GroupIndicators.vue";
import Title from "@/components/InfoTitle/Title.vue";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs.vue";

export default {
  components: {
    GroupIndicators,
    Title,
    BreadCrumbs,
  },
};
</script>

<style scoped>
.group__indicators__page {
  padding: 1%;
}
</style>
