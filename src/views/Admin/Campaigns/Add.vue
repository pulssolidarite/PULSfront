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
                  <li class="breadcrumb-item active" aria-current="page">Ajouter une campagne</li>
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
                  <div class="form-group col">
                    <label for="name">ID de la vidéo Youtube</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="video"
                        /></span>
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
                    <small id="fileHelpId" class="form-text text-muted">
                      Logo PNG, JPEG ou SVG permettant d'identifier clairement
                      l'association.
                    </small>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="addCampaign">Enregistrer la campagne</button>
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
        donationSteps: []
      },
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
  },
  methods: {
    addCampaign: function() {
      if (this.campaign) {
        let form = new FormData();
        form.append("author", this.$store.state.currentUser.id);
        form.append("name", this.campaign.name);
        form.append("goal_amount", this.campaign.goal_amount);
        form.append("link", this.campaign.link);
        form.append("description", this.campaign.description);
        form.append("video", this.campaign.video);
        form.append("logo", this.$refs.logo.files[0]);
        form.append("donationSteps", this.campaign.donationSteps);
        this.$http
          .post("campaign/", form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(resp => {
            this.campaign = resp.data;
            
            this.$router.push("/campaign/"+resp.data.id+"/edit/");
            this.$toasted.global.success({
              message: "La campagne a été ajouté."
            });
          })
          .catch(err => {
            console.error(err.response);
            this.$toasted.global.error({
              message: "Impossible de créer une nouvelle campagne."
            });
          });
      }
    },
  }
};
</script>
