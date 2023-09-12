<template>
    <div class="group__indicators__page">
      <BreadCrumbs />
      <Title />
      <GroupDocIndicators />
    </div>
  </template>
  
  <script>
  import GroupDocIndicators from "@/components/GroupIndicators/GroupDocIndicators.vue";
  import Title from "@/components/InfoTitle/Title.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs.vue";
  
  export default {
    components: {
      GroupDocIndicators,
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
  