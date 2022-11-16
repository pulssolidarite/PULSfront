<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <h2 class="pageheader-title">Jeu</h2>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link to="/" class="breadcrumb-link"
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
                  <li v-if="game" class="breadcrumb-item active" aria-current="page">
                    {{ game.name }}
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

      <div class="row" v-if="game">
        <!-- ============================================================== -->
        <!-- profile -->
        <!-- ============================================================== -->
        <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
          <!-- ============================================================== -->
          <!-- card profile -->
          <!-- ============================================================== -->
          <div class="card">
            <div class="card-body">
              <div class="user-avatar text-center d-block">
                <img
                  :src="game.logo"
                  :alt="game.name"
                  height="100"
                  style="width: 100%; object-fit: contain;"
                />
              </div>
              <div class="text-center">
                <h2 class="font-24 mb-0">{{ game.name }}</h2>
                <p>
                  <a :href="game.link">{{ game.link }}</a>
                </p>
              </div>
              <div class="text-center">
                <span class="text-danger" v-if="game.is_archived"
                  >Archivé</span
                >
              </div>
            </div>

            <div class="card-body border-top">
              <h3 class="font-16">Informations</h3>
              <div class="">
                <ul class="list-unstyled mb-0">
                  <li class="mb-2">
                    Type de jeu : {{ game.type }}
                  </li>
                  <li class="mb-2">
                    Nombre de joueurs : {{ game.nb_players }}
                  </li>
                  <li class="mb-2">
                    <p>{{ game.description }}</p>
                  </li>
                  <li v-if="game.website" class="mb-0">
                    <a
                      :href="game.website"
                      target="_blank">
                      Site Internet
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
          <div class="influence-profile-content pills-regular">
            <ul
              v-if="isAdmin"
              class="nav nav-pills mb-3 nav-justified"
              id="pills-tab"
              role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-stats-tab"
                  data-toggle="pill"
                  href="#pills-stats"
                  role="tab"
                  aria-controls="pills-stats"
                  aria-selected="true"
                  >Statistiques</a
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="'/games/' + game.id + '/edit'"
                  class="nav-link text-warning"
                  id="pills-review-tab"
                  >Editer</router-link
                >
              </li>
              <li class="nav-item">
                <a
                  href=""
                  class="nav-link text-danger"
                  @click.prevent="deleteGame(game.id)"
                  id="pills-review-tab"
                  >Archiver</a
                >
              </li>
            </ul>
            <div class="row">
              <div class="col">
                <div class="card">
                  <h5 class="card-header">Vidéo YouTube</h5>
                  <div class="card-body p-0">
                    <youtube
                      :video-id="game.video"
                      class="w-100"
                    ></youtube>
                  </div>
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
  name: "ShowGame",
  data: function() {
    return {
      game: null,
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
      page: 1,
      perPage: 9,
      pages: [],
    };
  },
  computed: {
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    isCustomer: function() {
      return this.$store.getters.isCustomer;
    },
  },
  mounted: function() {
    this.getGame();
  },
  methods: {
    deleteGame: function(id) {
      this.$http.delete("/games/" + id + "/").then(() => {
        this.$router.push("/games");
      });
    },
    getGame: function() {
      this.$http
        .get("games/" + this.$route.params.id + "/")
        .then((resp) => {
          this.game = resp.data;
        });
    },
  },
};

</script>
