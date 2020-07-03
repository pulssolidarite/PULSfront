<template>
  <div id="app" class="dashboard-main-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
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
    Loading
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isLoading: function() {
      return this.$store.getters.loading;
    }
  },
  mounted: function() {}
};
</script>

<style></style>
