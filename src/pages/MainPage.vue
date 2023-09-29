<template>
  <div class="main__page">
    <Header />
    <div class="main__page__content">
      <NavBar />
      <div class="content" >
        <router-view />
        <div id="scene-container">
          <scene/>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar/NavBar.vue";
import Header from "@/components/Header.vue";
import scene from "./scene.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Header,
    NavBar,
  },
  methods: {
    ...mapActions({
      fetchCategories: "fetchCategories",
      fetchDocumentsCatList: "fetchDocumentsCatList",
    }),
  },
  mounted() {
    if (this.$store.state.isAuth) {
      this.fetchCategories();
      this.fetchDocumentsCatList();

    }
  },
};
</script>

<style scoped>
.main__page {
  width: 100%;
  height: 100%;
}

.main__page__content {
  width: 100%;
  min-height: 100%;
  max-height: max-content;
  display: flex;
}

.content {
  width: 80%;
}

.scene {
  width: 80%;
}
</style>
