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
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajouter un jeu
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
              <h5 class="mb-0">Ajouter un jeu</h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">Informations générales</h4>
              <p>Les informations générales sur le nouveau jeu.</p>
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
                    <label for="name">Nom du fichier</label>

                    <input
                      type="text"
                      class="form-control"
                      v-model="game.path"
                    />
                  </div>
                  <div class="form-group col">
                    <label for="core">Core</label>
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
            <div class="card-body border-top">
              <h4 class="mb-0">Contrôles</h4>
              <p>
                Indiquer les touches et autres contrôles utiles lors d'une
                partie.
              </p>
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <label for="name">Joystick haut</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.j_up"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Joystick bas</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.j_down"
                  />
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-12 col-md-6">
                  <label for="name">Joystick gauche</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.j_right"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Joystick droite</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.j_left"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton X</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_x"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton Y</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_y"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton A</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_a"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton B</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_b"
                  />
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton L</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_l"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton R</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_r"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton Start</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_start"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton Select</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp"
                    v-model="game.btn_select"
                  />
                </div>
              </div>
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
                    <label for="description">Fichier ROM</label>
                    <input
                      type="file"
                      class="form-control-file"
                      aria-describedby="fileHelp"
                      ref="romFile"
                      @change="uploadRom"
                    />
                    <small id="fileHelp" class="form-text text-muted"
                      >Le fichier ROM associé au jeu.</small
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col">
                    <label for="logo">Logo</label>
                    <input
                      type="file"
                      class="form-control-file"
                      aria-describedby="fileHelpId"
                      name="logo"
                      ref="logo"
                    />
                    <small id="fileHelpId" class="form-text text-muted"
                      >Logo PNG, JPEG ou SVG permettant d'identifier clairement
                      l'association.</small
                    >
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="addGame">
                Enregistrer le jeu
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
  name: "AddGame",
  data: function() {
    return {
      game: {},
      file: {},
      cores: [],
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  created: function() {
    this.getCores();
  },
  methods: {
    handleFileChange(e) {
      this.$refs["text-" + e.target.id].innerText = "1 fichier sélectionné";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
    },
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
    uploadRom: function(event) {
      let loader = this.$loading.show();

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
    addGame: function() {
      if (this.game) {
        if (!this.game.file) {
          this.$toasted.global.error({
            message: "Veuillez ajouter un fichier ROM.",
          });
        } else if (this.game.name && this.game.path && this.game.description) {
          let form = new FormData();
          form.append("name", this.game.name);
          form.append("path", this.game.path);
          form.append("core", this.game.core.id);
          form.append("file", this.game.file.id);
          form.append("description", this.game.description);
          form.append("logo", this.$refs.logo.files[0]);
          form.append("is_video", this.game.is_video);
          form.append("j_up", this.game.j_up);
          form.append("j_down", this.game.j_down);
          form.append("j_right", this.game.j_right);
          form.append("j_left", this.game.j_left);
          form.append("btn_x", this.game.btn_x);
          form.append("btn_y", this.game.btn_y);
          form.append("btn_a", this.game.btn_a);
          form.append("btn_b", this.game.btn_b);
          form.append("btn_l", this.game.btn_l);
          form.append("btn_r", this.game.btn_r);
          form.append("btn_start", this.game.btn_start);
          form.append("btn_select", this.game.btn_select);
          this.$http
            .post("game/create/", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((resp) => {
              this.game = resp.data;
              this.$router.push("/games");
            })
            .catch((err) => {
              console.error(err.response);
              this.$toasted.global.error({
                message: "Impossible d'ajouter ce jeu.",
              });
            });
        } else {
          this.$toasted.global.error({ message: "Des champs sont manquants." });
        }
      }
    },
  },
};
</script>
