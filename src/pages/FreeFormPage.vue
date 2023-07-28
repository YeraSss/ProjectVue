<template>
  <div class="free__form__page">
    <Title />
    <FreeForm />
  </div>
</template>

<script>
import FreeForm from "@/components/FreeForm/FreeForm.vue";
import Title from "@/components/InfoTitle/Title.vue";
export default {
  components: {
    FreeForm,
    Title,
  },
};
</script>

<style scoped>
.free__form__page {
    padding: 1%;
}
</style>
