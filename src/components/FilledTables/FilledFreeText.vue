<template>
  <div class="filled__freetext">
    <h2>Просмотр отчета:</h2>
    <ul class="filled__table">
      <div class="short__name">
        {{ $store.state.groupIndicators[0].short_name }}
      </div>
      <li>
        <textarea name="freetext" id="freetext" cols="100" rows="15"></textarea>
        <my-button @click="downloadFilledFile">Скачать файл</my-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    downloadFilledFile() {
        
    },
  },
};
</script>

<style scoped></style>
