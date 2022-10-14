<template>
  <div class="dashboard-header">
    <nav class="navbar navbar-expand-md bg-white fixed-top">
      <router-link class="navbar-brand" to="/">
        <span v-if="isAdmin">Seth - Arcade for Good API</span>
        <span v-else-if="isCustomer">Arcade for Good - Espace client</span>
        <span v-else>Who are you ?</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto navbar-right-top">
          <li class="nav-item dropdown nav-user">
            <a
              class="nav-link nav-user-img"
              href="#"
              id="navbarDropdownMenuLink2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <span
                class="user-avatar-md rounded-circle bg-primary d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px;">
                {{ usernameInitial }}
              </span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right nav-user-dropdown"
              aria-labelledby="navbarDropdownMenuLink2">
              <div class="nav-user-info">
                <h5 class="mb-0 text-white nav-user-name">{{ username }}</h5>
              </div>
              <a class="dropdown-item" href="#"><font-awesome-icon icon="cog" class="mr-2" />Réglages</a>
              <a class="dropdown-item" href="#" @click.prevent="logout"><font-awesome-icon icon="power-off" class="mr-2"/>Déconnexion</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    isCustomer: function() {
      return this.$store.getters.isCustomer;
    },
    isTerminalOn: function() {
      return this.$store.state.currentTerminal.is_on;
    },
    username: function() {
      return this.$store.getters.username;
    },
    usernameInitial: function() {
      if (this.username && this.username.length > 0) {
        return this.username[0].toUpperCase();
      }

      return "";
    },
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
        .then((resp) => {
          this.$toasted.global.success(resp);
        })
        .catch((err) => {
          this.$toasted.global.error(err);
        });
    },
  },
};
</script>
