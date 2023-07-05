<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list density="compact" nav>
      
      <div class="reports__list" v-for="report in reports" :key="report.id">
        <v-list-item
          style="background-color: #417893; margin-bottom: 10px; color: white"
          @click="toggleGroupReports(report.id)"
          :title="report.report_title"
          :value="report.report_title"
          prepend-icon="mdi-folder-multiple"
        ></v-list-item>
        <div class="group__pokazateli" v-if="isOpen(report.id)">
          <div
            v-for="groupPokazatel in groupPokazateli"
            :key="groupPokazatel.id"
          >
            <v-list-item
              style="
                background-color: #f8f8f8;
                margin-bottom: 10px;
                color: black;
              "
              v-if="groupPokazatel.report === report.id"
              :title="groupPokazatel.group_title"
              :value="groupPokazatel.group_title"
              prepend-icon="mdi-folder-outline"
              @click="$emit('getGroupId', groupPokazatel.id, groupPokazatel.group_title)"
            >
            </v-list-item>
          </div>
        </div>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    reports: {
      type: Array,
      required: true,
    },
    groupPokazateli: {
      type: Array,
    },
  },
  data() {
    return {
      openGroups: [],
    };
  },
  methods: {
    toggleGroupReports(id) {
      this.$emit("reportId", id);
      if (this.isOpen(id)) {
        this.closeGroupReports(id);
      } else {
        this.changeRail();
        this.openGroupReports(id);
      }
    },
    openGroupReports(id) {
      this.openGroups.push(id);
    },
    closeGroupReports(id) {
      const index = this.openGroups.indexOf(id);
      if (index !== -1) {
        this.openGroups.splice(index, 1);
      }
    },
    isOpen(id) {
      return this.openGroups.includes(id);
    },
    changeRail() {
      this.openGroups = [];
    },
  },
};
</script>

<style scoped></style>
