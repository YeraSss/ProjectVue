<template>
  <div class="group__indicators">
    <my-button
      class="back__btn"
      @click="
        $router.push('/reports_history');
        clearAll();
      "
      >Назад</my-button
    >
    <h2>Просмотр отчета:</h2>
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
          ></span>
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
    <div class="save__btn">
      <my-button @click="patchData">Сохранить</my-button>
      <my-button @click="sentData">Отправить</my-button>
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
    getInitialData() {
      this.$store.state.reportsIdcValues.forEach((item) => {
        this.inputValues[item.indicator] = item.indicator_value;
      });
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
    updateInputValue(indicatorId, value) {
      this.inputValues[indicatorId] = value;
    },
    async patchData() {
      const dataToPost = Object.entries(this.inputValues).map(
        ([id, inputValue]) => ({
          indicator_value: inputValue,
          id: id,
        })
      );
      await axios
        .patch(
          this.$store.state.urlToPatchData,
          {
            update: dataToPost,
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
        .patch(
          this.$store.state.urlToPatchData,
          {
            update: dataToPost,
            output_report: {
              status: "На согласовании",
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
    clearAll() {
      this.$store.commit("setReportsIdcValues", []);
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
  font-size: 18px;
}
h2 {
  padding-left: 0.5%;
  margin-bottom: 1.5%;
}
.gp__item {
  font-size: 18px;
  font-weight: 600;
}
.back__btn {
  width: 100px;
  margin-bottom: 2%;
  background: #36c0ef;
  padding: 8px 12px;
  border: none;
  color: #ffffff;
}
.save__btn {
  padding-top: 2%;
  display: flex;
  column-gap: 25px;
}
.save__btn button {
  width: 100px;
  height: 32px;
  background: #36c0ef;
  padding: 8px 12px;
  color: #ffffff;
  border: none;
}
.save__btn button:last-child {
  background: #337b53;
}
.save__btn button:last-child:hover {
  background: teal;
}

.group__indicators {
  width: 99%;
  display: flex;
  flex-direction: column;
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

.indicators__items {
  max-width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3%;
  padding: 0 5px;
  padding-bottom: 2px;
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
