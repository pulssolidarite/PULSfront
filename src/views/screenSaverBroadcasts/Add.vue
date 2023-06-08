<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Diffusion d'écran de veille
              </h2>
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
                    class="mx-1" />
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'screensaverMedias' }" class="breadcrumb-link">
                      Ecran de veille
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">
                    Créer une diffusion
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      <Alert
        v-if="errors.visible"
        :type="errors.type"
        :message="errors.message"
        @dismiss="errors.visible = false" />

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">
                Créer une diffusion
              </h5>
            </div>

            <div class="card-body">
              <h4 class="mb-0">
                Choisir un terminal
              </h4>
              <p class="">
                Veuillez choisir le terminal sur lequel vous souhaitez diffuser l'écran de veille.
              </p>
              <select v-model="choosenTerminal" class="custom-select mb-2">
                <option
                  v-for="terminal in terminals"
                  :key="terminal.id"
                  :value="terminal">
                  {{ terminal.name }}
                </option>
              </select>

              <h4 class="mb-0">
                Choisir un média
              </h4>
              <p class="">
                Veuillez choisir le média à diffuser.
              </p>
              <select v-model="choosenMedia" class="custom-select mb-2">
                <option
                  v-for="media in medias"
                  :key="media.id"
                  :value="media">
                  {{ media.title }}
                </option>
              </select>
            </div>

            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="save">
                Enregistrer la diffusion
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
  name: "AddScreenSaverBroadcast",
  data: function () {
    return {
      choosenTerminal: null,
      choosenMedia: null,
      terminals: null,
      medias: null,
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function () {
    this.getTerminals();
    this.getMedias();
  },
  methods: {
    getTerminals() {
      this.$http
        .get("terminals/")
        .then((resp) => {
          this.terminals = resp.data;
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de charger la liste des terminaux.",
          };
        });
    },
    getMedias() {
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
    save: function () {

      if(!this.choosenTerminal) {
        this.$toasted.global.error({
          message: "Veuillez sélectionner un terminal.",
        });
        return;
      }

      if(!this.choosenMedia) {
        this.$toasted.global.error({
          message: "Veuillez sélectionner un média.",
        });
        return;
      }

      let form = new FormData();
      form.append("terminal_id", this.choosenTerminal.id);
      form.append("media_id", this.choosenMedia.id);
         
      this.$http
        .post("screensaver-broadcasts/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          this.broadcast = resp.data;
          this.$router.push({ name: "screensaverBroadcasts"});
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible d'ajouter cette diffusion.",
          });
          throw err;
        });
    },
  },
};
</script>
