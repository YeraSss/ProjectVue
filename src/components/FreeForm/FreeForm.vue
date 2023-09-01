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
          <textarea
            v-model="text"
            name="freetext"
            id="freetext"
            cols="100"
            rows="15"
          >
          </textarea>
        </li>
        <li class="file-wrapper">
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
          <div class="submit__file">
            <my-button @click="uploadFile"> Отправить файл </my-button>
          </div>
        </li>
      </ul>
      <div class="submit__btns">
        <my-button>Отправить</my-button>
        <my-button @click="uploadText">Сохранить</my-button>
        <my-button>Отмена</my-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      text: "",
      selectedFile: null,
    };
  },
  methods: {
    ...mapActions({
      fetchIndicators: "fetchIndicators",
    }),
    openFilePicker() {
      this.$refs.fileInput.$el.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append(this.selectedFile.name, this.selectedFile);
      await axios
        .post(this.$store.state.urlFreeFormFile, formData, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async uploadText() {
      this.fetchIndicators(this.$store.state.groupIndicators[0].id);
      const dataToPost = [
        {
          id: this.$store.state.indicators[1].id,
          indicator_text: this.text,
        },
      ];
      await axios
        .post(
          this.$store.state.urlToPatchData,
          {
            create: dataToPost,
            output_report: {
              status: "Черновик",
              output_id: this.$store.state.outputReportId,
            },
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
.file-wrapper {
  display: flex;
  column-gap: 10px;
}
.submit__file button {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 0;
}
.submit__file button:hover {
  background: teal;
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
