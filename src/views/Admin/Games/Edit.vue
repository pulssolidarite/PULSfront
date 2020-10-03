<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Jeux</h2>
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
                  <li class="breadcrumb-item" aria-current="page">
                    <router-link :to="'/games'" class="breadcrumb-link">{{
                      game.name
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
            <div
              class="card-header d-flex align-items-center justify-content-between"
            >
              <h5 class="mb-0">Modifier un jeu</h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">Informations générales</h4>
              <p>Les informations générales sur le jeu.</p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Nom du jeu</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp"
                      v-model="game.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Nom du fichier (rom)</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="file"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="game.path"
                      />
                    </div>
                  </div>

                  <div class="form-group col">
                    <label for="file">Fichier ROM</label>
                    <v-select
                      v-model="game.core"
                      :options="cores"
                      label="name"
                    ></v-select>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Description</label>
                    <textarea
                      class="form-control"
                      v-model="game.description"
                      aria-describedby="descHelp"
                    ></textarea>
                    <small id="descHelp" class="form-text text-muted"
                      >Une courte description du jeu.</small
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <label for="name">ID de la vidéo Youtube</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="checkbox"
                            aria-label="Checkbox for following text input"
                            v-model="game.is_video"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="game.video"
                      />
                    </div>
                    <small class="form-text text-muted"
                      >Sélectionner la checkbox si vous voulez activer la vidéo
                      youtube. Insérer uniquement l'ID de la vidéo, non pas le
                      lien en entier.</small
                    >
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="edit">
                Enregistrer les modifications
              </button>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">Médias</h4>
              <p>
                Il est important de compresser les images au maximum avant de
                les uploader.
              </p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="file">Fichier ROM</label>
                    <div>
                      <a
                        v-if="game.file"
                        class="border d-flex p-2 text-center mb-3"
                        :href="game.file.file"
                        >Lien vers le fichier</a
                      >
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          ref="text-romFile"
                        >
                          Ajouter un fichier ROM
                        </button>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          ref="romFile"
                          required="required"
                          @change="editRom"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col">
                    <label for="logo">Logo</label>
                    <div>
                      <img
                        :src="game.logo"
                        width="200"
                        height="200"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block"
                      />
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          ref="text-logo"
                        >
                          Ajouter une photo
                        </button>
                        <input
                          type="file"
                          id="logo"
                          name="logo"
                          ref="logo"
                          required="required"
                          @change="editLogo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditGame",
  data: function() {
    return {
      game: {},
      cores: [],
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.getGame();
    this.getCores();
  },
  methods: {
    getCores: function() {
      let loader = this.$loading.show();

      this.$http
        .get("game/core/")
        .then((resp) => {
          this.cores = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des cores.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    getGame() {
      let loader = this.$loading.show();

      this.$http
        .get("game/" + this.$route.params.id + "/")
        .then((resp) => {
          this.game = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer le jeu.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    editRom: function(e) {
      let loader = this.$loading.show();
      this.$refs["text-romFile"].innerText = "Enregistrement...";
      this.$refs["text-romFile"].classList.remove("btn-outline-danger");
      this.$refs["text-romFile"].classList.add("btn-success");

      let form_file = new FormData();
      form_file.append("file", this.$refs.romFile.files[0]);
      this.$http
        .post("game/upload/", form_file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          this.game.file = resp.data;
          let form = new FormData();
          form.append("file", this.game.file.id);
          this.$http
            .patch("game/" + this.$route.params.id + "/update/", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((resp) => {
              this.game = resp.data;
              this.$router.push("/games");
            });
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible d'uploader le fichier.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    editLogo: function(e) {
      if (this.game) {
        let loader = this.$loading.show();

        this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
        this.$refs["text-" + e.target.id].classList.remove(
          "btn-outline-danger"
        );
        this.$refs["text-" + e.target.id].classList.add("btn-success");
        let form = new FormData();
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .patch("game/" + this.$route.params.id + "/update/", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            this.game = resp.data;
            this.$router.push("/games");
          })
          .finally(() => {
            loader.hide();
          });
      }
    },
    edit: function() {
      if (this.game) {
        let form = new FormData();
        form.append("name", this.game.name);
        form.append("path", this.game.path);
        form.append("core", this.game.core.id);
        form.append("description", this.game.description);
        form.append("is_video", this.game.is_video);
        form.append("video", this.game.video);
        this.$http
          .patch("game/" + this.$route.params.id + "/update/", form)
          .then((resp) => {
            this.game = resp.data;
            this.$router.push("/games");
          })
          .catch(() => {
            this.$toasted.global.error({
              message: "Impossible de mettre à jour le jeu.",
            });
          });
      }
    },
  },
};
</script>
