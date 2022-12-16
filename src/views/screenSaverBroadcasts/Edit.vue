<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">

      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Diffusion d'écran de veille</h2>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'home' }" class="breadcrumb-link">
                      Dashboard
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'screensaverMedias' }" class="breadcrumb-link">Ecran de veille</router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item" aria-current="page">
                    <router-link v-if="broadcast" :to="{ name: 'screensaverBroadcasts' }" class="breadcrumb-link">
                      {{ broadcast.media.title }} sur {{ broadcast.terminal.name }}
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Modifier
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

      <div class="row" v-if="broadcast">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">

            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Modifier une diffusion</h5>
            </div>

            <div class="card-body">

              <h4 class="mb-0">Choisir un média</h4>
              <p class="">
                Veuillez choisir le média à diffuser.
              </p>
              <select class="custom-select mb-2" v-model="selectedMediaId">
                <option
                  v-for="(media, index) in medias"
                  :value="media.id"
                  :key="index">
                  {{ media.title }}
                </option>
              </select>

            </div>

            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="edit">
                Enregistrer les modifications
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "EditScreenSaverBroadcast",
  data: function() {
    return {
      broadcast: null,
      selectedMediaId: null,
      medias: null,
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.fetchBroadcast();
    this.fetchMedias();
  },
  methods: {
    fetchBroadcast() {
      let loader = this.$loading.show();

      this.$http
        .get("screensaver-broadcasts/" + this.$route.params.id + "/")
        .then((resp) => {
          this.broadcast = resp.data;
          this.selectedMediaId = this.broadcast.media.id;
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la diffusion.",
          });
          throw err;
        })
        .finally(() => {
          loader.hide();
        });
    },
    fetchMedias() {
      this.$http
        .get("screensaver-medias/")
        .then((resp) => {
          this.medias = resp.data;
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de charger la liste des médias.",
          };
        });
    },
    edit: function() {

      if (!this.broadcast) {
        this.$toasted.global.error({
          message: "Erreur.",
        });
        return;
      }

      if(!this.selectedMediaId) {
        this.$toasted.global.error({
          message: "Veuillez spécifier un média.",
        });
        return;
      }

      let form = new FormData();
      form.append("media_id", this.selectedMediaId);

      this.$http
        .patch("screensaver-broadcasts/" + this.$route.params.id + "/", form)
        .then((resp) => {
          this.broadcast = resp.data;

          this.$toasted.global.success({
            message: "La diffusion a été mis à jour.",
          });
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de mettre à jour la diffusion.",
          });
          throw err;
        });
    },
  },
};
</script>
