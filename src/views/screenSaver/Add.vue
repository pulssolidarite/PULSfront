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
                    <router-link :to="{ name: 'home' }" class="breadcrumb-link">Dashboard</router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'screensaver' }" class="breadcrumb-link">Ecran de veille</router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajouter un média
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
              <h5 class="mb-0">Ajouter un média</h5>
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

                <div class="row">
                  <div class="form-group col">
                    <label for="name">Portée du média</label>
                    <div class="d-flex">
                      <input
                        id="privateRadio"
                        type="radio"
                        value="private"
                        class="form-control"
                        aria-describedby="privateScopeHelp"
                        v-model="media.scope" />
                      <span
                          class="selected d-flex align-items-center justify-content-center">
                        <font-awesome-icon v-if="media.scope == 'private'" icon="check" />
                      </span>
                      <label for="privateRadio">Privée</label>
                      <small id="privateScopeHelp" class="form-text text-muted ml-2">
                        En privé, ce média sera seulement accessibles par les clients sélectionnés ci-dessous et diffusés seulement sur les Arcades For Good de ces clients.
                      </small>
                    </div>
                    <div class="d-flex">
                      <input
                        id="publicRadio"
                        type="radio"
                        value="public"
                        class="form-control"
                        aria-describedby="publicScopeHelp"
                        v-model="media.scope" />
                      <span
                          class="selected d-flex align-items-center justify-content-center">
                        <font-awesome-icon v-if="media.scope == 'public'" icon="check" />
                      </span>
                      <label for="publicRadio">Public</label>
                      <small id="publicScopeHelp" class="form-text text-muted ml-2">
                        En public, ce média sera accessible par tous les clients Arcade For Good et diffusés sur toutes les Arcades For Good en usage.
                      </small>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col">
                    <label for="name">Clients</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="customerHelp"
                      v-model="media.customers" />
                    <small id="customerHelp" class="form-text text-muted">
                      En mode privé, ce média sera seulement accessibles par les clients sélectionnés et diffusés seulement sur les Arcades For Good de ces clients.
                    </small>
                  </div>
                </div>

              </form>

            </div>

            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="save">
                Enregistrer le média
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
  name: "AddScreenSaverMedia",
  data: function() {
    return {
      media: {
        scope: "private",
      },
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  methods: {
    save: function() {

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
        .post("screensaver-medias/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          this.media = resp.data;
          this.$router.push({ name: 'screensaver'});
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible d'ajouter ce jeu.",
          });
          throw err;
        });
    },
  },
};
</script>
