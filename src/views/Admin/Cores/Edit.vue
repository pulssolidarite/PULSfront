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
                  <li class="breadcrumb-item" aria-current="page">
                    <router-link :to="'/cores'" class="breadcrumb-link">{{
                      core.name
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
              <h5 class="mb-0">Modifier un core</h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">Informations générales</h4>
              <p>Les informations générales sur le core.</p>
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
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="file"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="core.path"
                      />
                    </div>
                  </div>
                  <div class="form-group col">
                    <label for="name">Nom du fichier Bios</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="file"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="core.bios_path"
                      />
                    </div>
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
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="edit">
                Enregistrer les modifications
              </button>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">Médias</h4>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="file">Fichier core</label>
                    <div>
                      <a
                        v-if="core.file"
                        class="border d-flex p-2 text-center mb-3"
                        :href="core.file.file"
                        >Lien vers le fichier</a
                      >
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          ref="text-coreFile"
                        >
                          Ajouter un fichier core
                        </button>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          ref="coreFile"
                          required="required"
                          @change="editCore"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="file">Fichier Bios</label>
                    <div>
                      <a
                        v-if="core.bios"
                        class="border d-flex p-2 text-center mb-3"
                        :href="core.bios.file"
                        >Lien vers le fichier</a
                      >
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          ref="text-biosFile"
                        >
                          Ajouter un fichier bios
                        </button>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          ref="biosFile"
                          required="required"
                          @change="editBios"
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
  name: "EditCore",
  data: function() {
    return {
      core: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.getCore();
  },
  methods: {
    getCore() {
      let loader = this.$loading.show();

      this.$http
        .get("game/core/" + this.$route.params.id + "/")
        .then((resp) => {
          this.core = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer le core.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    editCore: function(e) {
      let loader = this.$loading.show();
      this.$refs["text-coreFile"].innerText = "Enregistrement...";
      this.$refs["text-coreFile"].classList.remove("btn-outline-danger");
      this.$refs["text-coreFile"].classList.add("btn-success");

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
          let form = new FormData();
          form.append("file", this.core.file.id);
          this.$http
            .patch("game/core/" + this.$route.params.id + "/update/", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((resp) => {
              this.core = resp.data;
              this.$router.push("/cores");
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
    editBios: function(e) {
      let loader = this.$loading.show();
      this.$refs["text-biosFile"].innerText = "Enregistrement...";
      this.$refs["text-biosFile"].classList.remove("btn-outline-danger");
      this.$refs["text-biosFile"].classList.add("btn-success");

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
          let form = new FormData();
          form.append("bios", this.core.bios.id);
          this.$http
            .patch("game/core/" + this.$route.params.id + "/update/", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((resp) => {
              this.core = resp.data;
              this.$toasted.global.success({
                message: "Le fichier bios a été mis à jour.",
              });
              this.$router.push("/cores");
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
    edit: function() {
      if (this.core) {
        let form = new FormData();
        form.append("name", this.core.name);
        form.append("path", this.core.path);
        if(this.core.bios_path)
        {
          form.append("bios_path", this.core.bios_path);
        }
        form.append("description", this.core.description);
        this.$http
          .patch("game/core/" + this.$route.params.id + "/update/", form)
          .then((resp) => {
            this.core = resp.data;
            this.$toasted.global.success({
              message: "Le fichier core a été mis à jour.",
            });
            this.$router.push("/cores");
          })
          .catch(() => {
            this.$toasted.global.error({
              message: "Impossible de mettre à jour le core.",
            });
          });
      }
    },
  },
};
</script>
