import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: () => ({
    isAuth: false,
    token: "",
    username: "",
    password: "",
    base_url: import.meta.env.VITE_API_BASE_URL,
    urlCategories: `api/reports-cat-list/`,
    urlReports: `api/reports-list/`,
    urlGroupIndicators: `api/reports-gp-list/`,
    urlIndicators: `api/reports-idc-list/`,
    urlOutList: `api/reports-out-list/`,
    urlReportsIdcValues: `api/reports-idc-values/`,
    urlDownloadFile: `api/reports-download/`,
    urlUploadFile: `api/reports-import/`,
    urlSaveData: `api/reports-idc-values/`,
    urlLogin: `api-token-auth/`,
    urlDownloadFromHistory: `api/reports-export/`,
    urlToPatchData: `api/reports-idc-values/`,
    urlAdmin: `admin/`,
    isAdmin: true,
    categories: [],
    subCategories: [],
    reports: [],
    groupIndicators: [],
    indicators: [],
    reportsOutList: [],
    reportsIdcValues: [],
    currentReportId: null,
    outputReportId: null,
    responseFromUploadFile: [],
    isChangable: false,
    breadCrumbs: [],
  }),
  mutations: {
    setUsername(state, newVal) {
      state.username = newVal;
    },
    setPassword(state, newVal) {
      state.password = newVal;
    },
    setIsAuth(state, bool) {
      state.isAuth = bool;
    },
    setToken(state, newToken) {
      if (newToken === null || newToken[0] === "T") {
        state.token = newToken;
      } else {
        state.token = `Token ${newToken}`;
      }
    },
    serUrls(state) {
      state.urlCategories = state.base_url + state.urlCategories;
      state.urlReports = state.base_url + state.urlReports;
      state.urlGroupIndicators = state.base_url + state.urlGroupIndicators;
      state.urlIndicators = state.base_url + state.urlIndicators;
      state.urlOutList = state.base_url + state.urlOutList;
      state.urlReportsIdcValues = state.base_url + state.urlReportsIdcValues;
      state.urlDownloadFile = state.base_url + state.urlDownloadFile;
      state.urlUploadFile = state.base_url + state.urlUploadFile;
      state.urlSaveData = state.base_url + state.urlSaveData;
      state.urlLogin = state.base_url + state.urlLogin;
      state.urlDownloadFromHistory =
        state.base_url + state.urlDownloadFromHistory;
      state.urlToPatchData = state.base_url + state.urlToPatchData;
      state.urlAdmin = state.base_url + state.urlAdmin;
    },
    setCategories(state, newCategories) {
      const categories = newCategories.filter((item) => item.parent == null);
      const subcategories = newCategories.filter(
        (item) => item.parent !== null
      );
      state.categories = categories.map((category) => ({
        ...category,
        showSubCategory: false,
      }));
      state.subCategories = subcategories.map((category) => ({
        ...category,
        showReports: false,
      }));
    },
    setReports(state, newReports) {
      state.reports = newReports.map((report) => ({
        ...report,
        clicked: false,
      }));
    },
    setReportsClickToFalse(state, currentReport) {
      state.reports.forEach((report) => {
        if (report !== currentReport) {
          report.clicked = false;
        }
      });
    },
    setReportsClickToTrue(state, report) {
      state.reports.forEach((item) => {
        if (item.id === report.id) {
          item.clicked = true;
        }
      });
    },
    setGroupIndicators(state, newGroupIndicators) {
      state.groupIndicators = [...newGroupIndicators];
    },
    setIndicators(state, newIndicators) {
      state.indicators = [...newIndicators];
    },
    setReportsOutList(state, newReportsOutList) {
      state.reportsOutList = [...newReportsOutList];
    },
    setReportsIdcValues(state, newReportsIdcValues) {
      state.reportsIdcValues = [...newReportsIdcValues];
    },
    setCurrentReportId(state, newReportId) {
      state.currentReportId = newReportId;
    },
    setOutputReportId(state, newVal) {
      state.outputReportId = newVal;
    },
    setResponseFromUploadFile(state, newResponse) {
      state.responseFromUploadFile = [...newResponse];
    },
    setIsChangable(state, bool) {
      state.isChangable = bool;
    },
    setReportsState(state) {
      state.reports.forEach((report) => {
        report.clicked = false;
      });
    },
    setBreadCrumbs(state, report) {
      state.subCategories.forEach((subCategory) => {
        if (subCategory.id === report.category_report) {
          state.categories.forEach((category) => {
            if (category.id === subCategory.parent) {
              state.breadCrumbs[0] = category;
              state.breadCrumbs[1] = subCategory;
              state.breadCrumbs[2] = report;
            }
          });
        }
      });
    },
    setClickedKey(state, object) {
      if (object.parent === null) {
        state.categories.forEach(
          (category) => (category.showSubCategory = false)
        );
        const objectToFind = state.categories.find(
          (category) => category.id === object.id
        );
        objectToFind.showSubCategory = true;
      } else if (object.parent) {
        state.subCategories.forEach(
          (subCategory) => (subCategory.showReports = false)
        );
        const objectToFind = state.subCategories.find(
          (subCategory) => subCategory.id === object.id
        );
        objectToFind.showReports = true;
        const parentCategory = state.categories.find(
          (category) => category.id === object.parent
        );
        parentCategory.showSubCategory = true;
      } else if (object.category_report) {
        state.reports.forEach((report) => (report.clicked = false));
        const objectToFind = state.reports.find(
          (report) => report.id === object.id
        );
        objectToFind.clicked = true;
        state.currentReportId = object.id;
        const parentSubCategory = state.subCategories.find(
          (subCategory) => subCategory.id === object.category_report
        );
        state.subCategories.forEach(
          (subCategory) => (subCategory.showReports = false)
        );
        parentSubCategory.showReports = true;
        const parentCategory = state.categories.find(
          (category) => category.id === parentSubCategory.parent
        );
        state.categories.forEach(
          (category) => (category.showSubCategory = false)
        );
        parentCategory.showSubCategory = true;
      }
    },
  },

  actions: {
    async fetchCategories({ commit, state }) {
      try {
        const response = await axios.get(state.urlCategories, {
          headers: {
            Authorization: state.token,
          },
        });
        commit("setCategories", response.data.results);
      } catch (e) {
        alert("Ошибка с категориями");
      }
    },
    async fetchReports({ commit, state }) {
      try {
        const response = await axios.get(state.urlReports, {
          headers: {
            Authorization: state.token,
          },
        });
        commit("setReports", response.data.results);
      } catch (e) {
        alert("Не удалось получить Отчеты");
      }
    },
    async fetchGroupIndicators({ commit, state }, id) {
      try {
        const response = await axios.get(state.urlGroupIndicators, {
          params: {
            report: id,
          },
          headers: {
            Authorization: state.token,
          },
        });
        commit("setGroupIndicators", response.data.results);
      } catch (e) {
        alert("Ошибка ГП по ID");
      }
    },
    async fetchIndicators({ commit, state }, id) {
      try {
        const response = await axios.get(state.urlIndicators, {
          params: { group: id },
          headers: {
            Authorization: state.token,
          },
        });
        commit("setIndicators", response.data.results);
      } catch (e) {
        alert("Не удалось получить показатели");
      }
    },
    async fetchReportsOutList({ commit, state }, id) {
      try {
        const response = await axios.get(state.urlOutList, {
          params: { report_id: id },
          headers: {
            Authorization: state.token,
          },
        });
        commit("setReportsOutList", response.data.results);
      } catch (e) {
        alert("Ошибка с журналом");
      }
    },
    async fetchGroupIndicatorsByHistory({ commit, state }, id) {
      commit("setOutputReportId", id);
      try {
        const response = await axios.get(state.urlReportsIdcValues, {
          params: { output_id: id },
          headers: {
            Authorization: state.token,
          },
        });
        commit("setReportsIdcValues", response.data);
      } catch (e) {
        alert("Не удалось получить файлы");
      }
    },
    async fetchToken({ state, commit }) {
      await axios
        .post(state.urlLogin, {
          username: state.username,
          password: state.password,
        })
        .then((response) => {
          commit("setToken", response.data.token);
          commit("setIsAuth", true);
        })
        .catch((error) => {
          alert("Login error");
        });
    },
  },
});
