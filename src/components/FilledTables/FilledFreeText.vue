<template>
  <div class="filled__freetext">
    <h2>Просмотр отчета:</h2>
    <ul class="filled__table">
      <div class="short__name">
        <!--<h4>{{ $store.state.groupIndicators[0].short_name }}</h4> -->
        <br>
      </div>
      <div v-if="inputText !== null">
        <li>
        <textarea class="text__area" name="freetext" id="freetext" cols="100" rows="15" v-model="inputText"></textarea>
      </li>
      </div>
      <div v-else>
        <ins>Файл отчета - {{this.inputValues["filename"]}}</ins>
        <my-button @click="downloadFilledFile">Скачать файл</my-button>
      </div>
      <br>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      openTables: [],
      groupIndicatorsArray: [],
      inputValues: {},
      inputText: null,
    };
  },
  created() {
    this.getInitialData();
  },
  methods: {
    async downloadFilledFile() {
      const response = await axios.get(
          this.$store.state.urlFreeFormFile,{
            params: {
              file_id: this.inputValues["file_id"],
              filename: this.inputValues["filename"] 
            },
            responseType: "blob",
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", this.inputValues["filename"]);
      document.body.appendChild(link);
      link.click();
    },
    async getInitialData() {
      const values = await axios.get(this.$store.state.urlReportsIdcValues, {
        params: {output_id: this.$store.state.outputReportId},
        headers: {
          Authorization: this.$store.state.token,
        }
      })
      this.inputValues = JSON.parse(values["data"][0]["indicator_value"])
      this.inputText = values["data"][0]["indicator_text"]
    },
  },
};
</script>

<style scoped>
.filled__freetext {
  padding-left: 2%;
  padding-top: 1%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.text__area {
  padding: 2%;
  background-color: #d4eaf3;
  border-color: rgb(103, 103, 206);
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
