<template>
  <div class="group__indicators">
    <div
      class="gp__item"
      v-for="group__indicator in $store.state.groupIndicatorsWithId"
      :key="group__indicator.id"
    >
      <ul>
        <div class="gp__title" @click="toggleTable(group__indicator.id)">
          {{ group__indicator.short_name }}
        </div>
        <li
          v-for="indicator in getObjectById(
            group__indicator.id,
            groupIndicatorsArray
          )"
          :key="indicator.id"
        >
          <div
            class="indicators__items"
            v-if="isTableVisible(group__indicator.id)"
          >
            <div>{{ indicator.short_name }}</div>
            <input
              v-if="indicator.type_value !== 'list'"
              disabled
              :type="getInputType(indicator.type_value)"
              :value="getInputValue(indicator.id)"
              @input="updateInputValue(indicator.id, $event.target.value)"
            />
            <select v-else>
              <option disabled selected value="">Выберите из списка</option>
              <option
                v-for="option in indicator.parameters"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      openTables: [],
      groupIndicatorsArray: [],
      inputValues: {},
      inputValToPost: {
        indicator_value: "",
        indicator: null,
        output_report: null,
      },
    };
  },
  created() {
    this.getInitialData();
  },
  methods: {
    ...mapActions({
      fetchIndicatorsWithId: "fetchIndicatorsWithId",
    }),
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
        this.fetchIndicatorsWithId(groupId).then(() => {
          const obj = {
            id: groupId,
            data: this.$store.state.indicatorsWithId,
          };
          this.addObj(this.groupIndicatorsArray, obj);
          this.openTables.push(groupId);
        });
      }
    },
    isTableVisible(groupId) {
      return this.openTables.includes(groupId);
    },

    updateInputValue(indicatorId, value) {
      this.inputValues[indicatorId] = value;
    },
    closeAll() {
      this.$emit("close");
    },
    getInitialData() {
      const array = [...this.$store.state.inputValuesFromHistory];
      array.forEach((item) => {
        this.inputValues[item.indicator] = item.indicator_value;
      });
    },
  },
  watch: {
    $store: {
      handler: "getInitialData",
      deep: true,
      immediate: true,
    },
  },
  computed: {
    getObjectById() {
      return (id, array) => {
        const foundObject = array.find((obj) => obj.id === id);
        return foundObject ? foundObject.data : [];
      };
    },
    getInputValue() {
      return (indicatorId) => {
        return this.inputValues[indicatorId];
      };
    },
    getInputType() {
      return (inputType) => {
        if (
          inputType === "float" ||
          inputType === "int" ||
          inputType === "number"
        ) {
          return "number";
        } else if (inputType === "str" || inputType === "text") {
          return "text";
        } else if (inputType === "bool" || inputType === "radio") {
          return "radio";
        } else if (inputType === "date") {
          return "date";
        } else if (inputType === "password") {
          return "password";
        } else if (updateInput === "file") {
          return "file";
        } else if (inputType === "email") {
          return "email";
        } else {
          return "text";
        }
      };
    },
  },
};
</script>

<style scoped>
.group__indicators {
  width: 99%;
  display: flex;
  flex-direction: column;
  padding-top: 3%;
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
.indicators__items {
  max-width: 80%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 0 5px;
}
.indicators__items input {
  height: 36px;
}
.gp__title {
  width: 80%;

  padding: 10px 5px;
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
</style>
