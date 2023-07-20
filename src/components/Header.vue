<template>
  <header>
    <div class="logo">
      <img src="../assets/KMG_icon.svg" alt="KMG Icon" />
    </div>
    <div class="title">
      <h1>Система ввода информации</h1>
    </div>
    <div class="btns">
      <button class="btn">Войти</button>
    </div>
  </header>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
header {
  width: 100%;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3% 1%;
}
.logo img {
  width: 249px;
  height: 60px;
  cursor: pointer;
}
h1 {
  color: #ffffff;
  font-size: 21px;
  font-weight: 500;
}
.btns {
  display: flex;
  column-gap: 5%;
}
.btn {
  border: none;
  background: none;
  color: #ffffff;
  background-color: #36c0ef;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10.5px;
  font-weight: 500;
  width: 125px;
  height: 36px;
}
</style>
