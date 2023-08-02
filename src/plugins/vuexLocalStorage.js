const vuexLocalStoragePlugin = (store) => {
  store.watch(
    (state) => [state.isAuth, state.token],
    ([isAuth, token]) => {
      localStorage.setItem("isAuth", JSON.stringify(isAuth));
      localStorage.setItem("token", JSON.stringify(token));
    },
    { deep: true }
  );
};

export default vuexLocalStoragePlugin;
