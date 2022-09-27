<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">

      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Ecran de veille</h2>
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
                    <router-link :to="{ name: 'screensaverMedias' }" class="breadcrumb-link"
                      >Ecran de veille</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item" aria-current="page">
                    <router-link :to="{ name: 'screensaverMedias' }" class="breadcrumb-link">{{
                      media.title
                    }}</router-link>
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

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">

            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Modifier un média</h5>
            </div>

            <div class="card-body">

              <h4 class="mb-0">Informations générales</h4>
              <p>Les informations générales sur le nouveau média.</p>

              <form>

                <div class="row">
                  <div class="form-group col">
                    <label for="name">Titre du média</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="titleHelp"
                      v-model="media.title"
                    />
                    <small id="titleHelp" class="form-text text-muted">
                      Donnez un nom cohérent au média.
                    </small>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col">
                    <label for="name">Id de la vidéo Youtube</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="idHelp"
                      v-model="media.youtube_video_id" />
                    <small id="idHelp" class="form-text text-muted">
                      N'insérez que l'id, pas le lien entier. L'id de la vidéo Youtube peut être trouvé dans l'url de la vidéo après 'v='.
                    </small>
                  </div>
                </div>

              </form>

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
  name: "EditScreenSaverMedia",
  data: function() {
    return {
      media: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.fetchMedia();
  },
  methods: {
    fetchMedia() {
      let loader = this.$loading.show();

      this.$http
        .get("screensaver-medias/" + this.$route.params.id + "/")
        .then((resp) => {
          this.media = resp.data;
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de récupérer le média.",
          });
          throw err;
        })
        .finally(() => {
          loader.hide();
        });
    },
    edit: function() {

      if (!this.media) {
        this.$toasted.global.error({
          message: "Erreur.",
        });
        return;
      }

      if(!this.media.title || this.media.title.length <=0) {
        this.$toasted.global.error({
          message: "Veuillez spécifier un titre.",
        });
        return;
      }

      if(!this.media.youtube_video_id || this.media.youtube_video_id.length <=0) {
        this.$toasted.global.error({
          message: "Veuillez spécifier une vidéo Youtube.",
        });
        return;
      }

      if(!this.media.scope || this.media.scope.length <=0) {
        this.$toasted.global.error({
          message: "Erreur. Portée non spécifiée.",
        });
        return;
      }

      let form = new FormData();
      form.append("title", this.media.title);
      form.append("scope", this.media.scope);
      form.append("youtube_video_id", this.media.youtube_video_id);

      this.$http
        .patch("screensaver-medias/" + this.$route.params.id + "/", form)
        .then((resp) => {
          this.media = resp.data;

          this.$toasted.global.success({
            message: "Le média a été mis à jour.",
          });
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de mettre à jour le média.",
          });
          throw err;
        });
    },
  },
};
</script>
