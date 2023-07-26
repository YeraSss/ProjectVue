<template>
  <div class="filled__tables">
    <Title />
    <ChangeableIndicators v-if="$store.state.isChangable" />
    <UnchangeableIndicators v-else />
  </div>
</template>

<script>
import ChangeableIndicators from "@/components/FilledTables/ChangeableIndicators.vue";
import UnchangeableIndicators from "@/components/FilledTables/UnchangeableIndicators.vue";
import Title from "@/components/InfoTitle/Title.vue";
export default {
  components: {
    ChangeableIndicators,
    UnchangeableIndicators,
    Title,
  },
};
</script>

<style scoped>
.filled__tables {
  padding: 1%;
}
</style>
