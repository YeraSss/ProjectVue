<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  padding: 5px 10px;
  background: none;
  border: 1px solid teal;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
}
.btn:hover {
  background: teal;
  color: #ffffff;
}
</style>
