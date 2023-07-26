<template>
  <nav>
    <ul class="breadcrumb">
      <li v-for="(item, index) in $store.state.breadCrumb" :key="item.label">
        <div
          v-if="
            $store.state.breadCrumb.indexOf(item) !==
            $store.state.breadCrumb.length - 1
          "
          class="url__block"
          @click="changeRoute(item)"
        >
          {{ item.label }}
        </div>
        <div v-else class="last__link">
          {{ item.label }}
        </div>
        <span
          v-if="index < $store.state.breadCrumb.length - 1"
          class="separator"
          >/</span
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    changeRoute(item) {
      this.$router.push(item.link);
      this.$store.commit("removeBreadCrumb", item);
      x;
    },
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 2%;
}
.breadcrumb {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.breadcrumb li {
  display: flex;
  font-size: 12px;
}

.separator {
  margin: 0 0.5rem;
}
.url__block {
  cursor: pointer;
  text-decoration: underline;
}
.last__link {
  text-decoration: none;
}
</style>
