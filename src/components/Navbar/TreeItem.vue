<template>
  <v-list-item-group 
  class="tree_item" 
  :class="{ active: isOpen }"
  >
    <v-list-item 
    class="parent"
    @click="handleItemClick"
    >
      <v-list-item-content>        
        <v-list-item-title 
        class="parent_short_name">{{ item.short_name }}</v-list-item-title>
        <span class="arrow" :class="{ 'arrow-down': isOpen }"></span>
      </v-list-item-content>
    </v-list-item>
    <div class="tree-list-container">
    <TreeItem class="tree-list"
      v-for="childItem in children"
      :key="childItem.id"
      :item="childItem"
      :type="type"
      />
    </div>
    <div class="report-list">
    <TreeItem class="tree-list"
      v-for="report in reportsList"
      :key="report.id"
      :item="report"
      @click.stop="getMainPage(report)"
    />
  </div>
  </v-list-item-group>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    type: {
      String,
    }
  },
  data() {
    return {
      isOpen: false,
      children: [],
      reportsList: [],
        };
  },
  methods: {
    ...mapActions([
      "fetchCategoriesWithChildren",
      "fetchElements",
      "fetchReportsOutList",
      "fetchGroupIndicators",
      "fetchDocumentsList123",
      "fetchDocumentsCatList123",
      "fetchDocumentsOutList",
      "fetchDocumentsGpList"
    ]),
    async handleItemClick() {
      if (this.item.children) {
        if(this.type=="reportTab"){
          const categoryWithChildren = await this.fetchCategoriesWithChildren(this.item.id);
          this.children = categoryWithChildren;
        } else if (this.type=="documentTab"){
          const docCategoryList = await this.fetchDocumentsCatList123(this.item.id);
          this.children = docCategoryList;
        }
      }
      if (this.item.reports) {
        const elementsList = await this.fetchElements(this.item.id);
        for (let i in elementsList){
          elementsList[i].short_name = elementsList[i].naming.short_name
          elementsList[i].full_name = elementsList[i].naming.full_name
        }
        this.reportsList = elementsList;
      }
      if (this.item.document) {
        const docList = await this.fetchDocumentsList123(this.item.id);
        for (let i in docList){
          docList[i].short_name = docList[i].naming.short_name
          docList[i].full_name = docList[i].naming.full_name
        }
        this.reportsList = docList;
      }
      
      this.isOpen = !this.isOpen;
      if (this.isOpen === false){
        this.children = true;
        this.reportsList = true;
      }
    },
    getMainPage(report) {
      report.clicked = true;
      this.$store.commit("setCurrentReportId", report.id);
      this.$store.commit("setFullName", report.full_name);
      this.$store.commit("setBreadCrumbs", report);
      this.$store.commit("setCurrentEntity", this.type);
      if(this.type=="reportTab"){
        this.fetchReportsOutList(report.id);
        this.fetchGroupIndicators(report.id);
      }else if(this.type=="documentTab"){
        this.fetchDocumentsOutList(report.id);
        this.fetchDocumentsGpList(report.id);
      }
      this.$router.push("/reports_history");
    },
  },
};
</script>

<style scoped>
.tree-item {
  margin-bottom: 2%;
  cursor: pointer;
  font-size: 14px;
  margin-left: 2%;
}
.active {
  background-color: #127CC1;
  color: white;
  display: block;
}
.tree-item:hover {
  background: rgba(0, 158, 227, 0.15);
  color: white;
}
.tree-list {
  list-style: none;
}

.tree-report {
  margin-left: 2%;
  margin-bottom: 2%;
  margin-top: 2%;
  padding: 2%;
}
.tree-report:hover {
  background: rgba(0, 158, 227, 0.15);
  color: white;
}
.parent {
  width: 100%;
  height: 100%;
  padding: 1%;
  display: flex;
  align-items: center;
}
.parent:hover {
  background: #127CC1;
  color: white;
  cursor: pointer;
}
.arrow {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: 8px;
  border: solid white;
  border-width: 0 1px 1px 0;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
  color: white;
}
.arrow-down {
  transform: rotate(45deg);
  color: black;
}
.parent__short__name {
  width: 98%;
}
.tree-list-container{
  margin-left: 2%;
}
.report-list{
  margin-left: 2%;
}
.report-list .arrow{
  display: none;
}
</style>