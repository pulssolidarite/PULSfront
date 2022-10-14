<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <h2 class="pageheader-title">Mon espace</h2>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link to="/" class="breadcrumb-link">
                      Dashboard
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Mes informations
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">Mes informations</h5>
              <div class="card-body">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Mon nom d'utilisateur</strong>
                      </td>
                      <td>
                        {{ currentUser.username }}
                      </td>
                    </tr>
                      <tr>
                      <td>
                        <strong>Mon email</strong>
                      </td>
                      <td>
                        {{ currentUser.email }}
                      </td>
                    </tr>
                      <tr>
                      <td>
                        <strong>Mon mot de passe</strong>
                      </td>
                      <td>
                      </td>
                    </tr>
                      <tr>
                      <td>
                        <strong>Mon entreprise</strong>
                      </td>
                      <td>
                        {{ currentUser.customer.company }}
                      </td>
                    </tr>
                      <tr>
                      <td>
                        <strong>Mon représentant</strong>
                      </td>
                      <td>
                        {{ currentUser.customer.representative }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card">
              <h5 class="card-header">Mon logo</h5>
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="form-group col">
                      <div>
                        <img
                          :src="currentUser.customer.logo"
                          width="200"
                          height="200"
                          style="object-fit: contain;"
                          class="rounded border mx-auto my-3 d-block" />
                        <div class="upload-btn-wrapper w-100 text-center ">
                          <button
                            type="button"
                            class="btn btn-outline-danger btn-sm"
                            ref="text-logo">
                            Ajouter une photo
                          </button>
                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            ref="logo"
                            required="required"
                            @change="editLogo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="card">
              <h5 class="card-header">Mes permissions</h5>
              <div class="card-body">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Contenu à la une</strong><br>
                        <small>Pouvoir modifier le contenu à la une sur l'ensemble de mes Arcades For Good</small>
                      </td>
                      <td>
                        <span
                          v-if="currentUser.customer.can_edit_featured_content"
                          class="badge-dot badge-success" />
                        <span
                          v-else
                          class="badge-dot badge-light" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Formule de don</strong><br>
                        <small>Pouvoir modifier la formule de don sur chacune de mes Arcades For Good</small>
                      </td>
                      <td>
                        <span
                          v-if="currentUser.customer.can_edit_donation_formula"
                          class="badge-dot badge-success" />
                        <span
                          v-else
                          class="badge-dot badge-light" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Montant des dons</strong><br>
                        <small>Pouvoir modifier le montant minimum et maximum sur chacune de mes Arcades For Good</small>
                      </td>
                      <td>
                        <span
                          v-if="currentUser.customer.can_edit_donation_amount"
                          class="badge-dot badge-success" />
                        <span
                          v-else
                          class="badge-dot badge-light" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Diffusion des écrans de veille</strong><br>
                        <small>Pouvoir modifier les écrans de veille sur chacune de mes Arcades For Good</small>
                      </td>
                      <td>
                        <span
                          v-if="currentUser.customer.can_edit_screensaver_broadcasts"
                          class="badge-dot badge-success" />
                        <span
                          v-else
                          class="badge-dot badge-light" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Informations sur les joueurs</strong><br>
                        <small>Pouvoir consulter les informations sur les joueurs de mes Arcades For Good</small>
                      </td>
                      <td>
                        <span
                          v-if="currentUser.customer.can_see_donators"
                          class="badge-dot badge-success" />
                        <span
                          v-else
                          class="badge-dot badge-light" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ShowCustomerSpace",
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    editLogo: function(e) {
      if (this.currentUser.customer) {
        let loader = this.$loading.show();

        this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
        this.$refs["text-" + e.target.id].classList.remove(
          "btn-outline-danger"
        );
        this.$refs["text-" + e.target.id].classList.add("btn-success");
        let form = new FormData();
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .patch("customer/" + this.currentUser.customer.id + '/', form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            
          })
          .finally(() => {
            loader.hide();
          });
      }
    },
  },
};

</script>
