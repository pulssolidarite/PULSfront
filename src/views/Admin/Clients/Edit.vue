<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Terminaux</h2>
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
                    <router-link to="/terminals" class="breadcrumb-link"
                      >Terminaux</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
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
              <h5 class="mb-0">Modifier un client</h5>
            </div>
            <div class="card-body" v-if="customer.company">
              <h4 class="mb-0">Nouveau client</h4>
              <p>Le compte lié au nouveau terminal.</p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="company" class="col-form-label"
                      >Nom de l'entreprise</label
                    >
                    <input
                      v-model="customer.company"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group col">
                    <label for="inputEmail" class="col-form-label"
                      >Contact au sein de l'entreprise</label
                    >
                    <input
                      type="email"
                      class="form-control"
                      placeholder="name@example.com"
                      v-model="customer.representative"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-12">
                    <label for="sales_type">Type de vente</label>
                    <select class="custom-select" v-model="customer.sales_type">
                      <option value="A" :selected="customer.sales_type == 'A'"
                        >Achat</option
                      >
                      <option value="S" :selected="customer.sales_type == 'S'"
                        >Abonnement</option
                      >
                      <option value="L" :selected="customer.sales_type == 'L'"
                        >Location</option
                      >
                    </select>
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
                        :src="customer.logo"
                        width="200"
                        height="200"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block"
                      />
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          ref="text-logo"
                        >
                          Ajouter une photo
                        </button>
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
  data: function() {
    return {
      customer: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.getCustomer();
  },
  methods: {
    getCustomer: function() {
      this.$http.get("customer/" + this.$route.params.id + "/").then((resp) => {
        this.customer = resp.data;
      });
    },
    editLogo: function(e) {
      if (this.customer) {
        let loader = this.$loading.show();

        this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
        this.$refs["text-" + e.target.id].classList.remove(
          "btn-outline-danger"
        );
        this.$refs["text-" + e.target.id].classList.add("btn-success");
        let form = new FormData();
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .patch("customer/" + this.$route.params.id + '/', form, {
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
    editClient: function() {
      this.$http
        .put("customer/" + this.customer.id + "/", this.customer)
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
