<template>
  <div class="login">
    <div class="autorization">
      <h3>Регистрация</h3>
      <form @click.prevent class="form">
        <my-input
          :inputType="'text'"
          v-model="formToSend.username"
          class="inputs"
          placeholder="Введите имя пользователя"
        ></my-input>
        <my-input
          :inputType="'password'"
          v-model="formToSend.password"
          class="inputs"
          placeholder="Введите пароль"
        ></my-input>
        <my-input
          :inputType="'password'"
          v-model="formToSend.password2"
          class="inputs"
          placeholder="Повторите пароль"
        ></my-input>
        <my-input
          :inputType="'email'"
          v-model="formToSend.email"
          class="inputs"
          placeholder="Введите почту"
        ></my-input>
        <my-input
          :inputType="'text'"
          v-model="formToSend.first_name"
          class="inputs"
          placeholder="Введите имя"
        ></my-input>
        <my-input
          :inputType="'text'"
          v-model="formToSend.last_name"
          class="inputs"
          placeholder="Введите фамилию"
        ></my-input>
        <button class="btn-grad">Зарегестрироваться</button>
        <div>
          Уже есть аккаунт?
          <span @click="$router.push('/login')" class="registration"
            >Войти</span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      formToSend: {
        username: "",
        password: "",
        password2: "",
        email: "",
        first_name: "",
        last_name: "",
      },
    };
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
  box-shadow: 10px 5px 5px gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2%;
  border-radius: 12px;
}
.inputs {
  width: 300px;
  border: none;
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
  padding-top: 10%;
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
