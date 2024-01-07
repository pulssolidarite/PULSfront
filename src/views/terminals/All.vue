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
              <router-link
                v-if="isAdmin"
                class="btn btn-primary mb-1"
                :to="{ name: 'addTerminal' }">
                <font-awesome-icon icon="plus" class="mr-2" />
                Ajouter un terminal
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
                    Tous les terminaux
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
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="form-group col-3">
                <center><label>Actif</label></center>
                <select
                  v-model="filters.is_active"
                  class="custom-select mb-2">
                  <option :value="null">
                    Tout
                  </option>
                  <option :value="true">
                    Actifs
                  </option>
                  <option :value="false">
                    Inactifs
                  </option>
                </select>
              </div>
              <div class="form-group col-3">
                <center><label>Status</label></center>
                <select
                  class="custom-select mb-2"
                  @change="onFilterByStatusChange">
                  <option :value="null">
                    Tout
                  </option>
                  <option value="off">
                    Eteint
                  </option>
                  <option value="on">
                    Allumé
                  </option>
                  <option value="playing">
                    En jeu
                  </option>
                </select>
              </div>
              <div v-if="isAdmin" class="form-group col-3">
                <center><label>Client</label></center>
                <select
                  v-model="filters.customer_id"
                  class="custom-select mb-2">
                  <option :value="null">
                    Tout
                  </option>
                  <option
                    v-for="customer in customers"
                    :key="customer.id"
                    :value="customer.id">
                    {{ customer.company }} - {{ customer.representative }}
                  </option>
                </select>
              </div>
            </div>
            <button
              class="btn btn-primary"
              style=" background-color:black; float : right"
              @click="resetFilters">
              Effacer Tout
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table">
                <thead class="bg-light">
                  <tr class="border-0">
                    <th class="border-0">
                      #
                    </th>
                    <th class="border-0">
                      Version
                    </th>
                    <th class="border-0">
                      Actif
                    </th>
                    <th class="border-0">
                      Status
                    </th>
                    <th class="border-0">
                      Nom
                    </th>
                    <th class="border-0">
                      Client
                    </th>
                    <th class="border-0">
                      Campagnes
                    </th>
                    <th class="border-0">
                      Total dons
                    </th>
                    <th class="border-0" />
                    <th class="border-0" />
                    <th class="border-0" />
                    <th v-if="isAdmin" class="border-0" />
                    <th v-if="isAdmin" class="border-0" />
                    <th v-if="isAdmin" class="border-0" />
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(terminal, index) in terminals" :key="index">
                    <td>{{ terminal.id }}</td>
                    <td>{{ terminal.version }}</td>
                    <td>
                      <span v-if="terminal.is_active" class="text-success">Activé</span>
                      <span v-else class="text-danger">Désactivé</span>
                    </td>
                    <td>
                      <span v-if="terminal.is_playing">
                        <span class="badge-dot badge-success mr-1" />En jeu
                      </span>
                      <span v-else-if="terminal.is_on">
                        <span class="badge-dot badge-warning mr-1" />Allumé
                      </span>
                      <span v-else>
                        <span class="badge-dot badge-danger mr-1" />Eteint
                      </span>
                    </td>
                    <td>{{ terminal.name }}</td>
                    <td>
                      <router-link to="/clients">
                        {{
                          terminal.customer.company
                        }}
                      </router-link>
                    </td>
                    <td>
                      <span
                        v-for="(campaign, index2) in terminal.campaigns"
                        :key="index2"
                        class="border border-primary p-1 small rounded mr-1">
                        <router-link :to="'/campaigns/' + campaign.id">{{
                          campaign.name
                        }}
                        </router-link>
                      </span>
                    </td>
                    <td v-if="terminal.total_donations">
                      {{ terminal.total_donations }} €
                    </td>
                    <td v-else>
                      0 €
                    </td>
                    <td>
                      <router-link
                        :to="'/terminals/' + terminal.id"
                        class="text-dark">
                        <font-awesome-icon
                          icon="eye" />
                      </router-link>
                    </td>
                    <td>
                      <a
                        v-if="terminal.is_active"
                        href=""
                        class="text-success"
                        @click.prevent="deactivateTerminal(index)"><font-awesome-icon
                          icon="power-off" /></a>
                      <a
                        v-else
                        href=""
                        class="text-danger"
                        @click.prevent="activateTerminal(index)"><font-awesome-icon
                          icon="power-off" /></a>
                    </td>
                    <td>
                      <router-link
                        :to="'/terminal/' + terminal.id + '/edit'"
                        class="text-primary">
                        <font-awesome-icon
                          icon="pen" />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <a
                        href=""
                        class="text-danger"
                        @click.prevent="deleteTerminal(index)"><font-awesome-icon
                          icon="trash-alt" /></a>
                    </td>
                    <td v-if="isAdmin">
                      <a
                        href=""
                        class="text-primary"
                        :disabled="terminal.check_for_updates"
                        @click.prevent="checkForUpdates(terminal)">
                        <i v-if="terminal.check_for_updates" class="bi bi-hourglass" />
                        <i v-else class="bi bi-arrow-counterclockwise" />
                      </a>
                    </td>
                    <td v-if="isAdmin">
                      <a
                        href=""
                        :disabled="terminal.restart"
                        class="text-primary"
                        @click.prevent="restart(terminal)">
                        <span v-if="terminal.restart">En attente de redémarrage</span>
                        <span v-else>Redémarrer la borne</span>
                      </a>
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
</template>

<script>
export default {
  name: "AllTerminals",
  data: function () {
    return {
      terminals: null,
      customers: null,
      filters: {
        is_active: null,
        is_on: null,
        is_playing: null,
        customer: null,
      },
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  computed: {
    isAdmin: function () {
      return this.$store.getters.isAdmin;
    },
    isCustomer: function () {
      return this.$store.getters.isCustomer;
    },
  },
  watch: {
    filters: {
      handler() {
        this.getTerminals();
      },
      deep: true,
    },
  },
  mounted() {
    return Promise.all(
      [
        this.getTerminals(),
        this.getCustomers(),
      ],
    );
  },
  methods: {
    getTerminals() {
      let loader = this.$loading.show();

      const params = new URLSearchParams();
      for (let key in this.filters) {
        if (this.filters[key] !== null) {
          params.append(key, this.filters[key]);
        }
      }

      this.$http
        .get("terminals/?" + params.toString())
        .then((resp) => {
          this.terminals = resp.data;
        })
        .catch((error) => {
          this.$toasted.global.error({
            message:
              "Impossible de récupérer la liste des terminaux.",
          });
          throw error;
        })
        .finally(() => {
          loader.hide();
        });
    },
    getCustomers() {
      this.$http
        .get("customer/")
        .then((resp) => {
          this.customers = resp.data;
        })
        .catch((error) => {
          this.$toasted.global.error({
            message:
              "Impossible de récupérer la liste des clients.",
          });
          throw error;
        });
    },
    activateTerminal: function (index) {
      if (
        this.terminals[index].campaigns.length > 0 &&
        this.terminals[index].games.length > 0
      ) {
        this.$http
          .post("terminals/" + this.terminals[index].id + "/activate/")
          .then((resp) => {
            this.$set(this.terminals[index], "is_active", resp.data.is_active);
            this.$toasted.global.success({
              message: "La borne a bien été activé.",
            });
          })
          .catch(() => {
            this.$toasted.global.error({
              message: "Impossible d'activer la borne.",
            });
          });
      } else {
        this.$toasted.global.error({
          message: "Impossible d'activer une borne sans campagne ou sans jeu.",
        });
      }
    },
    deactivateTerminal: function (index) {
      this.$http
        .post("terminals/" + this.terminals[index].id + "/deactivate/")
        .then((resp) => {
          this.$set(this.terminals[index], "is_active", resp.data.is_active);
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de désactiver le terminal.",
          };
        });
    },
    deleteTerminal: function (index) {
      this.$http
        .post("terminals/" + this.terminals[index].id + "/archive/")
        .then(() => {
          this.$delete(this.terminals, index);
          this.$toasted.global.success({
            message: "Le terminal a été archivé.",
          });
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible d'archiver ce terminal.",
          });
        });
    },
    checkForUpdates: function (terminal) {
      this.$http
        .post("terminals/" + terminal.id + "/check_for_updates/")
        .then(() => {
          this.$set(terminal, "check_for_updates", resp.data.check_for_updates);
          this.$toasted.global.success({
            message: "Vérification des mises à jour programmée",
          });
        })
        .catch((error) => {
          this.$toasted.global.error({
            message: "Impossible de programmer la vérification des mises à jour",
          });
          throw error;
        });
    },
    restart: function (terminal) {
      this.$http
        .post("terminals/" + terminal.id + "/restart/")
        .then(() => {
          this.$set(terminal, "restart", resp.data.restart);
          this.$toasted.global.success({
            message: "Redémarrage programmé d'ici une heure",
          });
        })
        .catch((error) => {
          this.$toasted.global.error({
            message: "Impossible de programmer le redémarrage",
          });
          throw error;
        });
    },
    onFilterByStatusChange(event) {
      const state = event.target.value;
      if (state == "off") {
        this.filters = {
          ...this.filters,
          is_on: false,
          is_playing: null,
        };
      } else if (state == "on") {
        this.filters = {
          ...this.filters,
          is_on: true,
          is_playing: null,
        };
      } else if (state == "playing") {
        this.filters = {
          ...this.filters,
          is_on: null,
          is_playing: true,
        };
      } else {
        this.filters = {
          ...this.filters,
          is_on: null,
          is_playing: null,
        };
      }
    },
    resetFilters() {
      this.filters = {
        is_active: null,
        is_on: null,
        is_playing: null,
        customer_id: null,
      };
    },
  },
};
</script>
