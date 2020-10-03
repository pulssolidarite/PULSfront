<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Campagnes</h2>
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
                    <router-link to="/campaigns" class="breadcrumb-link"
                      >Campagnes</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajouter une campagne
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
              <h5 class="mb-0">Ajouter une campagne</h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">Informations générales</h4>
              <p>Les informations générales de la nouvelle campagne.</p>
              <form>
                <div class="row">
                  <div class="form-group col-9">
                    <label for="name">Nom de la campagne</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp"
                      v-model="campaign.name"
                    />
                    <small id="nameHelp" class="form-text text-muted"
                      >Donnez un nom cohérent à la campagne.</small
                    >
                  </div>
                  <div class="form-group col-3">
                    <label for="name">Objectif de collecte</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="euro-sign"
                        /></span>
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        v-model="campaign.goal_amount"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Lien vers l'association</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="link"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="campaign.link"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Description</label>
                    <textarea
                      class="form-control"
                      v-model="campaign.description"
                      aria-describedby="descHelp"
                    ></textarea>
                    <small id="descHelp" class="form-text text-muted"
                      >Une courte description de la mission de
                      l'association.</small
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
                            v-model="campaign.is_video"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="campaign.video"
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
                <div class="row">
                  <div class="form-group col">
                    <label for="actions">Montants de donations</label>
                    <div class="d-flex justify-content-between">
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
                        <h3>1€</h3>
                        <textarea
                          style="font-size: 12px;"
                          id="text1"
                          name="text1"
                          class="mb-2 w-100"
                          rows="4"
                          ref="text1"
                          v-model="campaign.text1"
                        ></textarea>
                        <div class="upload-btn-wrapper">
                          <button
                            class="btn btn-outline-danger btn-sm"
                            ref="text-photo1"
                          >
                            Ajouter une photo
                          </button>
                          <input
                            type="file"
                            id="photo1"
                            name="photo1"
                            ref="photo1"
                            required="required"
                            @change="handleFileChange"
                          />
                        </div>
                      </div>
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
                        <h3>5€</h3>
                        <textarea
                          style="font-size: 12px;"
                          id="text5"
                          name="text5"
                          class="mb-2 w-100"
                          rows="4"
                          ref="action-photo5"
                          v-model="campaign.text5"
                        ></textarea>
                        <div class="upload-btn-wrapper">
                          <button
                            class="btn btn-outline-danger btn-sm"
                            ref="text-photo5"
                          >
                            Ajouter une photo
                          </button>
                          <input
                            type="file"
                            id="photo5"
                            name="photo5"
                            ref="photo5"
                            required="required"
                            @change="handleFileChange"
                          />
                        </div>
                      </div>
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
                        <h3>10€</h3>
                        <textarea
                          style="font-size: 12px;"
                          id="text10"
                          name="text10"
                          class="mb-2 w-100"
                          ref="action-photo10"
                          rows="4"
                          v-model="campaign.text10"
                        ></textarea>
                        <div class="upload-btn-wrapper">
                          <button
                            class="btn btn-outline-danger btn-sm"
                            ref="text-photo10"
                          >
                            Ajouter une photo
                          </button>
                          <input
                            type="file"
                            id="photo10"
                            name="photo10"
                            ref="photo10"
                            required="required"
                            @change="handleFileChange"
                          />
                        </div>
                      </div>
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
                        <h3>20€</h3>
                        <textarea
                          style="font-size: 12px;"
                          id="text20"
                          name="text20"
                          ref="action-photo20"
                          class="mb-2 w-100"
                          rows="4"
                          v-model="campaign.text20"
                        ></textarea>
                        <div class="upload-btn-wrapper">
                          <button
                            class="btn btn-outline-danger btn-sm"
                            ref="text-photo20"
                          >
                            Ajouter une photo
                          </button>
                          <input
                            type="file"
                            id="photo20"
                            name="photo20"
                            ref="photo20"
                            required="required"
                            @change="handleFileChange"
                          />
                        </div>
                      </div>
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
                        <h3>30€</h3>
                        <textarea
                          style="font-size: 12px;"
                          id="text30"
                          name="text30"
                          ref="action-photo30"
                          class="mb-2 w-100"
                          rows="4"
                          v-model="campaign.text30"
                        ></textarea>
                        <div class="upload-btn-wrapper">
                          <button
                            class="btn btn-outline-danger btn-sm"
                            ref="text-photo30"
                          >
                            Ajouter une photo
                          </button>
                          <input
                            type="file"
                            id="photo30"
                            name="photo30"
                            ref="photo30"
                            required="required"
                            @change="handleFileChange"
                          />
                        </div>
                      </div>
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
                        <h3>50€</h3>
                        <textarea
                          style="font-size: 12px;"
                          id="text30"
                          name="text30"
                          ref="action-photo50"
                          class="mb-2 w-100"
                          rows="4"
                          v-model="campaign.text50"
                        ></textarea>
                        <div class="upload-btn-wrapper">
                          <button
                            class="btn btn-outline-danger btn-sm"
                            ref="text-photo50"
                          >
                            Ajouter une photo
                          </button>
                          <input
                            type="file"
                            id="photo50"
                            name="photo50"
                            ref="photo50"
                            required="required"
                            @change="handleFileChange"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="addCampaign">
                Enregistrer la campagne
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
  name: "AddCampaign",
  data: function() {
    return {
      campaign: {
        is_video: true,
      },
      supports: [
        { key: "Vidéo", value: true },
        { key: "Photo", value: false },
      ],
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {},
  methods: {
    handleFileChange(e) {
      this.$refs["text-" + e.target.id].innerText = "1 fichier sélectionné";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
    },
    addCampaign: function() {
      if (this.campaign) {
        let form = new FormData();
        form.append("author", this.$store.state.currentUser.id);
        form.append("name", this.campaign.name);
        form.append("goal_amount", this.campaign.goal_amount);
        form.append("link", this.campaign.link);
        form.append("description", this.campaign.description);
        form.append("logo", this.$refs.logo.files[0]);
        form.append("is_video", this.campaign.is_video);
        form.append("video", this.campaign.video);
        form.append("photo1", this.$refs.photo1.files[0]);
        form.append("photo5", this.$refs.photo5.files[0]);
        form.append("photo10", this.$refs.photo10.files[0]);
        form.append("photo20", this.$refs.photo20.files[0]);
        form.append("photo30", this.$refs.photo30.files[0]);
        form.append("photo50", this.$refs.photo50.files[0]);
        form.append("text1", this.campaign.text1);
        form.append("text5", this.campaign.text5);
        form.append("text10", this.campaign.text10);
        form.append("text20", this.campaign.text20);
        form.append("text30", this.campaign.text30);
        form.append("text50", this.campaign.text50);
        this.$http
          .post("campaign/", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            this.campaign = resp.data;
            this.$router.push("/campaigns");
            this.$toasted.global.success({
              message: "La campagne a été ajouté.",
            });
          })
          .catch((err) => {
            console.error(err.response);
            this.$toasted.global.error({
              message: "Impossible de créer une nouvelle campagne.",
            });
          });
      }
    },
  },
};
</script>
