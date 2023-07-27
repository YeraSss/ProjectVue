<template>
  <div class="login">
    <div class="autorization">
      <h3>Авторизация</h3>
      <form class="form" @click.prevent>
        <my-input v-model="login" placeholder="Логин" class="inputs" />
        <my-input
          v-model="password"
          :inputType="'password'"
          placeholder="Пароль"
          class="inputs"
        />
        <button @click="loginUser" class="btn-grad">Войти</button>
        <div>
          Еще нет аккаунта?
          <span @click="$router.push('/registration')" class="registration"
            >Регистрация</span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      show: true,
      login: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      fetchToken: "fetchToken",
    }),
    async loginUser() {
      this.$store.commit("setUsername", this.login);
      this.$store.commit("setPassword", this.password);
      await this.fetchToken();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  padding-top: 5%;
}
.autorization {
  width: 500px;
  min-height: 500px;
  margin: auto;
  background: white;
  box-shadow: 10px 10px 5px gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2%;
  border-radius: 12px;
}
.inputs {
  width: 300px;
  border: none;
  border-radius: 0;
  background: white;
  border-bottom: 1px solid black;
  outline: none;
  color: black;
}
.inputs::placeholder {
  color: black;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  padding-top: 15%;
}

.btn-grad {
  width: 250px;
  background-image: linear-gradient(
    to right,
    #232526 0%,
    #414345 51%,
    #232526 100%
  );
  margin: 10px;
  padding: 15px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.btn-grad:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.registration {
  text-decoration-line: underline;
  cursor: pointer;
  color: #090979;
}
</style>
