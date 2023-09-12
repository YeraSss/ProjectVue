<template>
    <div class="filled__tables">
      <Title />
      <ChangeableDocIndicators v-if="$store.state.isChangable" />
      <UnchangeableDocIndicators v-else />
    </div>
  </template>
  
  <script>
  import ChangeableDocIndicators from "@/components/FilledTables/ChangeableDocIndicators.vue";
  import UnchangeableDocIndicators from "@/components/FilledTables/UnchangeableDocIndicators.vue";
  import Title from "@/components/InfoTitle/Title.vue";
  export default {
    components: {
      ChangeableDocIndicators,
      UnchangeableDocIndicators,
      Title,
    },
  };
  </script>
  
  <style scoped>
  .filled__tables {
    padding: 1%;
  }
  </style>
  