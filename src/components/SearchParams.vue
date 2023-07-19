<template>
  <div>
    <div class="search__params">
      <div class="period select__block">
        <span>Период</span>
        <select v-model="selectedPeriod" @change="changeOption">
          <option disabled selected value="">Выберите из списка</option>
          <option v-for="item in periodArr" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="year select__block">
        <span>Год</span>
        <input type="number" v-model="selectedYear" placeholder="Введите год" />
      </div>
      <div class="quater select__block">
        <span>Квартал</span>
        <select :disabled="quaterDisabled" v-model="selectedQuarter">
          <option disabled selected value="">Выберите из списка</option>
          <option v-for="item in quaterArr" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="month select__block">
        <span>Месяц</span>
        <select :disabled="monthDisabled" v-model="selectedMonth">
          <option selected disabled value="">Выберите из списка</option>
          <option v-for="item in monthArr" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="apply__btn">
        <button @click="fetchOutputReportId">Применить</button>
      </div>
    </div>
    <div class="btns">
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="uploadFile($store.state.currentReportId)">
        Загрузить
      </button>

      <button
        class="download__btn"
        @click="fetchFile($store.state.currentReportId)"
      >
        Скачать шаблон
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      file: null,
      quaterDisabled: false,
      monthDisabled: false,
      periodArr: ["Годовой", "Ежеквартальный", "Ежемесячный"],
      quaterArr: ["I", "II", "III", "IV"],
      monthArr: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      selectedPeriod: "",
      selectedYear: "",
      selectedQuarter: "",
      selectedMonth: "",
    };
  },
  methods: {
    handleFileChange() {
      this.file = this.$refs.fileInput.files[0];
    },
    changeOption(event) {
      this.selectedPeriod = event.target.value;
      if (this.selectedPeriod === "Ежеквартальный") {
        this.quaterDisabled = false;
        this.monthDisabled = true;
      } else if (this.selectedPeriod === "Ежемесячный") {
        this.quaterDisabled = true;
        this.monthDisabled = false;
      } else if (this.selectedPeriod === "Годовой") {
        this.quaterDisabled = true;
        this.monthDisabled = true;
      }
    },
    async fetchFile(id) {
      await axios
        .get(
          "http://127.0.0.1:8000/api/reports-download/",
          { params: { report_id: id } },
          {
            responseType: "blob",
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "template.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((e) => {
          alert("Download Failed");
          console.log(e);
        });
    },
    fetchOutputReportId() {
      this.$emit("showGrInd");
      axios
        .post(
          "http://127.0.0.1:8000/api/reports-out-list/",
          {
            report_period: this.selectedPeriod,
            report_year: this.selectedYear,
            report_quarter: this.selectedQuarter || null,
            report_month: this.selectedMonth || null,
            report_status: "Черновик",
            report_id: this.$store.state.currentReportId,
          },
          {
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        )
        .then((response) => {
          this.$store.commit(
            "setOutputReportId",
            response.data.output_report_id
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async uploadFile(id) {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("report_id", id);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/reports-import/",
          formData,
          {
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        );
        this.$store.commit("setResponseFromPost", response.data.indicators);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.search__params {
  width: 98%;
  display: flex;
  justify-content: space-between;
}
.select__block {
  display: flex;
  flex-direction: column;
}
input {
  padding: 5px;
}
select,
input {
  height: 34.5px;
  min-width: 240px;
}
span {
  font-size: 10.5px;
}
.btns {
  padding-top: 3%;
  max-width: 450px;
  display: flex;
  justify-content: space-between;
}
.btns button {
  width: 203px;
  height: 36px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10.5px;
  font-weight: 500;
}
.upload__btn {
  background-color: rgba(25, 106, 60, 0.88);
  color: #ffffff;
  border: none;
}
.download__btn {
  background: none;
  color: #000000;
  border: 1px solid #cdcddf;
}
.apply__btn {
  display: flex;
  align-items: center;
  padding-top: 0.8%;
}
.apply__btn button {
  min-width: 203px;
  height: 36px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10.5px;
  font-weight: 500;
  border: 1px solid #cdcddf;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
