<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-header-title">
        Ajouter un client
      </h1>

      <Breadcrumb :links="[{ text: 'Clients', to: { name: 'clients' } }, { text: 'Ajouter un client', active: true }]" />
    </div>

    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="mb-0">
              Informations client
            </h4>
            <form>
              <div class="row">
                <div class="form-group col">
                  <label
                    for="company"
                    class="col-form-label">Nom de l'entreprise</label>
                  <input
                    v-model="customer.company"
                    type="text"
                    class="form-control">
                </div>
                <div class="form-group col">
                  <label
                    for="inputEmail"
                    class="col-form-label">Contact au sein de l'entreprise</label>
                  <input
                    v-model="customer.representative"
                    type="email"
                    class="form-control"
                    placeholder="name@example.com">
                </div>
              </div>
              <div class="row">
                <div class="form-group col-12">
                  <label for="sales_type">Type de vente</label>
                  <select v-model="customer.sales_type" class="custom-select">
                    <option value="A">
                      Achat
                    </option>
                    <option value="S">
                      Abonnement
                    </option>
                    <option value="L">
                      Location
                    </option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="card-body border-top">
            <h4 class="mb-0">
              Compte de connexion
            </h4>
            <p>Les infos pour se connecter à l'espace client.</p>
            <form>
              <div class="row">
                <div class="form-group col">
                  <label
                    for="username"
                    class="col-form-label">Nom d'utilisateur</label>
                  <input
                    id="username"
                    v-model="customer.user.username"
                    type="text"
                    class="form-control">
                </div>
                <div class="form-group col">
                  <label
                    for="password"
                    class="col-form-label">Mot de passe</label>
                  <input
                    id="password"
                    v-model="customer.user.password"
                    type="password"
                    class="form-control"
                    placeholder="**********">
                </div>
              </div>
            </form>
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
                  <label for="logo">Logo</label>
                  <input
                    ref="logo"
                    type="file"
                    class="form-control-file"
                    aria-describedby="fileHelpId"
                    name="logo">
                  <small
                    id="fileHelpId"
                    class="form-text text-muted">Logo PNG, JPEG ou SVG permettant d'identifier clairement
                    l'entreprise.</small>
                </div>
              </div>
            </form>
          </div>
          <div class="card-body text-center">
            <button class="btn btn-success" @click.prevent="addClient">
              Ajouter le client
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "AddClient",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      customer: {
        user: {},
      },
    };
  },
  methods: {
    addClient() {

      const data = {
        ...this.customer,
      };

      if (this.$refs.logo.files[0]) {
        data.logo = this.$refs.logo.files[0];
      }

      this.$http
        .post("customer/", data)
        .then(() => {
          this.$router.push("/clients");
        })
        .catch((error) => {
          this.$notifications.error("Erreur dans l'enregistrement du client.");
          throw error;
        });
    },
  },
};
</script>
