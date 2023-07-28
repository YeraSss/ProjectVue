<template>
  <div class="free__form" v-if="$store.state.groupIndicators.length">
    <div class="content">
      <ul>
        <div class="content__title">
          <div class="short__name">
            {{ $store.state.groupIndicators[0].short_name }}
          </div>
        </div>
        <li>
          <textarea v-model="text" name="freetext" id="freetext" cols="100" rows="15">
          </textarea>
        </li>
        <li>
          <div class="input-wrapper">
            <my-input
              class="my__input"
              inputType="file"
              @change="handleFileChange"
              ref="fileInput"
            ></my-input>
            <button @click="openFilePicker">Выбрать файл</button>
            <div v-if="selectedFile">{{ selectedFile.name }}</div>
          </div>
        </li>
      </ul>
      <div class="submit__btns">
        <my-button>Отправить</my-button>
        <my-button>Сохранить</my-button>
        <my-button>Отмена</my-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      selectedFile: null,
    };
  },
  methods: {
    openFilePicker() {
      this.$refs.fileInput.$el.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
    },
  },
};
</script>

<style scoped>
.free__form {
  padding-left: 1%;
  padding-top: 1%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.input-wrapper input[type="file"] {
  position: absolute;
  left: -9999px;
}
.input-wrapper button {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}
.input-wrapper button:hover {
  background: teal;
}
.content {
  width: 90%;
  height: 300px;
}
.content__title {
  display: flex;
  justify-content: space-between;
}
#freetext {
  padding: 0;
  outline: none;
}
ul,
li {
  list-style: none;
}
.submit__btns {
  display: flex;
  column-gap: 20px;
  padding-top: 2%;
}
.my__input {
  border: none;
  display: none;
}
</style>
