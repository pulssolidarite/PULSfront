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
                class="btn btn-primary mb-1"
                :to="{ name: 'addGame' }"
                ><font-awesome-icon icon="plus" class="mr-2" />Ajouter un
                jeu</router-link
              >
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link to="/home" class="breadcrumb-link"
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
                        <th class="border-0">Dons collectés</th>
                        <th class="border-0">Terminaux associés</th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
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
                        <td v-if="game.total_donations">
                          {{ game.total_donations }} €
                        </td>
                        <td v-else>0 €</td>
                        <td>
                          {{ game.nb_terminals }} termina<span
                            v-if="game.nb_terminals > 1"
                            >ux</span
                          ><span v-else>l</span>
                        </td>
                        <td>
                          <router-link
                            :to="'/game/' + game.id + '/edit'"
                            class="text-primary"
                            ><font-awesome-icon icon="pen"
                          /></router-link>
                        </td>
                        <td>
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
      games: {},
      errors: {
        visible: false,
        type: "danger",
        message: ""
      }
    };
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
        params: { id: id }
      });
    },
    editGame: function(id) {
      this.$router.push("/game/" + id + "/edit");
    },
    deleteGame: function(id) {
      this.$http.delete("/game/" + id + "/").then(() => {
        this.getGames();
      });
    },
    getGames: function() {
      this.$http.get("game/").then(resp => {
        this.games = resp.data;
      });
    }
  }
};
</script>
