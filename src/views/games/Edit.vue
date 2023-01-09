<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Jeux
              </h2>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link
                      :to="{ name: 'home' }"
                      class="breadcrumb-link">
                      Dashboard
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item">
                    <router-link
                      to="/games"
                      class="breadcrumb-link">
                      Jeux
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item" aria-current="page">
                    <router-link :to="'/games'" class="breadcrumb-link">
                      {{
                        game.name
                      }}
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
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
        v-if="errors.visible"
        :type="errors.type"
        :message="errors.message"
        @dismiss="errors.visible = false" />

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">
                Modifier un jeu
              </h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">
                Informations générales
              </h4>
              <p>Les informations générales sur le jeu.</p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Nom du jeu</label>
                    <input
                      v-model="game.name"
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Nom du fichier (rom)</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span
                          id="basic-addon1"
                          class="input-group-text"><font-awesome-icon
                            icon="file" /></span>
                      </div>
                      <input
                        v-model="game.path"
                        type="text"
                        class="form-control">
                    </div>
                  </div>

                  <div class="form-group col">
                    <label for="file">Fichier ROM</label>
                    <v-select
                      v-model="game.core"
                      :options="cores"
                      label="name" />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Description</label>
                    <textarea
                      v-model="game.description"
                      class="form-control"
                      aria-describedby="descHelp" />
                    <small
                      id="descHelp"
                      class="form-text text-muted">Une courte description du jeu.</small>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-12 col-md-6">
                    <label for="name">Type de jeu</label>
                    <v-select v-model="game.type" :options="types" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="name">Nombre de joueurs</label>
                    <input
                      v-model="game.nb_players"
                      type="number"
                      min="0"
                      class="form-control"
                      aria-describedby="nameHelp">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <label for="name">ID de la vidéo Youtube</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            v-model="game.is_video"
                            type="checkbox"
                            aria-label="Checkbox for following text input">
                        </div>
                      </div>
                      <input
                        v-model="game.video"
                        type="text"
                        class="form-control">
                    </div>
                    <small class="form-text text-muted">
                      Sélectionner la checkbox si vous voulez activer la vidéo
                      youtube. Insérer uniquement l'ID de la vidéo, non pas le
                      lien en entier.
                    </small>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">
                Contrôles
              </h4>
              <p>
                Indiquer les touches et autres contrôles utiles lors d'une
                partie.
              </p>
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <label for="name">Joystick haut</label>
                  <input
                    v-model="game.j_up"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Joystick bas</label>
                  <input
                    v-model="game.j_down"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-12 col-md-6">
                  <label for="name">Joystick gauche</label>
                  <input
                    v-model="game.j_right"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Joystick droite</label>
                  <input
                    v-model="game.j_left"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton X</label>
                  <input
                    v-model="game.btn_x"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton Y</label>
                  <input
                    v-model="game.btn_y"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton A</label>
                  <input
                    v-model="game.btn_a"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton B</label>
                  <input
                    v-model="game.btn_b"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton L</label>
                  <input
                    v-model="game.btn_l"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton R</label>
                  <input
                    v-model="game.btn_r"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <label for="name">Bouton Start</label>
                  <input
                    v-model="game.btn_start"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
                <div class="col-12 col-md-6">
                  <label for="name">Bouton Select</label>
                  <input
                    v-model="game.btn_select"
                    type="text"
                    class="form-control"
                    aria-describedby="nameHelp">
                </div>
              </div>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="edit">
                Enregistrer les modifications
              </button>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">
                Médias
              </h4>
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
                        :href="game.file.file">Lien vers le fichier</a>
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          ref="text-romFile"
                          type="button"
                          class="btn btn-outline-danger btn-sm">
                          Ajouter un fichier ROM
                        </button>
                        <input
                          id="file"
                          ref="romFile"
                          type="file"
                          name="file"
                          required="required"
                          @change="editRom">
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
                        class="rounded border mx-auto my-3 d-block">
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          ref="text-logo"
                          type="button"
                          class="btn btn-outline-danger btn-sm">
                          Ajouter une photo
                        </button>
                        <input
                          id="logo"
                          ref="logo"
                          type="file"
                          name="logo"
                          required="required"
                          @change="editLogo">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col">
                    <label for="cover">Cover</label>
                    <div>
                      <img
                        :src="game.cover"
                        width="740"
                        height="350"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block">
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          ref="text-cover"
                          type="button"
                          class="btn btn-outline-danger btn-sm">
                          Ajouter une photo
                        </button>
                        <input
                          id="cover"
                          ref="cover"
                          type="file"
                          name="cover"
                          required="required"
                          @change="editCover">
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
  data: function () {
    return {
      game: {},
      cores: [],
      types: ["Unique", "Plateforme", "Puzzle", "Combat", "Course", "Shoot", "Sport", "Tir"],
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function () {
    this.getGame();
    this.getCores();
  },
  methods: {
    getCores: function () {
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
        .get("games/" + this.$route.params.id + "/")
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
    editRom: function (e) {
      let loader = this.$loading.show();
      this.$refs["text-romFile"].innerText = "Enregistrement...";
      this.$refs["text-romFile"].classList.remove("btn-outline-danger");
      this.$refs["text-romFile"].classList.add("btn-success");

      let form_file = new FormData();
      form_file.append("file", this.$refs.romFile.files[0]);
      this.$http
        .post("games/upload/", form_file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          this.game.file = resp.data;
          let form = new FormData();
          form.append("file", this.game.file.id);
          this.$http
            .patch("games/" + this.$route.params.id + "/", form, {
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
    editLogo: function (e) {
      if (this.game) {
        let loader = this.$loading.show();

        this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
        this.$refs["text-" + e.target.id].classList.remove(
          "btn-outline-danger",
        );
        this.$refs["text-" + e.target.id].classList.add("btn-success");
        let form = new FormData();
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .patch("games/" + this.$route.params.id + "/", form, {
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
    editCover: function (e) {
      if (this.game) {
        let loader = this.$loading.show();

        this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
        this.$refs["text-" + e.target.id].classList.remove(
          "btn-outline-danger",
        );
        this.$refs["text-" + e.target.id].classList.add("btn-success");
        let form = new FormData();
        form.append("cover", this.$refs.cover.files[0]);
        this.$http
          .patch("games/" + this.$route.params.id + "/", form, {
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
    edit: function () {
      if (this.game) {
        let form = new FormData();
        form.append("name", this.game.name);
        form.append("path", this.game.path);
        form.append("core", this.game.core.id);
        form.append("description", this.game.description);
        form.append("is_video", this.game.is_video);
        form.append("video", this.game.video);
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
        form.append("type", this.game.type);
        form.append("nb_players", this.game.nb_players);
        this.$http
          .patch("games/" + this.$route.params.id + "/", form)
          .then((resp) => {
            this.game = resp.data;
            this.$router.push("/games");
            this.$toasted.global.success({
              message: "Le jeu a été mis à jour.",
            });
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
