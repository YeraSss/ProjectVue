<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled selected value="">Выберите из списка</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped></style>
