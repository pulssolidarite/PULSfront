<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content">
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
                    <router-link to="/home" class="breadcrumb-link">Dashboard</router-link>
                  </li>
                  <font-awesome-icon icon="angle-right" size="xs" class="mx-1" />
                  <li class="breadcrumb-item">
                    <router-link to="/campaigns" class="breadcrumb-link">Campagnes</router-link>
                  </li>
                  <font-awesome-icon icon="angle-right" size="xs" class="mx-1" />
                  <li class="breadcrumb-item">
                    <router-link
                      :to="'/campaign/' + campaign.id"
                      class="breadcrumb-link"
                    >{{ campaign.name }}</router-link>
                  </li>
                  <font-awesome-icon icon="angle-right" size="xs" class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">Modifier</li>
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
              <h5 class="mb-0">Modifier une campagne</h5>
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
                    <small
                      id="nameHelp"
                      class="form-text text-muted"
                    >Donnez un nom cohérent à la campagne.</small>
                  </div>
                  <div class="form-group col-3">
                    <label for="name">Objectif de collecte</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          <font-awesome-icon icon="euro-sign" />
                        </span>
                      </div>
                      <input type="number" class="form-control" v-model="campaign.goal_amount" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Lien vers l'association</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          <font-awesome-icon icon="link" />
                        </span>
                      </div>
                      <input type="text" class="form-control" v-model="campaign.link" />
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
                    <small id="descHelp" class="form-text text-muted">
                      Une courte description de la mission de
                      l'association.
                    </small>
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
                      <input type="text" class="form-control" v-model="campaign.video" />
                    </div>
                    <small class="form-text text-muted">
                      Sélectionner la checkbox si vous voulez activer la vidéo
                      youtube. Insérer uniquement l'ID de la vidéo, non pas le
                      lien en entier.
                    </small>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <button type="button" class="btn btn-primary" @click.prevent="edit">Sauvegarder</button>
                </div>
              </form>
              <!-- <div class="card-body text-center">
                <button class="btn btn-success" @click.prevent="edit">
                  Enregistrer la campagne
                </button>
              </div>-->
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
                    <div>
                      <img
                        :src="campaign.logo"
                        width="200"
                        height="200"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block"
                      />
                      <div class="upload-btn-wrapper w-100 text-center">
                        <button
                          type="button"
                          class="btn btn-primary"
                          ref="text-logo"
                        >Changer la photo</button>
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
              <form>
                <div class="row">
                  <div class="card-body border-top">
                    <div class="col">
                      <div class="row">
                        <div class="card-body">
                          <h4 class="mb-0">Equivalences de Dons</h4>
                          <p>Ajoutez autant de pallier que vous voulez</p>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col d-inline-flex justify-content-around"
                          v-for="(step, stepIndex) in campaign.donationSteps"
                          v-bind:key="stepIndex"
                        >
                          <div>
                            <div class="form-group col border">
                              <div class="row justify-content-end">
                                <button
                                  type="button"
                                  class="close btn-close mr-2 mt-1"
                                  aria-label="Close"
                                  @click="deleteStep"
                                >
                                  <span aria-hidden="true" :id="stepIndex">&times;</span>
                                </button>
                              </div>

                              <div class="row">
                                <div class="form-group col">
                                  <div class="input-group">
                                    <label for="amount">Montant</label>
                                    <div class="input-group input-group-sm mb-3">
                                      <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroup-sizing-sm">€</span>
                                      </div>
                                      <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        ref="amount"
                                        required="required"
                                        class="form-control"
                                        v-model="step.amount"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- <div class="row">
                              <div class="form-group col">
                              <label for="photo">Image</label>
                                <img
                                  :src="campaign.donationSteps[stepIndex].photo"
                                  width="100"
                                  height="100"
                                  style="object-fit: contain;"
                                  class="rounded my-3 mx-auto d-block"
                                />
                              </div>
                              </div>-->

                              <!-- <div class="row">
                              <div class="form-group mx-auto">
                                <div class="upload-btn-wrapper">
                                  <button class="btn btn-outline-primary btn-sm" ref="text-photo">
                                      Changer de photo
                                  </button>
                                    <input
                                      type="file"
                                      :id="stepIndex"
                                      name="photo"
                                      ref="photo"
                                      required="required"
                                      @change="handleFileChange"
                                    />
                                </div>
                              </div>
                              </div>-->

                              <div class="row">
                                <div class="form-group col">
                                  <label for="text">Text</label>
                                  <textarea
                                    style="font-size: 12px;"
                                    id="text"
                                    name="text"
                                    class="mb-2 w-100 form-control"
                                    rows="4"
                                    ref="action-photo"
                                    required="required"
                                    v-model="step.text"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          class="col-1 btn btn-light fs-3 btn-close"
                          @click="addStep"
                        >
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
                    @click.prevent="editDonationSteps"
                  >Sauvegarder</button>
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
  data: function() {
    return {
      campaign: {},
      supports: [
        { key: "Vidéo", value: true },
        { key: "Photo", value: false }
      ],
      errors: {
        visible: false,
        type: "danger",
        message: ""
      }
    };
  },
  mounted: function() {
    this.getCampaign();
    // console.log(this.campaign)
  },
  methods: {
    getCampaign: function() {
      this.$http
        .get("campaign/" + this.$route.params.id + "/")
        .then(resp => {
          this.campaign = resp.data;
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    // getSteps: function(){
    //   this.$http
    //     .get("donationsteps/" + this.$route.params.id + "/")
    //     .then((resp) => {
    //       this.campaign = resp.data;
    //     })
    //     .catch((err) => {
    //       console.log(err.response);
    //     });
    // },
    handleFileChange(e) {
      // let photo = this.$refs["photo"][e.target.id].files[0]
      // console.log(this.campaign.donationSteps);
      // const btn = this.$refs["text-photo"][0]
      // // console.log(btn)
      // btn.innerText = "Enregistrement...";
      // btn.classList.remove("btn-outline-primary");
      // btn.classList.add("btn-success");
      // let form = new FormData();
      // form.append("campaign", this.campaign.id);
      // form.append("amount", this.$refs["amount"].value);
      // form.append("photo", photo);
      // form.append("text", this.$refs["action-photo"].value);
      // this.$http
      // .patch("donationstep/" + this.campaign.donationSteps[e.target.id].id + "/changephoto/", form, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      // })
      //   .then((resp) => {
      //     this.campaign = resp.data;
      //     btn.classList.remove("btn-success");
      //     btn.classList.add("btn-outline-warning");
      //     btn.innerText = "Modifier la photo";
      //     this.$toasted.global.success({
      //       message: "La photo a été sauvegardé avec succès.",
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //     this.$toasted.global.error({
      //       message: "Impossible d'uploader la photo.",
      //     });
      //   });
    },
    editLogo: function(e) {
      this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
      let form = new FormData();
      form.append("logo", this.$refs.logo.files[0]);
      this.$http
        .patch("campaign/" + this.campaign.id + "/", form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          this.campaign = resp.data;
          this.$refs["text-" + e.target.id].innerText = "Enregistré";
          this.$toasted.global.success({
            message: "La photo a été sauvegardé avec succès."
          });
        })
        .catch(err => {
          console.log(err.response);
          this.$toasted.global.error({
            message: "Impossible d'uploader la photo."
          });
        });
    },
    editDonationSteps() {
      if (!this.campaign) return;
      this.campaign.donationSteps.forEach(ds => {
        let form = new FormData();
        form.append("campaign", this.campaign.id);
        form.append("amount", ds.amount);
        // form.append("photo", ds.photo);
        form.append("text", ds.text);
        if (ds.id) {
          this.$http
          .patch("donationstep/"+ ds.id +"/", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(resp => {
            this.campaign = resp.data;
              this.$toasted.global.success({
                message: "Vos changements ont été sauvegardés."
              });
            })
            .catch(err => {
              console.log(err.response);
              this.$toasted.global.error({
                message: "Impossible de sauvegarder vos changements."
              });
            });
        }
        else{
          this.$http
          .post("donationstep/", form)
          .then(resp => {
            this.campaign = resp.data;
              this.$toasted.global.success({
                message: "Vos changements ont été sauvegardés."
              });
            })
            .catch(err => {
              console.log(err.response);
              this.$toasted.global.error({
                message: "Impossible de sauvegarder vos changements."
              });
            });
          }
        });
      
    },
    edit: function() {
      if (this.campaign) {
        let form = new FormData();
        form.append("author", this.$store.state.currentUser.id);
        form.append("name", this.campaign.name);
        form.append("goal_amount", this.campaign.goal_amount);
        form.append("link", this.campaign.link);
        form.append("description", this.campaign.description);
        form.append("is_video", this.campaign.is_video);
        form.append("video", this.campaign.video);
        // form.append("text1", this.campaign.text1);
        // form.append("text5", this.campaign.text5);
        // form.append("text10", this.campaign.text10);
        // form.append("text20", this.campaign.text20);
        // form.append("text30", this.campaign.text30);
        // form.append("text50", this.campaign.text50);
        this.$http
          .patch("campaign/" + this.campaign.id + "/", form)
          .then(resp => {
            this.campaign = resp.data;
            this.$toasted.global.success({
              message: "Vos changements ont été sauvegardés."
            });
          })
          .catch(err => {
            console.log(err.response);
            this.$toasted.global.error({
              message: "Impossible de sauvegarder vos changements."
            });
          });
      }
    },
    addStep: function() {
      // console.log("addStep()");
      this.campaign.donationSteps.push({
        id: 0,
        amount: 0,
        text: "",
        photo: "",
        campaign: this.campaign.id
      });
      // console.log(this.campaign.donationSteps)
    },
    deleteStep: function(e) {
      // console.log("deleteStep()");
      if (this.campaign.donationSteps.length > 1) {
        let step = this.campaign.donationSteps[e.target.id];
        // console.log(step);

        this.$http
          .post("donationstep/" + step.id + "/delete/")
          .then(resp => {
            this.campaign.donationSteps.splice(e.target.id, 1);
          })
          .catch(err => {
            // console.log(err.response);
            this.$toasted.global.error({
              message: err.message
            });
          });
      } else {
        this.$toasted.global.error({
          message: "Il faut au moins une équivalence."
        });
      }
    }
  }
};
</script>
