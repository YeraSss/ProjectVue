<template>
  <input
    class="input__for__dialog"
    :type="inputType"
    v-focus="focus"
    :placeholder="placeholder"
    v-model="inputValue"
    @blur="updateInput"
  />
</template>

<script>
export default {
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    focus: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    updateInput(event) {
      this.$emit("updateInput", event.target.value);
    },
  },
  computed: {
    typeOfInput() {
      if (
        this.inputType === "float" ||
        this.inputType === "int" ||
        this.inputType === "number"
      ) {
        return "number";
      } else if (this.inputType === "str" || this.inputType === "text") {
        return "text";
      } else if (this.inputType === "bool" || this.inputType === "radio") {
        return "radio";
      } else if (this.inputType === "date") {
        return "date";
      } else if (this.inputType === "password") {
        return "password";
      } else if (this.updateInput === "file") {
        return "file";
      } else if (this.inputType === "email") {
        return "email";
      } else {
        return "text";
      }
    },
  },
};
</script>

<style scoped>
.input__for__dialog {
  min-width: 300px;
  padding: 8px;
  display: block;
  color: #ffffff;
  border: none;
  border-bottom: 1px solid #ffffff;
}
.input__for__dialog:focus {
  outline: none;
}
.input__for__dialog::placeholder {
  color: #ffffff;
}
</style>
