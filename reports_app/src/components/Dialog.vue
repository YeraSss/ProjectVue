<template>
  <div class="dialog" v-if="show">
    <div class="dialog__content">
      <div class="log__form" v-if="logging">
        <DialogInputs
          :placeholder="'Введите имя пользователя'"
          @updateInput="updateLogin"
          :focus="true"
          input-type="text"
        />
        <DialogInputs
          :placeholder="'Введите пароль'"
          @updateInput="updatePassword"
          input-type="password"
        />
        <v-btn @click="hideDialog" class="dialog__btn">Войти</v-btn>
      </div>
      <div v-if="registration" class="registration__form">
        <DialogInputs
          @updateInput="registrationData.user_name = $event"
          :focus="true"
          :input-type="'text'"
          :placeholder="'Введите имя пользователя'"
        />
        <DialogInputs
          @updateInput="registrationData.password = $event"
          :input-type="'password'"
          :placeholder="'Введите пароль'"
        />
        <DialogInputs
          @updateInput="registrationData.password2 = $event"
          :input-type="'password'"
          :placeholder="'Повторите пароль'"
        />
        <DialogInputs
          @updateInput="registrationData.email = $event"
          :input-type="'email'"
          :placeholder="'Введите почту'"
        />
        <DialogInputs
          @updateInput="registrationData.first_name = $event"
          :input-type="'text'"
          :placeholder="'Введите имя'"
        />
        <DialogInputs
          @updateInput="
            registrationData.last_name = $event;
            console.log(registrationData);
          "
          :input-type="'text'"
          :placeholder="'Введите фамилию'"
        />
        <v-btn
          class="dialog__btn"
          @click="$emit('getRegisterData', registrationData)"
          >Зарегистрироваться</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import DialogInputs from "@/components/DialogInputs.vue";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    registration: {
      type: Boolean,
      default: false,
    },
    logging: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DialogInputs,
  },
  data() {
    return {
      loginFromInput: "",
      passwordFromInput: "",
      registrationData: {
        user_name: "",
        password: "",
        password2: "",
        email: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    hideDialog() {
      this.$emit("hideDialog", false);
    },
    updateLogin(value) {
      this.loginFromInput = value;
    },
    updatePassword(value) {
      this.passwordFromInput = value;
    },
  },
};
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  position: fixed;
  display: flex;
}

.dialog__content {
  border: 2px solid #417690;
  margin: auto;
  background: #417690;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
  padding-bottom: 50px;
}
.dialog__btn {
  border-radius: 12px;
  padding: 5px;
  color: black;
}
.log__form {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
.registration__form {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
</style>
