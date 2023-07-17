<template>
  <form class="form" @submit.prevent="submitForm">
    <SearchParams @showGrInd="showGroupInd = true" />
    <GroupIndicators v-if="showGroupInd" @close="closeAll" />
  </form>
</template>

<script>
import GroupIndicators from "@/components/GroupIndicators.vue";
import SearchParams from "@/components/SearchParams.vue";
export default {
  data() {
    return {
      showGroupInd: false,
    };
  },
  methods: {
    closeAll() {
      this.showGroupInd = false;
      this.$emit("close");
    },
    submitForm() {
      console.log("Form sent");
    },
  },
  components: {
    GroupIndicators,
    SearchParams,
  },
};
</script>

<style scoped>
.form {
  background-color: rgba(0, 158, 227, 0.15);
  padding-left: 1%;
  padding-top: 1%;
}
</style>
