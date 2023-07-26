import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: () => ({
    isAuth: false,
    token: "",
    username: "",
    password: "",
    urlCategories: "http://127.0.0.1:8000/api/reports-cat-list/",
    urlReports: "http://127.0.0.1:8000/api/reports-list/",
    urlGroupIndicators: "http://127.0.0.1:8000/api/reports-gp-list/",
    urlIndicators: "http://127.0.0.1:8000/api/reports-idc-list/",
    urlOutList: "http://127.0.0.1:8000/api/reports-out-list/",
    urlReportsIdcValues: "http://127.0.0.1:8000/api/reports-idc-values/",
    urlDownloadFile: "http://127.0.0.1:8000/api/reports-download/",
    urlUploadFile: "http://127.0.0.1:8000/api/reports-import/",
    urlSaveData: "http://127.0.0.1:8000/api/reports-idc-values/",
    urlLogin: "http://127.0.0.1:8000/api-token-auth/",
    urlDownloadFromHistory: "http://127.0.0.1:8000/api/reports-export/",
    urlToPatchData: "http://127.0.0.1:8000/api/reports-idc-values/",
    urlAdmin: "http://127.0.0.1:8000/admin/",
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
    foundName: {},
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
      state.token = `Token ${newToken}`;
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
    setFoundName(state, newVal) {
      state.foundName = newVal;
    },
    setReportsState(state) {
      state.reports.forEach((report) => {
        report.clicked = false;
      });
    },
    setBreadCrumbs(state, newCrumb) {
      if (newCrumb.parent === null) {
        state.breadCrumbs[0] = newCrumb;
      } else if (newCrumb.parent) {
        state.breadCrumbs[1] = newCrumb;
      } else if (newCrumb.category_report) {
        state.breadCrumbs[2] = newCrumb;
      }
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
        state.forEach((subCategory) => (subCategory.showReports = false));
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
