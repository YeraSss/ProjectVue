<template>
  <input
    class="input"
    :type="getInputType(inputType)"
    :value="modelValue"
    @input="updateInput"
  />
</template>

<script>
export default {
  name: "my-input",
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
  computed: {
    getInputType() {
      return (inputType) => {
        if (
          inputType === "float" ||
          inputType === "int" ||
          inputType === "number"
        ) {
          return "number";
        } else if (inputType === "str" || inputType === "text") {
          return "text";
        } else if (inputType === "bool" || inputType === "radio") {
          return "radio";
        } else if (inputType === "date") {
          return "date";
        } else if (inputType === "password") {
          return "password";
        } else if (inputType === "file") {
          return "file";
        } else if (inputType === "email") {
          return "email";
        } else {
          return "text";
        }
      };
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid black;
  padding: 5px 10px;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
