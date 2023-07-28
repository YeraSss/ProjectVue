const vuexLocalStoragePlugin = (store) => {
  store.watch(
    (state) => [
      state.isAuth,
      state.token,
      state.currentReportId,
      state.reportsOutList,
      state.categories,
      state.subCategories,
      state.reports,
      state.groupIndicators,
      state.indicators,
      state.reportsOutList,
      state.reportsIdcValues,
      state.outputReportId,
      state.responseFromUploadFile,
      state.isChangable,
      state.breadCrumbs,
    ],
    ([
      isAuth,
      token,
      currentReportId,
      reportsOutList,
      categories,
      subCategories,
      reports,
      groupIndicators,
      indicators,
      reportsIdcValues,
      outputReportId,
      isChangable,
      breadCrumbs,
    ]) => {
      localStorage.setItem("isAuth", JSON.stringify(isAuth));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("currentReportId", JSON.stringify(currentReportId));
      localStorage.setItem("reportsOutList", JSON.stringify(reportsOutList));
      localStorage.setItem("categories", JSON.stringify(categories));
      localStorage.setItem("subCategories", JSON.stringify(subCategories));
      localStorage.setItem("reports", JSON.stringify(reports));
      localStorage.setItem("groupIndicators", JSON.stringify(groupIndicators));
      localStorage.setItem("indicators", JSON.stringify(indicators));
      localStorage.setItem(
        "reportsIdcValues",
        JSON.stringify(reportsIdcValues)
      );
      localStorage.setItem("outputReportId", JSON.stringify(outputReportId));
      localStorage.setItem("isChangable", JSON.stringify(isChangable));
      localStorage.setItem("breadCrumbs", JSON.stringify(breadCrumbs));
    },
    { deep: true }
  );
};

export default vuexLocalStoragePlugin;
