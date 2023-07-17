<template>
  <div class="search">
    <input
      v-model="searchTerm"
      @input="handleInput"
      class="input"
      :placeholder="'Поиск...'"
    />
    <ul v-if="filteredItems.length && searchTerm" class="dropdown">
      <li
        v-for="item in filteredItems"
        :key="item.id"
        @click="selectItem(item.category_name)"
      >
        {{ item.category_name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    filteredItems() {
      return this.$store.state.categories.filter((item) =>
        item.category_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    handleInput() {},
    selectItem(item) {
      this.searchTerm = item;
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  background-color: #ffffff;
  border: none;
  outline: none;
  padding: 5px 15px;
  border-radius: 5px;
  height: 54px;
  font-size: 12px;
}
.dropdown {
  width: 100%;
  position: relative;
  top: 3px;
  list-style-type: none;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
}
.dropdown li {
  padding: 5px;
  cursor: pointer;
  color: #000000;
  font-size: 12px;
}
.dropdown li:hover {
  background-color: rgba(0, 158, 227, 0.15);
}
</style>
