<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Terminaux
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
                      to="/terminals"
                      class="breadcrumb-link">
                      Terminaux
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajouter un terminal
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
                Modifier un client
              </h5>
            </div>
            <div v-if="customer.company" class="card-body">
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
                      <option
                        value="A"
                        :selected="customer.sales_type == 'A'">
                        Achat
                      </option>
                      <option
                        value="S"
                        :selected="customer.sales_type == 'S'">
                        Abonnement
                      </option>
                      <option
                        value="L"
                        :selected="customer.sales_type == 'L'">
                        Location
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label class="col-form-label">Permissions</label>
                    <div class="form-check">
                      <input
                        id="canEditFeaturedContentCheckbox"
                        v-model="customer.can_edit_featured_content"
                        class="form-check-input"
                        type="checkbox"
                        value="">
                      <label class="form-check-label" for="canEditFeaturedContentCheckbox">
                        Peut sélectionner ses propres contenus à mettre en avant sur ses terminaux
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        id="canEditDonationFormulaCheckbox"
                        v-model="customer.can_edit_donation_formula"
                        class="form-check-input"
                        type="checkbox"
                        value="">
                      <label class="form-check-label" for="canEditDonationFormulaCheckbox">
                        Peut éditer la formule de don de ses terminaux
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        id="canEditScreensaverBroadcasts"
                        v-model="customer.can_edit_screensaver_broadcasts"
                        class="form-check-input"
                        type="checkbox"
                        value="">
                      <label class="form-check-label" for="canEditScreensaverBroadcasts">
                        Peut éditer les diffusions d'écrans de veille sur ses terminaux
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        id="canSeeDonators"
                        v-model="customer.can_see_donators"
                        class="form-check-input"
                        type="checkbox"
                        value="">
                      <label class="form-check-label" for="canSeeDonators">
                        Peut consulter la liste des donateurs
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        id="canEditDonationAmount"
                        v-model="customer.can_edit_donation_amount"
                        class="form-check-input"
                        type="checkbox"
                        value="">
                      <label class="form-check-label" for="canEditDonationAmount">
                        Peut éditer le montant max, min et par défaut des dons sur ses terminaux
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="editClient">
                Modifier le client
              </button>
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
                    <div>
                      <img
                        :src="customer.logo"
                        width="200"
                        height="200"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block">
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          ref="text-logo"
                          type="button"
                          class="btn btn-outline-danger btn-sm">
                          Ajouter une photo
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
  name: "EditClient",
  data: function () {
    return {
      customer: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function () {
    this.getCustomer();
  },
  methods: {
    getCustomer: function () {
      this.$http.get("customer/" + this.$route.params.id + "/").then((resp) => {
        this.customer = resp.data;
      });
    },
    editLogo: function (e) {
      if (this.customer) {
        let loader = this.$loading.show();

        this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
        this.$refs["text-" + e.target.id].classList.remove(
          "btn-outline-danger",
        );
        this.$refs["text-" + e.target.id].classList.add("btn-success");
        let form = new FormData();
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .patch("customer/" + this.$route.params.id + "/", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            this.customer = resp.data;
            this.$router.push("/clients");
          })
          .finally(() => {
            loader.hide();
          });
      }
    },
    editClient: function () {
      this.$http
        .put(
          "customer/" + this.customer.id + "/", this.customer)
        .then(() => {
          this.$router.push("/clients");
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Erreur dans l'enregistrement du client.",
          };
        });
    },
  },
};
</script>
