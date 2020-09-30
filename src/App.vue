<template>
  <div id="app" class="dashboard-main-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
    <vue-progress-bar></vue-progress-bar>
    <span v-if="isLoggedIn">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div class="dashboard-wrapper">
        <router-view />
        <Footer></Footer>
      </div>
    </span>
    <span v-else>
      <Login></Login>
    </span>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import Login from "@/components/Login.vue";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Sidebar,
    Login,
    Loading,
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isLoading: function() {
      return this.$store.getters.loading;
    },
  },
  created: function() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  },
};
</script>

<style></style>
