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
              <router-link
                class="btn btn-primary mb-1"
                :to="{ name: 'addClient' }">
                <font-awesome-icon icon="plus" class="mr-2" />Ajouter un
                client
              </router-link>
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
                    Tous les clients
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

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">
                Clients
              </h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">
                          #
                        </th>
                        <th class="border-0">
                          Status
                        </th>
                        <th class="border-0">
                          Entreprise
                        </th>
                        <th class="border-0">
                          Contact
                        </th>
                        <th class="border-0">
                          Type de contrat
                        </th>
                        <th class="border-0" />
                        <th class="border-0" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(customer, index) in customers" :key="index">
                        <td>{{ customer.id }}</td>
                        <td v-if="customer.is_active">
                          <span class="text-success">Activé</span>
                        </td>
                        <td v-else>
                          <span class="text-danger">Désactivé</span>
                        </td>
                        <td>
                          {{ customer.company }}
                        </td>
                        <td>{{ customer.representative }}</td>
                        <td v-if="customer.sales_type == 'A'">
                          Achat
                        </td>
                        <td v-else>
                          Location
                        </td>
                        <td>
                          <a
                            href=""
                            class="text-primary"
                            @click.prevent="editClient(customer.id)"><font-awesome-icon
                              icon="pen" /></a>
                        </td>
                        <td>
                          <a
                            href=""
                            class="text-danger"
                            @click.prevent="deleteClient(customer.id)"><font-awesome-icon
                              icon="trash-alt" /></a>
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
  </div>
</template>

<script>
export default {
  name: "AllClients",
  data: function () {
    return {
      customers: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function () {
    this.getClients();
  },
  methods: {
    stripCharacters: function (text) {
      if (text.length > 70) {
        return text.substring(0, 70) + "..";
      } else {
        return text;
      }
    },
    editClient: function (id) {
      this.$router.push("/client/" + id + "/edit");
    },
    deleteClient: function (id) {
      if (!window.confirm("Etes vous sur de vouloir supprimer ce client ?")) {
        return;
      }

      this.$http.delete("/customer/" + id + "/").then(() => {
        this.getClients();
      });
    },
    getClients: function () {
      let loader = this.$loading.show();

      this.$http
        .get("customer/")
        .then((resp) => {
          this.customers = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des clients.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>
