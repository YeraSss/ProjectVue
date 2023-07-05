<template>
  <div class="table">
    <h2>{{ groupIndicator }}:</h2>
    <table class="report__table">
      <thead>
        <tr>
          <th>Наименование показателя</th>
          <th>Ввод данных</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in reportArray" :key="item.id">
          <td>
            {{ item.indicator_name }}
          </td>
          <td v-if="item.type_value === 'list'">
            <MySelect
              :indicatorId="item.id"
              :options="item.parameters"
              @optionSelected="handleOptionSelected"
              class="table__select"
            />
          </td>
          <td v-else>
            <MyInput
              :indicatorId="item.id"
              @updateInput="updateInput"
              :input-type="item.type_value"
              class="table__inputs"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="border: none">
            <div class="btns">
              <div class="submit__btns">
                <button @click="submitIndicators">Отправить</button>
                <MyInput :input-type="'file'" @change="handleFileChange" />
              </div>
              <div class="file__input">
                <button @click="$emit('showFinishedTable', true)">
                  Показать заполненные показатели
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
export default {
  props: {
    reportArray: {
      type: Array,
      default: () => [],
    },
    groupIndicator: {
      type: String,
    },
  },
  components: {
    MySelect,
    MyInput,
  },
  data() {
    return {
      indicatorChanges: [],
    };
  },
  methods: {
    submitIndicators() {
      this.$emit("indicatorChanges", this.indicatorChanges);
      console.log(this.indicatorChanges);
    },
    handleOptionSelected(option, id) {
      const newChange = { id: id, indicator_value: option };
      let indexToUpdate = this.indicatorChanges.findIndex(
        (obj) => obj.id === newChange.id
      );
      if (indexToUpdate !== -1) {
        this.indicatorChanges.splice(indexToUpdate, 1, newChange);
      } else {
        this.indicatorChanges.push(newChange);
      }
    },
    updateInput(value, id) {
      const newChange = { id: id, indicator_value: value };
      let indexToUpdate = this.indicatorChanges.findIndex(
        (obj) => obj.id === newChange.id
      );
      if (indexToUpdate !== -1) {
        this.indicatorChanges.splice(indexToUpdate, 1, newChange);
      } else {
        this.indicatorChanges.push(newChange);
      }
    },
    handleFileChange(file) {
      // обрабатываем выбранный файл
      // например, this.uploadFile(file);
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 15px;
  font-weight: 900;
}
.report__table {
  width: 100%;
  border-collapse: collapse;
}
.report__table th,
.report__table td {
  padding: 8px 16px;
  border: 2px solid #417690;
}
button {
  border: 2px solid #417690;
  padding: 5px;

  background-color: #417690;
  color: #ffffff;
}
.btns {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.submit__btns {
  min-width: 400px;
  display: flex;
  column-gap: 25px;
  margin-left: -15px;
}
.file__input {
  margin-right: -20px;
  display: flex;
}
</style>
