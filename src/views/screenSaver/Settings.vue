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

      Settings

    </div>
  </div>
</template>

<script>
export default {
  name: "ScreenSaverSettings",
  data: function() {
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
    editCover: function(e) {
      if (this.game) {
        let loader = this.$loading.show();

        this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
        this.$refs["text-" + e.target.id].classList.remove(
          "btn-outline-danger"
        );
        this.$refs["text-" + e.target.id].classList.add("btn-success");
        let form = new FormData();
        form.append("cover", this.$refs.cover.files[0]);
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
          .patch("game/" + this.$route.params.id + "/update/", form)
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
