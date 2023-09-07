<template>
  <form class="form" @click.prevent>
    <my-button class="back__btn" @click="$router.push('/reports_history')"
      >Назад</my-button
    >
    <h2>Параметры для создания отчета:</h2>
    <div class="params">
      <div class="period select__block">
        <span>Период</span>
        <my-select
          class="selects"
          :options="periodArr"
          v-model="selectedPeriod"
          @change="changeOption"
        >
        </my-select>
      </div>
      <div class="year select__block">
        <span>Год</span>
        <my-input
          class="year__input"
          :inputType="'number'"
          v-model="selectedYear"
          placeholder="Введите год"
        />
      </div>
      <div class="quater select__block">
        <span>Квартал</span>
        <my-select
          class="selects"
          :options="quarterArr"
          :disabled="quaterDisabled"
          v-model="selectedQuarter"
        >
        </my-select>
      </div>
      <div class="month select__block">
        <span>Месяц</span>
        <my-select
          class="selects"
          :options="monthArr"
          :disabled="monthDisabled"
          v-model="selectedMonth"
        >
        </my-select>
      </div>
      <div class="apply__btn select__block">
        <my-button class="btn__aply" @click="fetchOutputReportId"
          >Создать отчет</my-button
        >
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      periodArr: ["Годовой", "Ежеквартальный", "Ежемесячный"],
      quarterArr: ["I", "II", "III", "IV"],
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
      quaterDisabled: false,
      monthDisabled: false,
      selectedPeriod: "",
      selectedYear: "",
      selectedQuarter: "",
      selectedMonth: "",
    };
  },
  methods: {
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
    async fetchOutputReportId() {
      console.log(this.$store.state.currentEntity)
      if(this.$store.state.currentEntity=="reportTab"){
        await axios.post(
          this.$store.state.urlOutList,
          {
            period: this.selectedPeriod,
            year: this.selectedYear,
            quarter: this.selectedQuarter || null,
            month: this.selectedMonth || null,
            status: "Черновик",
            report_id: this.$store.state.currentReportId,
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then((response) => {
          console.log(response.data.output_report_id)
          this.$store.commit(
            "setOutputReportId",
            response.data.output_report_id
          );
        })
        .catch((error) => {
          console.log(error);
        });
      if (this.$store.state.groupIndicators.length === 1) {
        this.$router.push("/free_form");
      } else {
        this.$router.push("/group_indicators");
      }
      }else if(this.$store.state.currentEntity=="documentTab"){
        await axios.post(
          this.$store.state.urlDocumentsOutList,
          { doc_name: "Name of document",
            period: this.selectedPeriod,
            year: this.selectedYear,
            quarter: this.selectedQuarter || null,
            month: this.selectedMonth || null,
            status: "Черновик",
            document_id: this.$store.state.currentReportId,
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then((response) => {
          console.log(response.data.output_report_id)
          this.$store.commit(
            "setOutputReportId",
            response.data.output_report_id
          );
        })
        .catch((error) => {
          console.log(error);
        });
      if (this.$store.state.groupIndicators.length === 1) {
        this.$router.push("/free_form");
      } else {
        this.$router.push("/group_doc_indicators");
      }
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 2%;
}
.btn__aply {
  height: 40px;
}
.params {
  width: 100%;
  display: flex;
  column-gap: 5%;
}
.select__block {
  display: flex;
  flex-direction: column;
}
.selects {
  height: 40px;
}
.year__input {
  height: 40px;
}
span {
  font-size: 10.5px;
}
.apply__btn {
  display: flex;
  align-items: center;
  padding-top: 0.8%;
}
.apply__btn button {
  background: #127cc1;
  color: #ffffff;
  padding: 8px 12px;
  border: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.back__btn {
  margin-bottom: 1%;
  border: none;
  background: #36c0ef;
  padding: 8px 12px;
  color: #ffffff;
}
</style>
