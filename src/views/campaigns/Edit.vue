<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Campagnes
              </h2>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'home' }" class="breadcrumb-link">
                      Dashboard
                    </router-link>
                  </li>
                  <font-awesome-icon icon="angle-right" size="xs" class="mx-1" />
                  <li class="breadcrumb-item">
                    <router-link to="/campaigns" class="breadcrumb-link">
                      Campagnes
                    </router-link>
                  </li>
                  <font-awesome-icon icon="angle-right" size="xs" class="mx-1" />
                  <li class="breadcrumb-item">
                    <router-link
                      :to="'/campaign/' + campaign.id"
                      class="breadcrumb-link">
                      {{ campaign.name }}
                    </router-link>
                  </li>
                  <font-awesome-icon icon="angle-right" size="xs" class="mx-1" />
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
            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">
                Modifier une campagne
              </h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">
                Informations générales
              </h4>
              <p>Les informations générales de la nouvelle campagne.</p>
              <form>
                <div class="row">
                  <div class="form-group col-9">
                    <label for="name">Nom de la campagne</label>
                    <input
                      v-model="campaign.name"
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp">
                    <small
                      id="nameHelp"
                      class="form-text text-muted">Donnez un nom cohérent à la campagne.</small>
                  </div>
                  <div class="form-group col-3">
                    <label for="name">Objectif de collecte</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span id="basic-addon1" class="input-group-text">
                          <font-awesome-icon icon="euro-sign" />
                        </span>
                      </div>
                      <input v-model="campaign.goal_amount" type="number" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Lien vers l'association</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span id="basic-addon1" class="input-group-text">
                          <font-awesome-icon icon="link" />
                        </span>
                      </div>
                      <input v-model="campaign.link" type="text" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Description</label>
                    <textarea
                      v-model="campaign.description"
                      class="form-control"
                      aria-describedby="descHelp" />
                    <small id="descHelp" class="form-text text-muted">
                      Une courte description de la mission de
                      l'association.
                    </small>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">ID de la vidéo Youtube</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            v-model="campaign.is_video"
                            type="checkbox"
                            aria-label="Activer la vidéo Youtube">
                        </div>
                      </div>
                      <input
                        v-model="campaign.video"
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
                <div class="row justify-content-center">
                  <button type="button" class="btn btn-primary" @click.prevent="edit">
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">
                Médias
              </h4>
              <i>
                Il est important de compresser les images au maximum avant de
                les uploader. taille conseillée : 500x500
              </i>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="logo">Logo</label>
                    <div>
                      <img
                        :src="campaign.logo"
                        width="200"
                        height="200"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block">
                      <div class="upload-btn-wrapper w-100 text-center">
                        <button
                          ref="text-logo"
                          type="button"
                          class="btn btn-primary">
                          Changer la photo
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
                    <label for="squared_image">Image carré</label>
                    <div>
                      <img
                        :src="campaign.squared_image"
                        width="200"
                        height="200"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block">
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          ref="text-squared_image"
                          type="button"
                          class="btn btn-outline-danger btn-sm">
                          Ajouter une photo
                        </button>
                        <input
                          id="squared_image"
                          ref="squared_image"
                          type="file"
                          name="squared_image"
                          required="required"
                          @change="editSquaredImage">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="cover">Cover</label>
                    <div>
                      <img
                        :src="campaign.cover"
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
                <div class="row">
                  <div class="card-body border-top">
                    <div class="col">
                      <div class="row">
                        <div class="card-body">
                          <h4 class="mb-0">
                            Equivalences de Dons
                          </h4>
                          <p>Ajoutez autant de pallier que vous voulez</p>
                          <i>taille conseillée : 300x150</i>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          v-for="(step, stepIndex) in campaign.donationSteps"
                          :key="stepIndex"
                          class="col d-inline-flex justify-content-around">
                          <div>
                            <div class="form-group col border">
                              <div class="row justify-content-end">
                                <button
                                  type="button"
                                  class="close btn-close mr-2 mt-1"
                                  aria-label="Close"
                                  @click="deleteStep">
                                  <span :id="stepIndex" aria-hidden="true">&times;</span>
                                </button>
                              </div>

                              <div class="row">
                                <div class="form-group col">
                                  <div class="input-group">
                                    <label for="amount">Montant</label>
                                    <div class="input-group input-group-sm mb-3">
                                      <div class="input-group-prepend">
                                        <span id="inputGroup-sizing-sm" class="input-group-text">€</span>
                                      </div>
                                      <input
                                        id="amount"
                                        ref="amount"
                                        v-model="campaign.donationSteps[stepIndex].amount"
                                        type="number"
                                        name="amount"
                                        class="form-control">
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <div class="form-group col">
                                  <label for="image">Image</label>
                                  <img
                                    :src="campaign.donationSteps[stepIndex].image"
                                    width="200"
                                    height="200"
                                    style="object-fit: contain;"
                                    class="rounded my-3 mx-auto d-block">
                                </div>
                              </div>

                              <div class="row">
                                <div class="form-group mx-auto">
                                  <div class="upload-btn-wrapper">
                                    <button
                                      ref="text-image"
                                      class="btn btn-outline-primary btn-sm">
                                      Changer d'image
                                    </button>
                                    <input
                                      :id="stepIndex"
                                      ref="image"
                                      type="file"
                                      name="image"
                                      @change="handleFileChange">
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <div class="form-group col">
                                  <label for="text">Text</label>
                                  <textarea
                                    id="text"
                                    v-model="step.text"
                                    style="font-size: 12px;"
                                    name="text"
                                    class="mb-2 w-100 form-control"
                                    rows="4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          class="col-1 btn btn-light fs-3 btn-close"
                          @click="addStep">
                          <h2>+</h2>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="editDonationSteps">
                    Sauvegarder
                  </button>
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
  name: "EditCampaign",
  data: function () {
    return {
      campaign: {},
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
  mounted: function () {
    this.getCampaign();
  },
  methods: {
    getCampaign: function () {
      this.$http
        .get("campaign/" + this.$route.params.id + "/")
        .then(resp => {
          this.campaign = resp.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    handleFileChange(e) {
      if (!e || !this.campaign) return;

      var step = this.$refs["image"][e.target.id];
      const stepId = this.campaign.donationSteps[e.target.id].id;

      let form = new FormData();
      form.append("image", this.$refs["image"][e.target.id].files[0]);
      form.append("campaign", this.campaign.id);
      form.append("amount", this.campaign.donationSteps[e.target.id].amount);

      this.$http
        .patch("donationstep/" + stepId + "/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(resp => {
          this.campaign.donationSteps[e.target.id].image = resp.data.image;
        })
        .catch(err => {
          console.log(err.response);
          this.$toasted.global.error({
            message: "Impossible de sauvegarder vos changements.",
          });
        });
    },
    editLogo: function (e) {
      this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
      let form = new FormData();
      form.append("logo", this.$refs.logo.files[0]);
      this.$http
        .patch("campaign/" + this.campaign.id + "/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(resp => {
          this.campaign = resp.data;
          this.$refs["text-" + e.target.id].innerText = "Enregistré";
          this.$toasted.global.success({
            message: "La photo a été sauvegardé avec succès.",
          });
        })
        .catch(err => {
          console.log(err.response);
          this.$toasted.global.error({
            message: "Impossible d'uploader la photo.",
          });
        });
    },
    editSquaredImage: function (e) {
      this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
      let form = new FormData();
      form.append("squared_image", this.$refs.squared_image.files[0]);
      this.$http
        .patch("campaign/" + this.campaign.id + "/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(resp => {
          this.campaign = resp.data;
          this.$refs["text-" + e.target.id].innerText = "Enregistré";
          this.$toasted.global.success({
            message: "La photo a été sauvegardé avec succès.",
          });
        })
        .catch(err => {
          console.log(err.response);
          this.$toasted.global.error({
            message: "Impossible d'uploader la photo.",
          });
        });
    },
    editCover: function (e) {
      this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
      let form = new FormData();
      form.append("cover", this.$refs.cover.files[0]);
      this.$http
        .patch("campaign/" + this.campaign.id + "/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(resp => {
          this.campaign = resp.data;
          this.$refs["text-" + e.target.id].innerText = "Enregistré";
          this.$toasted.global.success({
            message: "La photo a été sauvegardé avec succès.",
          });
        })
        .catch(err => {
          console.log(err.response);
          this.$toasted.global.error({
            message: "Impossible d'uploader la photo.",
          });
        });
    },
    editDonationSteps() {
      if (!this.campaign) return;
      this.campaign.donationSteps.forEach(ds => {
        if (ds.amount <= 0) {
          this.$toasted.global.error({
            message: "Montant d'équivalence invalide.",
          });
          return;
        }
        let form = new FormData();
        form.append("campaign", this.campaign.id);
        form.append("amount", ds.amount);
        form.append("text", ds.text);

        this.$http
          .patch("donationstep/" + ds.id + "/", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(resp => {
            this.$toasted.global.success({
              message: "Vos changements ont été sauvegardés.",
            });
          })
          .catch(err => {
            console.log(err.response);
            this.$toasted.global.error({
              message: "Impossible de sauvegarder vos changements.",
            });
          });
      });
    },
    edit: function () {
      if (this.campaign) {
        let form = new FormData();
        form.append("name", this.campaign.name);
        form.append("goal_amount", this.campaign.goal_amount);
        form.append("link", this.campaign.link);
        form.append("description", this.campaign.description);
        form.append("video", this.campaign.video);
        form.append("is_video", this.campaign.is_video);
        this.$http
          .patch("campaign/" + this.campaign.id + "/", form)
          .then(resp => {
            this.campaign = resp.data;
            this.$toasted.global.success({
              message: "Vos changements ont été sauvegardés.",
            });
          })
          .catch(err => {
            console.log(err.response);
            this.$toasted.global.error({
              message: "Impossible de sauvegarder vos changements.",
            });
          });
      }
    },
    addStep: function () {
      var newStep = {
        id: 0,
        amount: 1,
        text: "",
        image: "",
        campaign: this.campaign.id,
      };
      this.campaign.donationSteps.push(newStep);

      let form = new FormData();
      form.append("id", newStep.id);
      form.append("campaign", newStep.campaign);
      form.append("amount", newStep.amount);
      form.append("text", newStep.text);
      form.append("image", newStep.image);

      this.$http
        .post("donationstep/", form)
        .then(resp => {
          this.campaign.donationSteps[this.campaign.donationSteps.length - 1].id = resp.data.id;
        })
        .catch(err => {
          console.log(err.response);
          this.$toasted.global.error({
            message: "Impossible de sauvegarder vos changements.",
          });
        });
    },
    deleteStep: function (e) {
      if (this.campaign.donationSteps.length > 1) {
        let step = this.campaign.donationSteps[e.target.id];
        if (step.id != 0) {
          this.$http
            .post("donationstep/" + step.id + "/delete/")
            .then(resp => {
              this.campaign.donationSteps.splice(e.target.id, 1);
            })
            .catch(err => {
              console.log(err.response);
              this.$toasted.global.error({
                message: err.message,
              });
            });
        } else {
          this.campaign.donationSteps.splice(e.target.id, 1);
        }
      } else {
        this.$toasted.global.error({
          message: "Il faut au moins une équivalence.",
        });
      }
    },
  },
};
</script>
