<template>
  <div class="my__select">
    <select
      class="select"
      v-model="selectedOption"
      @change="emitSelectedOption"
    >
      <option  disabled value="">Выберите из списка</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <span class="select-arrow">▼</span>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    indicatorId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  methods: {
    emitSelectedOption() {
      this.$emit("optionSelected", this.selectedOption, this.indicatorId);
    },
  },
};
</script>

<style scoped>
.select {
  min-width: 195px;
  border: 1px solid black;
  border-radius: 12px;
  padding-left: 5px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.select-arrow {
  position: relative;
  display: inline-block;
  margin-left: -18px;
  pointer-events: none;
}

.select-arrow::after {
  content: "▼";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
