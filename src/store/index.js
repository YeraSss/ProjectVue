import axios from "axios";
import { Store, createStore } from "vuex";

export default createStore({
  state: () => {
    return {
      isAuth: true,
      categories: [],
      subCategories: [],
      reports: [],
      groupIndicatorsWithId: [],
      indicatorsWithId: [],
      reportsOutList: [],
      currentReportId: null,
      outputReportId: null,
    };
  },
  getters: {},
  mutations: {
    logIn(state) {
      state.isAuth = true;
    },
    logOut(state) {
      state.isAuth = false;
    },
    setCategories(state, data) {
      const idNull = data.filter((item) => item.parent == null);
      const idNumber = data.filter((item) => item.parent !== null);
      state.categories = idNull.map((category) => ({
        ...category,
        showSubCategory: false,
      }));
      state.subCategories = idNumber.map((category) => ({
        ...category,
        showReports: false,
      }));
      state.categories = idNull;
      state.subCategories = idNumber;
    },
    setReports(state, reportsArray) {
      state.reports = reportsArray.map((report) => ({
        ...report,
        clicked: false,
      }));
    },
    setGroupIndicatorsWithId(state, groupIndicatorsId) {
      state.groupIndicatorsWithId = groupIndicatorsId;
    },
    setIndicatorsWithId(state, indicatorsArray) {
      state.indicatorsWithId = indicatorsArray;
    },
    setReportsOutList(state, array) {
      state.reportsOutList = array;
    },
    setCurrentReportId(state, id) {
      state.currentReportId = id;
    },
    setOutputReportId(state, number) {
      state.outputReportId = number;
    },
    setFoundCategory(state, obj) {
      state.categories.forEach((item) => {
        if (item.id === obj.id) {
          item.showSubCategory = true;
        }
      });
    },
    setFoundSubCategory(state, obj) {
      state.subCategories.forEach((item) => {
        if (item.id === obj.id) {
          item.showReports = true;
          state.categories.forEach((category) => {
            if (category.id === item.parent) {
              category.showSubCategory = true;
            }
          });
        }
      });
    },
    setFoundReport(state, obj) {
      state.reports.forEach((item) => {
        if (item.id === obj.id) {
          item.clicked = true;
          state.subCategories.forEach((subCategory) => {
            if (subCategory.id === item.category_report) {
              subCategory.showReports = true;
              state.categories.forEach((category) => {
                if (category.id === subCategory.parent) {
                  category.showSubCategory = true;
                }
              });
            }
          });
        }
      });
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reports-cat-list/",
          {
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        );
        commit("setCategories", response.data.results);
      } catch (e) {
        alert("Ошибка с категориями");
      }
    },
    async fetchReports({ commit }) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reports-list/",
          {
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        );
        commit("setReports", response.data.results);
      } catch (e) {
        alert("Не удалось получить Отчеты");
        console.log(e);
      }
    },
    async fetchGroupIndicatorsWithId({ commit }, id) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reports-gp-list/",
          {
            params: {
              report: id,
            },
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        );
        commit("setGroupIndicatorsWithId", response.data.results);
      } catch (e) {
        alert("Ошибка ГП по ID");
        console.log(e);
      }
    },
    async fetchIndicatorsWithId({ commit }, id) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reports-idc-list/",
          {
            params: { group: id },
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        );
        commit("setIndicatorsWithId", response.data.results);
      } catch (e) {
        alert("Не удалось получить показатели");
        console.log(e);
      }
    },
    async fetchReportsOutList({ commit }, id) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reports-out-list/",
          {
            params: { report_id: id },
            headers: {
              Authorization: "Token 569d711db23ed25ac0226ccc2cf7c90bc238f1fb",
            },
          }
        );
        commit("setReportsOutList", response.data.results);
      } catch (e) {
        alert("Ошибка с журналом");
        console.log(e);
      }
    },
  },
});
