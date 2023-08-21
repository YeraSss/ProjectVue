<template>
  <v-tabs>
    <v-tab @click="selectedTab = 'categories'" :class="{'custom-tab': true, 'reports-tab': true, 'active-tab': selectedTab === 'categories'}">
      Отчеты
    </v-tab>
    <v-tab @click="selectedTab = 'documents'" :class="{'custom-tab': true, 'documents-tab': true, 'active-tab': selectedTab === 'documents'}" v-if="docCategoriesLength > 0">
      Документы
    </v-tab>
  </v-tabs>

  <div v-if="selectedTab === 'categories'" class="content" :class="{'active-content': selectedTab === 'categories'}">
    <categories />
  </div>
  <div v-if="selectedTab === 'documents'" class="content" :class="{'active-content': selectedTab === 'documents'}">
    <documents />
  </div>
</template>
  
  <script>
import Categories from './Categories.vue';
import Documents from './Documents.vue';

export default {
  components: {
    Categories,
    Documents,
  },
  data() {
    return {
      selectedTab: 'categories',
    };
  },
  computed: {
    docCategoriesLength() {
      return this.$store.state.docCategories.length;
    },
  },
};
</script>
  
  <style>
  .custom-tab {
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  .active-tab {
    background-color: #0056b3;
  }
  .content {
    transition: background-color 0.3s ease;
  }
  .active-content {
    background-color: #0056b3;
    color: white;
    border-radius: 10px;    
    padding: 10px 10px;
  }
  .reports-tab{
    float: left;
    cursor: pointer;
  }
  .documents-tab{
    float: right;
    cursor: pointer;
  }
  </style>