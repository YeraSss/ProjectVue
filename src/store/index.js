import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: () => ({
    isAuth: false,
    token: null,
    username: "",
    password: "",
    base_url: import.meta.env.VITE_API_BASE_URL,
    urlCategories: `/api/reports-cat-list/`,
    urlReports: `/api/reports-list/`,
    urlGroupIndicators: `/api/reports-gp-list/`,
    urlIndicators: `/api/reports-idc-list/`,
    urlOutList: `/api/reports-out-list/`,
    urlReportsIdcValues: `/api/reports-idc-values/`,
    urlDownloadFile: `/api/reports-download/`,
    urlUploadFile: `/api/reports-import/`,
    urlSaveData: `/api/reports-idc-values/`,
    urlLogin: `/api/api-token-auth/`,
    urlDownloadFromHistory: `/api/reports-export/`,
    urlToPatchData: `/api/reports-idc-values/`,
    urlReportsFile: `/api/reports-file/`,
    urlAdmin: `/admin/`,
    urlFreeFormFile: "/reports-file/",
    urlDocumentsList: `/api/documents-list/`,
    urlDocumentsCatList: `/api/documents-cat-list/`,
    urlDocumentsGpList: `/api/documents-gp-list/`,
    categories: [],
    subCategories: [],
    reports: [],
    groupIndicators: [],
    indicators: [],
    reportsOutList: [],
    reportsIdcValues: [],
    responseFromUploadFile: [],
    breadCrumbs: [],
    isAdmin: false,
    currentReportId: null,
    outputReportId: null,
    isFreeText: false,
    isChangable: null,
    docCategories: [],
    documentsList: [],
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
    setIsFreeText(state, bool) {
      state.isFreeText = bool;
    },

    setUrls(state) {
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
      state.urlFreeFormFile = state.base_url + state.urlFreeFormFile;
      state.urlSubCategories = state.base_url + state.urlSubCategories;
      state.urlDocumentsList = state.base_url + state.urlDocumentsList;
      state.urlDocumentsCatList = state.base_url + state.urlDocumentsCatList;
      state.urlDocumentsGpList = state.base_url + state.urlDocumentsGpList;
    },
    setCategories(state, newCategories) {
      const categories = newCategories;
      state.categories = categories.map((category) => ({
        ...category,
        showSubCategory: false,
      }));
    },
    setElements(state, newElements) {
      state.elements = newElements.map((element) => ({
        ...element,
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
    setShowSubCategory(state, category) {
      state.categories.forEach((item) => {
        if (item.id === category.id) {
          item.showSubCategory = !item.showSubCategory;
          return;
        }
      });
    },
    setShowReports(state, subCategory) {
      state.subCategories.forEach((item) => {
        if (item.id === subCategory.id) {
          item.showReports = !item.showReports;
          return;
        }
      });
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
    setDocumentsList(state, newDocumentsList) {
      const documentsList = newDocumentsList;
      state.documentsList = documentsList.map((report) => ({
        ...report
      })) 
    },
    setDocumentsCatList(state, newDocumentsCatList) {
      const docCategories = newDocumentsCatList;
      state.docCategories = docCategories.map((category) => ({
        ...category,
        showSubCategory: false,
      }));
    },
    setDocumentsGpList(state, documentsGpList) {
      state.documentsGpList = documentsGpList;
    },
  },

  actions: {
    async fetchCategories({ commit, state }, id = null) {
      try {
        const response = await axios.get(state.urlCategories, {
          headers: {
            Authorization: state.token,
          },
          params: {
            parent_id: id,
          },
        });
        commit("setCategories", response.data.results);
      } catch (e) {
        alert("Ошибка с категориями");
      }
    },
    async fetchCategoriesWithChildren({ state }, id = null) {
      try {
        const response = await axios.get(state.urlCategories, {
          headers: {
            Authorization: state.token,
          },
          params: {
            parent_id: id,
          },
        });
        return response.data.results;
      } catch (e) {
        alert("Ошибка с категориями");
      }
    },
    async fetchElements({ commit, state }, id) {
      try {
        const response = await axios.get(state.urlReports, {
          params: {
            category_id: id,
          },
          headers: {
            Authorization: state.token,
          },
        });
        commit("setElements", response.data.results);
      } catch (e) {
        alert("Не удалось получить Отчеты");
      }
    },
    async fetchElements123({ state }, id) {
      try {
        const response = await axios.get(state.urlReports, {
          params: {
            category_id: id,
          },
          headers: {
            Authorization: state.token,
          },
        });
        return response.data.results;
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
    async fetchDocumentsList({ commit, state }, id) {
      try {
        const response = await axios.get(state.urlDocumentsList, {
          params:{
            category_id: id,
          },
          headers: {
            Authorization: state.token,
          },
        });
        commit("setDocumentsList", response.data.results);
      } catch (e) {
        alert("Ошибка получения списка документов");
      }
    },
    async fetchDocumentsCatList({ commit, state }) {
      try {
        const response = await axios.get(state.urlDocumentsCatList, {
          headers: {
            Authorization: state.token,
          },
        });
        commit("setDocumentsCatList", response.data.results);
      } catch (e) {
        alert("Ошибка получения списка категорий документов");
      }
    },
    async fetchDocumentsGpList({ commit, state }) {
      try {
        const response = await axios.get(state.urlDocumentsGpList, {
          headers: {
            Authorization: state.token,
          },
        });
        commit("setDocumentsGpList", response.data.results);
      } catch (e) {
        alert("Ошибка получения списка групп документов");
      }
    },
  },
  },
);