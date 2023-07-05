<template>
  <div class="bg-blue">
    <v-app-bar style="background-color: #417690" :elevation="1">
      <div class="search">
        <input
          class="search__input"
          type="text"
          placeholder="Поиск..."
          v-model="searchQuery"
          @input="handleInputChange"
        />
        <ul v-if="showDropdown">
          <li v-for="option in filteredOptions" :key="option" :value="option">
            {{ option }}
          </li>
        </ul>
      </div>
      <template v-slot:append>
        <div v-if="isAuth">
          <v-btn color="white" prepend-icon="mdi-account-circle"
            >Личный кабинет</v-btn
          >
          <v-btn color="white" @click="logOut" prepend-icon="mdi-logout"
            >Выйти</v-btn
          >
        </div>
        <div v-else-if="!isAuth" class="header__btns">
          <v-btn
            color="white"
            variant="outlined"
            @click="openLogInForm"
            prepend-icon="mdi-login"
            >Войти</v-btn
          >
          <v-btn
            color="white"
            variant="outlined"
            @click="openRegistrationForm"
            prepend-icon="mdi-account-plus-outline"
          >
            Зарегестрироваться
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <Dialog
      :show="openDialog"
      :logging="logging"
      :registration="registration"
      @hideDialog="hideDialog"
      @getRegisterData="emitRegisterData"
    />
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import MyInput from "@/components/UI/MyInput.vue";
export default {
  props: {
    options: {
      type: Array,
    },
  },
  data() {
    return {
      isAuth: false,
      openDialog: false,
      logging: false,
      registration: false,
      searchQuery: "",
      showDropdown: false,
    };
  },
  components: {
    Dialog,
    MyInput,
  },
  methods: {
    openLogInForm() {
      this.openDialog = true;
      this.logging = true;
      this.registration = false;
    },
    openRegistrationForm() {
      this.openDialog = true;
      this.registration = true;
      this.logging = false;
    },
    logOut() {
      this.isAuth = false;
      this.$emit("logedOut", this.isAuth);
    },
    hideDialog() {
      this.openDialog = false;
      this.isAuth = true;
      this.$emit("logedIn", this.isAuth);
    },
    emitRegisterData(registrationData) {
      this.$emit("getRegisterData", registrationData);
    },
    handleInputChange() {
      if (this.searchQuery) {
        this.showDropdown = true;
      } else {
        this.showDropdown = false;
      }
    },
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
        option.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.header__btns {
  display: flex;
  column-gap: 10px;
}
.search {
  padding-left: 10px;
}
.search__input {
  padding: 10px;
  border: none;
  border-bottom: 2px solid white;
  min-width: 250px;
  color: #ffffff;
}
.search__input:focus {
  outline: none;
}
.search__input::placeholder {
  color: white;
}
</style>
