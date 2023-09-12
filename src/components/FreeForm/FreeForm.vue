<template>
  <div class="free__form" v-if="$store.state.groupIndicators.length">
    <div class="content">
      <ul>
        <div class="content__title">
          <div class="short__name">
            <h4>Введите текст или загрузите файл</h4>
            <br>
          </div>
        </div>
        <div class="file-wrapper">
            <button @click="openFilePicker" :disabled="text!==''">Выбрать файл</button>
            <div v-if="selectedFile">{{ selectedFile.name }}</div>
            <my-button @click="uploadFile" :disabled="text!==''"> Отправить файл </my-button>
      </div>
      <div>
        <br>
      </div>
        <li>
          <textarea
            v-model="text"
            name="freetext"
            id="freetext"
            cols="100"
            rows="15">
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

            <div class="submit__btns" v-if="text!==''">
              <my-button @click="uploadText">Сохранить текст</my-button>
            </div>
            <div v-else class="">
              <br>
              <my-button style="background-color: #b3b3b3; opacity: 20%;" @click="uploadText" disabled>Сохранить текст</my-button>
            </div>
          </div>
        </li>
      </ul>
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
      fetchReportsOutList: "fetchReportsOutList",
    }),
    setIndicatorId(){
      this.fetchIndicators(this.$store.state.groupIndicators[0].id);
    },
    openFilePicker() {
      this.$refs.fileInput.$el.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('output_id', this.$store.state.outputReportId);
      formData.append('indicator_id', this.$store.state.indicators[0].id);
      await axios
        .post(this.$store.state.urlFreeFormFile, formData, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(() => {
          alert("Файл успешно загружен!");
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/reports_history");
    },
    async uploadText() {
      const dataToPost = [
        {
          id: this.$store.state.indicators[0].id,
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
        .then(() => {
          alert("Текст успешно загружен!");
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/reports_history");
    },
  async deleteOutput(){
    if(this.text || this.selectedFile){
      return "ok"
    }else{
    await axios.delete(
      this.$store.state.urlOutList,{
        headers: {
          Authorization: this.$store.state.token,
        },
        data: {
          output_id: this.$store.state.outputReportId
        }
      },
    ).then((response) => {
      console.log(response.data.msg)
    }).catch((error) => {
      console.log(error)
    })}
  },
  },
  created() {
    this.setIndicatorId()
  },
  beforeUnmount(){
    this.deleteOutput()
  }
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
.submit__hid {
  display: flex;
  column-gap: 20px;
  padding-top: 2%;
  color: beige;
  background-color: beige;
}
.my__input {
  border: none;
  display: none;
}
</style>
