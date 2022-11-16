<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Cores</h2>
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
                    <router-link to="/cores" class="breadcrumb-link"
                      >Cores</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajouter un core
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
              <h5 class="mb-0">Ajouter un core</h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">Informations générales</h4>
              <p>Les informations générales sur le nouveau core.</p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Nom du core</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp"
                      v-model="core.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Nom du fichier</label>

                    <input
                      type="text"
                      class="form-control"
                      v-model="core.path"
                    />
                  </div>
                  <div class="form-group col">
                    <label for="name">Nom du fichier Bios</label>

                    <input
                      type="text"
                      class="form-control"
                      v-model="core.bios_path"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Description</label>
                    <textarea
                      class="form-control"
                      v-model="core.description"
                      aria-describedby="descHelp"
                    ></textarea>
                    <small id="descHelp" class="form-text text-muted"
                      >Une courte description du core.</small
                    >
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">Médias</h4>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Fichier Core</label>
                    <input
                      type="file"
                      class="form-control-file"
                      aria-describedby="fileHelp"
                      ref="coreFile"
                      @change="uploadCore"
                    />
                    <small id="fileHelp" class="form-text text-muted"
                      >Le fichier associé au core.</small
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Fichier Bios</label>
                    <input
                      type="file"
                      class="form-control-file"
                      aria-describedby="fileHelp"
                      ref="biosFile"
                      @change="uploadBios"
                    />
                    <small id="fileHelp" class="form-text text-muted"
                      >Le fichier Bios associé au core.</small
                    >
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="addCore">
                Enregistrer le core
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
  name: "AddCore",
  data: function() {
    return {
      core: {},
      file: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  methods: {
    handleFileChange(e) {
      this.$refs["text-" + e.target.id].innerText = "1 fichier sélectionné";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
    },
    uploadCore: function(event) {
      let loader = this.$loading.show();

      let form_file = new FormData();
      form_file.append("file", this.$refs.coreFile.files[0]);
      this.$http
        .post("game/core/upload/", form_file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          this.core.file = resp.data;
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
    uploadBios: function(event) {
      let loader = this.$loading.show();

      let form_file = new FormData();
      form_file.append("file", this.$refs.biosFile.files[0]);
      this.$http
        .post("game/core/bios/upload/", form_file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          this.core.bios = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible d'uploader le fichier Bios.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    addCore: function() {
      if (this.core) {
        if (!this.core.file) {
          this.$toasted.global.error({
            message: "Veuillez ajouter un fichier core.",
          });
        } else if (this.core.name && this.core.path && this.core.description) {
          let form = new FormData();
          form.append("name", this.core.name);
          form.append("path", this.core.path);
          if (this.core.bios && this.core.bios.id) {
            form.append("bios", this.core.bios.id);
          }
          if (this.core.bios_path) {
            form.append("bios_path", this.core.bios_path);
          }
          form.append("file", this.core.file.id);
          form.append("description", this.core.description);
          this.$http
            .post("game/core/create/", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((resp) => {
              this.core = resp.data;
              this.$router.push("/cores");
            })
            .catch((err) => {
              this.$toasted.global.error({
                message: "Impossible d'ajouter ce core.",
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
