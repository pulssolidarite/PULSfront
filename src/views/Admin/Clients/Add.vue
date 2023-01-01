<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Clients
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
                      to="/clients"
                      class="breadcrumb-link">
                      Clients
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajouter un client
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
                Ajouter un client
              </h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">
                Nouveau client
              </h4>
              <p>Le compte lié au nouveau terminal.</p>
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
            <div class="card-body">
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
  </div>
</template>

<script>

export default {
  name: "AddClient",
  data: function () {
    return {
      customer: {
        user: {},
      },
      errors: {
        visible: false,
        type: "danger",
        message: "",
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
        .catch((err) => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Erreur dans l'enregistrement du client.",
          };
          throw err;
        });
    },
  },
};
</script>
