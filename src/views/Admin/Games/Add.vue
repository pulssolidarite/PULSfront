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
                  <div class="form-group col">
                    <label for="name">Chemin du fichier (rom)</label>
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
              </form>
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
      errors: {
        visible: false,
        type: "danger",
        message: ""
      }
    };
  },
  mounted: function() {},
  methods: {
    handleFileChange(e) {
      this.$refs["text-" + e.target.id].innerText = "1 fichier sélectionné";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
    },
    addGame: function() {
      if (this.game) {
        let form = new FormData();
        form.append("name", this.game.name);
        form.append("path", this.game.path);
        form.append("description", this.game.description);
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .post("game/", form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(resp => {
            this.game = resp.data;
            this.$router.push("/games");
          })
          .catch(() => {
            this.errors = {
              visible: true,
              type: "danger",
              message: "Impossible de créer un nouveau jeu."
            };
          });
      }
    }
  }
};
</script>
