<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Jeux</h2>
              <router-link
                v-if="isAdmin"
                class="btn btn-primary mb-1"
                :to="{ name: 'addGame' }">
                <font-awesome-icon icon="plus" class="mr-2" />
                Ajouter un jeu
              </router-link>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'home' }" class="breadcrumb-link"
                      >Dashboard</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item">
                    <router-link to="/games" class="breadcrumb-link"
                      >Jeux</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Tous les jeux
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Alert
        :type="errors.type"
        :message="errors.message"
        v-if="errors.visible"
        @dismiss="errors.visible = false"
      />

      <div v-if="featuredGame" class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h5>Jeu à la une</h5>
                <small>Le jeu à la une sera mis en avant sur tous les terminaux.</small>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h1>{{ featuredGame.name }}</h1>
                    <p>{{ featuredGame.description }}</p>
                  </div>
                  <div class="col text-right">
                    <img
                      :src="featuredGame.logo"
                      height="100"
                      :alt="featuredGame.name">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">Jeux</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Logo</th>
                        <th class="border-0">Nom</th>
                        <th class="border-0">Description</th>
                        <th class="border-0">Terminaux associés</th>
                        <th class="border-0" style="text-align: center;">Mis en avant</th>
                        <th class="border-0"></th>
                        <th v-if="isAdmin" class="border-0"></th>
                        <th v-if="isAdmin" class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(game, index) in games" :key="index">
                        <td>{{ game.id }}</td>
                        <td>
                          <span class="text-success"
                            ><img :src="game.logo" height="30" :alt="game.name"
                          /></span>
                        </td>
                        <td>
                          {{ game.name }}
                        </td>
                        <td>{{ stripCharacters(game.description) }}</td>
                        <td>
                          {{ game.nb_terminals }} termina<span
                            v-if="game.nb_terminals > 1"
                            >ux</span
                          ><span v-else>l</span>
                        </td>
                        <td v-if="game == featuredGame" style="text-align: center;">
                          <a
                            v-if="canCurrentUserUnselectFeaturedGame"
                            href=""
                            @click.prevent="toggleFeaturedGame(game)">
                            <span class="badge-dot badge-success mr-1" />
                          </a>
                          <span v-else class="badge-dot badge-success mr-1" />
                        </td>
                        <td v-else style="text-align: center;">
                          <a
                            href=""
                            v-if="canCurrentUserSelectFeaturedGame"
                            @click.prevent="toggleFeaturedGame(game)">
                            <span class="badge-dot badge-light mr-1" />
                          </a>
                          <span v-else class="badge-dot badge-light mr-1" />
                        </td>
                        <td>
                          <router-link
                            :to="'/game/' + game.id"
                            class="text-dark"
                            ><font-awesome-icon icon="eye"
                          /></router-link>
                        </td>
                        <td v-if="isAdmin">
                          <router-link
                            :to="'/game/' + game.id + '/edit'"
                            class="text-primary"
                            ><font-awesome-icon icon="pen"
                          /></router-link>
                        </td>
                        <td v-if="isAdmin">
                          <a
                            href=""
                            @click.prevent="deleteGame(game.id)"
                            class="text-danger"
                            ><font-awesome-icon icon="trash-alt"
                          /></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllGames",
  data: function() {
    return {
      games: null,
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  computed: {
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    isCustomer: function() {
      return this.$store.getters.isCustomer;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    canCurrentUserSelectFeaturedGame() {
      if (this.isAdmin) {
        return true
      }
      const customer = this.currentUser.customer;
      if (customer) {
        return customer.can_edit_featured_content;
      }
      return false;
    },
    canCurrentUserUnselectFeaturedGame() {
      if (this.isAdmin) {
        return true
      }
      const customer = this.currentUser.customer;
      if (customer) {
        return customer.can_edit_featured_content && customer.featured_game != null;
      }
      return false;
    },
    featuredGame() {
      if (!this.games) {
        return null;
      }

      const currentUser = this.$store.getters.currentUser;
      const featuredGameIdForCustomer = currentUser.customer?.featured_game;

      if (featuredGameIdForCustomer) {
        return this.games.find(game => game.id == featuredGameIdForCustomer);
      }

      return this.games.find(game => game.featured);
    },
  },
  mounted: function() {
    this.getGames();
  },
  methods: {
    stripCharacters: function(text) {
      if (text.length > 70) {
        return text.substring(0, 70) + "..";
      } else {
        return text;
      }
    },
    showDetail: function(id) {
      this.$router.push({
        name: "game",
        params: { id: id },
      });
    },
    editGame: function(id) {
      this.$router.push("/game/" + id + "/edit");
    },
    deleteGame: function(id) {
      this.$http.delete("/games/" + id + "/").then(() => {
        this.getGames();
      });
    },
    toggleFeaturedGame(game) {
      this.$http.post("games/" + game.id + "/toggle-featured/")
      .then((resp) => {
        this.getGames();
        if (this.isCustomer) {
          this.$store.dispatch("refreshCurrentUser");
        }
      })
      .catch((err) => {
        this.$toasted.global.error({
          message: "Impossible de mettre le jeu en avant.",
        });
        throw err;
      })
    },
    getGames: function() {
      let loader = this.$loading.show();

      this.$http
        .get("games/")
        .then((resp) => {
          this.games = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des jeux.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>
