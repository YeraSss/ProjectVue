<template>
  <div class="group__indicators" v-if="$store.state.groupIndicators.length">
    <div class="btns">
      <label for="file-upload" class="custom-file-upload">
        <i class="fas fa-cloud-upload-alt"></i>Загрузить файл
      </label>
      <input
        ref="fileInput"
        @change="handleFileChange"
        type="file"
        id="file-upload"
        style="display: none"
      />
      <div v-if="showSuccessMessage" class="success__message">
        Файл успешно загружен!
      </div>
      <my-button
        class="download__btn"
        @click="downloadFile($store.state.currentReportId)"
      >
        Скачать шаблон
      </my-button>
    </div>
    <div
      v-for="group_indicator in $store.state.groupIndicators"
      :key="group_indicator.id"
      class="gp__item"
    >
      <ul>
        <div class="gp__title" @click="toggleTable(group_indicator.id)">
          <div class="short__name">
            {{ group_indicator.short_name }}
          </div>
          <span
            class="arrow"
            :class="{
              'arrow-down': isTableVisible(group_indicator.id),
            }"
          >
          </span>
        </div>
        <li
          v-for="indicator in getObjectDataById(
            group_indicator.id,
            groupIndicatorsArray
          )"
          :key="indicator.id"
        >
          <div
            class="indicators__items"
            v-if="isTableVisible(group_indicator.id)"
          >
            <div class="indicator__name">{{ indicator.short_name }}</div>
            <my-input
              class="my__inputs"
              v-if="indicator.type_value !== 'list'"
              :inputType="indicator.type_value"
              :value="getInputValue(indicator.id)"
              @input="updateInputValue(indicator.id, $event.target.value)"
            />
            <my-select :options="indicator.parameters" v-else></my-select>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit__btns">
      <my-button @click="sentData" class="submit__btn">Отправить</my-button>
      <my-button @click="saveData" class="save__btn">Сохранить</my-button>
      <my-button class="cancel__btn" @click="cancellAll">Отмена</my-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      openTables: [],
      groupIndicatorsArray: [],
      inputValues: {},
      selectedFile: null,
      showSuccessMessage: false,
    };
  },
  created() {
    this.getInitialData();
  },
  watch: {
    $store: {
      handler: "getInitialData",
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      fetchIndicators: "fetchIndicators",
      fetchReportsOutList: "fetchReportsOutList",
    }),
    cancellAll() {
      this.$router.push("/reports_history");
      this.clearAll();
    },
    async downloadFile(id) {
      try {
        const response = await axios.get(this.$store.state.urlDownloadFile, {
          params: { report_id: id },
          responseType: "blob",
          headers: {
            Authorization: this.$store.state.token,
          },
        });
        const contentDisposition = response.headers["content-disposition"];
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        let serverFilename =
          matches && matches[1]
            ? matches[1].replace(/['"]/g, "")
            : "template.xlsx";
        serverFilename = decodeURIComponent(serverFilename);
        const transformedStr = serverFilename.replace(/^utf-\d+-\d+_/, "");
        serverFilename = transformedStr.replace(/_/g, " ");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", serverFilename);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        alert("Не удалось выполнить скачивание файла.");
        console.error(error);
      }
    },

    clearAll() {
      this.$store.commit("setResponseFromUploadFile", []);
      this.inputValues = {};
    },
    getInitialData() {
      this.$store.state.responseFromUploadFile.forEach((item) => {
        this.inputValues[item.id] = item.indicator_value;
      });
    },
    handleFileChange() {
      this.selectedFile = this.$refs.fileInput.files[0];
      this.uploadFile(this.$store.state.currentReportId);
    },
    async uploadFile(id) {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("report_id", id);
      try {
        const response = await axios.post(
          this.$store.state.urlUploadFile,
          formData,
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        );
        this.$store.commit(
          "setResponseFromUploadFile",
          response.data.indicators
        );
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 1000);
      } catch (e) {
        alert("Ошибка с загрузкой файла");
      }
    },
    addObj(array, newObject) {
      const index = array.findIndex((obj) => obj.id === newObject.id);
      if (index !== -1) {
        array.splice(index, 1, newObject);
      } else {
        array.push(newObject);
      }
    },
    toggleTable(groupId) {
      const index = this.openTables.indexOf(groupId);
      if (index !== -1) {
        this.openTables.splice(index, 1);
      } else {
        this.fetchIndicators(groupId).then(() => {
          const obj = {
            id: groupId,
            data: this.$store.state.indicators,
          };
          this.addObj(this.groupIndicatorsArray, obj);
          this.openTables.push(groupId);
        });
      }
    },
    isTableVisible(groupId) {
      return this.openTables.includes(groupId);
    },
    getInputValue(indicatorId) {
      return this.inputValues[indicatorId] || "";
    },
    async saveData() {
      const dataToPost = Object.entries(this.inputValues).map(
        ([id, inputValue]) => ({
          indicator_value: inputValue,
          id: id,
        })
      );
      await axios
        .post(
          this.$store.state.urlSaveData,
          {
            create: dataToPost,
            output_report: {
              report_status: "Черновик",
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
          response;
        })
        .catch((error) => {
          console.log(error);
        });
      this.fetchReportsOutList(this.$store.state.currentReportId);
      this.$router.push("/reports_history");
      this.clearAll();
    },
    async sentData() {
      const dataToPost = Object.entries(this.inputValues).map(
        ([id, inputValue]) => ({
          indicator_value: inputValue,
          id: id,
        })
      );
      await axios
        .post(
          this.$store.state.urlSaveData,
          {
            create: dataToPost,
            output_report: {
              report_status: "На согласовании",
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
          response;
        })
        .catch((error) => {
          console.log(error);
        });
      this.fetchReportsOutList(this.$store.state.currentReportId);
      this.$router.push("/reports_history");
      this.clearAll();
    },
    updateInputValue(indicatorId, value) {
      this.inputValues[indicatorId] = value;
    },
  },
  computed: {
    getObjectDataById() {
      return (id, array) => {
        const foundObject = array.find((obj) => obj.id === id);
        return foundObject ? foundObject.data : [];
      };
    },
  },
};
</script>

<style scoped>
.indicator__name {
  font-size: 14px;
}
.group__indicators {
  width: 99%;
  display: flex;
  flex-direction: column;
}
.gp__item {
  font-size: 18px;
  font-weight: 600;
}
ul,
li {
  padding: 0;
  list-style-type: none;
}

li {
  font-weight: 400;
  font-size: 21px;
  margin-bottom: 1%;
  margin-top: 1%;
  cursor: default;
}
.my__inputs {
  border: 1px solid #000000;
}
.indicators__items {
  max-width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3%;
  padding: 0 5px;
  padding-bottom: 8px;
  border-bottom: 1px solid black;
}
.indicators__items input {
  height: 36px;
  max-width: 20%;
}
.gp__title {
  width: 90%;
  padding: 10px 5px;
  display: flex;
  align-items: center;
}
.gp__title:hover {
  cursor: pointer;
  background-color: #bbd7ea;
}
.submit__btns {
  display: flex;
  column-gap: 20px;
  padding-top: 2%;
  padding-bottom: 2%;
}
.submit__btns button {
  width: 106px;
  height: 36px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10.5px;
  font-weight: 500;
  border: none;
}
.submit__btn {
  background-color: #337b53;
  color: #ffffff;
}
.save__btn {
  background-color: #36c0ef;
  color: #ffffff;
}
.cancel__btn {
  background: none;
  color: #000000;
  border: 1px solid #cdcddf !important;
}
.btns {
  margin-bottom: 2%;
  display: flex;
  align-items: center;
  column-gap: 2%;
}
.download__btn {
  background: #ecf4f9;
  border: 1px solid #cdcddf;
  padding: 10px 20px;
}
.custom-file-upload {
  display: inline-block;
  background-color: #4caf50;
  color: #ffffff;
  border: 1px solid #4caf50;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 12px;
}

.custom-file-upload:hover {
  background-color: #45a049;
}
.custom-file-upload:hover {
  background: teal;
}

.custom-file-upload i {
  margin-right: 5px;
}
.success__message {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  border-radius: 5px;
  animation: fadeOut 1s ease-in-out;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.arrow {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 8px;
  border: solid #000000;
  border-width: 0 1px 1px 0;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
}
.arrow-down {
  transform: rotate(45deg);
}
.short__name {
  width: 99.5%;
  font-size: 16px;
}
</style>
