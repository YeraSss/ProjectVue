<template>
  <div class="form__page">
    <Form />
  </div>
</template>

<script>
import Form from "@/components/Form/Form.vue";
export default {
  components: {
    Form,
  },
};
</script>

<style scoped>
.form__page {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 158, 227, 0.15);
  padding: 1%;
}
</style>
