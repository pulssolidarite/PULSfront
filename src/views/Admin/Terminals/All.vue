<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Terminaux</h2>
              <router-link
                class="btn btn-primary mb-1"
                :to="{ name: 'addTerminal' }"
                ><font-awesome-icon icon="plus" class="mr-2" />Ajouter un
                terminal</router-link
              >
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
                    Tous les terminaux
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

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">Terminaux</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Actif</th>
                        <th class="border-0">Status</th>
                        <th class="border-0">Nom</th>
                        <th class="border-0">Client</th>
                        <th class="border-0">Campagnes</th>
                        <th class="border-0">Total dons</th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(terminal, index) in terminals" :key="index">
                        <td>{{ terminal.id }}</td>
                        <td>
                          <span v-if="terminal.is_active" class="text-success"
                            >Activé</span
                          >
                          <span v-else class="text-danger">Désactivé</span>
                        </td>
                        <td>
                          <span v-if="terminal.is_on & terminal.is_playing"
                            ><span class="badge-dot badge-success mr-1"></span
                            >En jeu</span
                          >
                          <span v-if="terminal.is_on & !terminal.is_playing"
                            ><span class="badge-dot badge-warning mr-1"></span
                            >Allumé</span
                          >
                          <span v-else
                            ><span class="badge-dot badge-danger mr-1"></span
                            >Eteint</span
                          >
                        </td>
                        <td>{{ terminal.name }}</td>
                        <td>
                          <router-link to="/clients">{{
                            terminal.owner.customer.company
                          }}</router-link>
                        </td>
                        <td>
                          <span
                            v-for="(campaign, index) in terminal.campaigns"
                            :key="index"
                            class="border border-primary p-1 small rounded mr-1"
                            ><router-link :to="'/campaigns/' + campaign.id">{{
                              campaign.name
                            }}</router-link></span
                          >
                        </td>
                        <td v-if="terminal.total_donations">
                          {{ terminal.total_donations }} €
                        </td>
                        <td v-else>0 €</td>
                        <td>
                          <router-link
                            :to="'/terminals/' + terminal.id"
                            class="text-dark"
                            ><font-awesome-icon icon="eye"
                          /></router-link>
                        </td>
                        <td>
                          <a
                            href=""
                            v-if="terminal.is_active"
                            @click.prevent="deactivateTerminal(index)"
                            class="text-success"
                            ><font-awesome-icon icon="power-off"
                          /></a>
                          <a
                            href=""
                            v-else
                            @click.prevent="activateTerminal(index)"
                            class="text-danger"
                            ><font-awesome-icon icon="power-off"
                          /></a>
                        </td>
                        <td>
                          <router-link
                            :to="'/terminal/' + terminal.id + '/edit'"
                            class="text-primary"
                            ><font-awesome-icon icon="pen"
                          /></router-link>
                        </td>
                        <td>
                          <a
                            href=""
                            @click.prevent="deleteTerminal(index)"
                            class="text-danger"
                            ><font-awesome-icon icon="trash-alt"
                          /></a>
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
  name: "AllTerminals",
  data: function() {
    return {
      terminals: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.getTerminals();
  },
  methods: {
    getTerminals: function() {
      let loader = this.$loading.show();

      this.$http
        .get("terminal/")
        .then((resp) => {
          this.terminals = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message:
              "Impossible de récupérer la liste des terminaux. Vérifier que le serveur est opérationnelle.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    activateTerminal: function(index) {
      if (
        this.terminals[index].campaigns.length > 0 &&
        this.terminals[index].games.length > 0
      ) {
        this.$http
          .get("terminal/" + this.terminals[index].id + "/activate/")
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
    deactivateTerminal: function(index) {
      this.$http
        .get("terminal/" + this.terminals[index].id + "/deactivate/")
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
    deleteTerminal: function(index) {
      this.$http
        .get("terminal/" + this.terminals[index].id + "/archive/")
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
  },
};
</script>
