<template>
  <div class="nav-left-sidebar sidebar-dark">
    <div class="menu-list">
      <nav class="navbar navbar-expand-md navbar-light">
        <a class="d-xl-none d-md-none" href="#">Dashboard</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-column">
            <li class="nav-divider">
              Menu
            </li>
            <li class="nav-item">
              <router-link exact class="nav-link first" to="/">
                <font-awesome-icon
                  icon="rocket"
                  class="mr-2"
                />Dashboard</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                to="/terminals"
                exact
                :event="''"
                class="nav-link first"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-terminals"
                aria-controls="submenu-terminals">
                <font-awesome-icon icon="user" class="mr-2" />
                <span v-if="isAdmin">Terminaux</span>
                <span v-else>Vos arcades for good</span>
              </router-link>
              <div id="submenu-terminals" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/terminals">
                      <span v-if="isAdmin">Tous les terminaux</span>
                      <span v-else>Toutes vos arcades</span>
                    </router-link>
                  </li>
                  <li class="nav-item" v-if="isAdmin">
                    <router-link class="nav-link" :to="{ name: 'addTerminal' }">
                      <span v-if="isAdmin">Ajouter un terminal</span>
                      <span v-else>Ajouter une arcade</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <router-link
                to="/campaigns"
                class="nav-link first"
                exact
                :event="''"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-campaigns"
                aria-controls="submenu-campaigns">
                <font-awesome-icon icon="file" class="mr-2" />
                <span v-if="isAdmin">Campagnes</span>
                <span v-else>Associations bénéficiaires</span>
              </router-link>
              <div id="submenu-campaigns" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/campaigns">
                      <span v-if="isAdmin">Toutes les campagnes</span>
                      <span v-else>Toutes les associations</span>
                    </router-link>
                  </li>
                  <li v-if="isAdmin" class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addCampaign' }">
                      <span v-if="isAdmin">Ajouter une campagne</span>
                      <span v-else>Ajouter une association</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <router-link
                to="/games"
                class="nav-link first"
                exact
                :event="''"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-games"
                aria-controls="submenu-games">
                <font-awesome-icon icon="gamepad" class="mr-2" />
                <span v-if="isAdmin">Jeux</span>
                <span v-else>Catalogue de jeux</span>
              </router-link>
              <div id="submenu-games" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/games">
                      Tous les jeux
                    </router-link>
                  </li>
                  <li v-if="isAdmin" class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addGame' }">
                      Ajouter un jeu
                    </router-link>
                  </li>
                  <li v-if="isAdmin" class="nav-item">
                    <router-link class="nav-link" to="/cores">Tous les cores</router-link>
                  </li>
                  <li v-if="isAdmin" class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addCore' }">Ajouter un core</router-link>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-divider">
              Gestion
            </li>

            <li v-if="isAdmin" class="nav-item">
              <router-link
                to="/clients"
                class="nav-link first"
                exact
                :event="''"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-clients"
                aria-controls="submenu-clients"
                ><font-awesome-icon icon="columns" class="mr-2" />
                Clients</router-link
              >
              <div id="submenu-clients" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/clients"
                      >Tous les clients</router-link
                    >
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addClient' }"
                      >Ajouter un client</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/UsageReport">
                Rapport d'utilisation
              </router-link>
            </li>

            <li v-if="isCustomer" class="nav-item">
              <router-link class="nav-link" :to="{ name: 'customer-space' }">
                Mon espace
              </router-link>
            </li>

            <!-- Screensaver -->

            <li class="nav-item">
              <router-link
                :to="{ name: 'screensaverMedias' }"
                class="nav-link first"
                exact
                :event="''"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-screensaver"
                aria-controls="submenu-screensaver">
                <span>Ecran de veille</span>
              </router-link>
              <div id="submenu-screensaver" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'screensaverMedias' }">
                      Tous les médias
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addScreensaverMedia' }">
                      Ajouter un média
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'screensaverBroadcasts' }">
                      Diffusion des médias
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addScreensaverBroadcast' }">
                      Créer une diffusion
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    isCustomer: function() {
      return this.$store.getters.isCustomer;
    },
  },
};
</script>
