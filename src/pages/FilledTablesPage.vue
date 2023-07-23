<template>
  <div class="filled__tables">
    <ChangeableIndicators v-if="$store.state.isChangable" />
    <UnchangeableIndicators v-else />
  </div>
</template>

<script>
import ChangeableIndicators from "@/components/FilledTables/ChangeableIndicators.vue";
import UnchangeableIndicators from "@/components/FilledTables/UnchangeableIndicators.vue";
export default {
  components: {
    ChangeableIndicators,
    UnchangeableIndicators,
  },
};
</script>

<style scoped>
.filled__tables {
  padding: 1%;
}
</style>
