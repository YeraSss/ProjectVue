<template>
  <div v-if="typeOfInput === 'radio'">
    <label>
      <input type="radio" v-model="inputValue" @blur="updateInput" value="да" />
      Да
    </label>
    <label>
      <input
        class="radio__no"
        type="radio"
        v-model="inputValue"
        value="нет"
        @blur="updateInput"
        v-focus="focus"
      />
      Нет
    </label>
  </div>
  <div v-else-if="inputType === 'file'" class="file-input">
    <label class="custom-label" :for="inputId">{{ buttonText }}</label>
    <input
      :id="inputId"
      type="text"
      @change="onFileChange"
      ref="fileInput"
      style="display: none"
    />
    <div class="file-name" v-if="selectedFileName">{{ selectedFileName }}</div>
  </div>
  <div v-else>
    <input
      v-focus="focus"
      class="input"
      :type="typeOfInput"
      :placeholder="placeholder"
      v-model="inputValue"
      @blur="updateInput"
    />
  </div>
</template>
<script>
export default {
  name: "my-input",
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    indicatorId: {
      type: Number,
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
      inputId: "custom-file-input",
      buttonText: "Экспорт Exсel",
      selectedFileName: "",
    };
  },
  methods: {
    updateInput() {
      this.$emit("updateInput", this.inputValue, this.indicatorId);
    },
    onFileChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.selectedFileName = files[0].name;
      } else {
        this.selectedFileName = "";
      }
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
.input {
  min-width: 300px;
  padding: 8px;
  display: block;
  color: black;
  border: 2px solid #417690;
  border-radius: 12px;
}

.radio__no {
  margin-left: 20px;
}
.file-input {
  position: relative;
  display: inline-block;
}

.custom-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #417690;
  color: #fff;
  cursor: pointer;
}

.custom-label:hover,
.custom-label:active {
  background-color: #417690;
}

input[type="file"]:focus + .custom-label {
  outline: 2px solid #417690;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.file-name {
  margin-top: 10px;
}
</style>
