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
        <textarea name="freetext" id="freetext" cols="100" rows="15" v-model="inputText">re</textarea>
      </li>
      </div>
      <div v-else>
        <ins>Файл отчета - {{this.inputValues["filename"]}}</ins>
        <my-button @click="downloadFilledFile">Скачать файл - file</my-button>
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
      console.log(values)
      this.inputValues = JSON.parse(values["data"][0]["indicator_value"])
      this.inputText = values["data"][0]["indicator_text"]
      
      /* this.$store.state.reportsIdcValues.forEach((item) => { // urlReportsIdcValues
        this.inputValues = JSON.parse(item.indicator_value);
        console.log(item.indicator_value)
        this.inputText = item.indicator_text
      }); */
    },
  },
};
</script>

<style scoped></style>
