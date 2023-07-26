<template>
  <div class="reports__history__page">
    <Breadcrumb />
    <my-button
      class="create__report__btn"
      @click="
        $router.push('form_page');
        $store.commit('setBreadCrumb', {
          label: 'Создать отчет',
          link: '/form_page',
        });
      "
      >Создать новый отчет</my-button
    >
    <ReportsHistory />
  </div>
</template>

<script>
import ReportsHistory from "@/components/ReportsHistory.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
export default {
  components: {
    ReportsHistory,
    Breadcrumb,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.reports__history__page {
  padding: 1%;
}
.create__report__btn {
  margin-bottom: 1%;
  padding: 8px 12px;
  background: #36c0ef;
  border: none;
  color: white;
}
</style>
