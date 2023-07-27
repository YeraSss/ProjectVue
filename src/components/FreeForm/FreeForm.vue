<template>
  <div class="free__form">
    <div class="btns">
      <my-button>Загрузить</my-button>
      <my-button>Скачать</my-button>
    </div>
    <div class="content">
      <ul>
        <div class="content__title" @click="toggleTextArea">
          <div class="short__name">Title</div>
          <span class="arrow"> arrow </span>
        </div>
        <li v-show="showTextArea">
          <textarea name="freetext" id="freetext" cols="160" rows="15">
          </textarea>
        </li>
      </ul>
      <div class="submit__btns">
        <my-button>Отправить</my-button>
        <my-button>Сохранить</my-button>
        <my-button>Отмена</my-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      showTextArea: false,
    };
  },
  methods: {
    toggleTextArea() {
      this.showTextArea = !this.showTextArea;
    },
  },
};
</script>

<style scoped>
.free__form {
  padding-left: 1%;
  padding-top: 1%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.btns {
  display: flex;
  column-gap: 20px;
  margin-bottom: 2%;
}
.content {
  width: 90%;
  height: 300px;
}
.content__title {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
#freetext {
  padding: 0;
  outline: none;
}
ul,
li {
  list-style: none;
}
.submit__btns {
    display: flex;
}
</style>
