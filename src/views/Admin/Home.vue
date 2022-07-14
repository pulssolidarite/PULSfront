<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <h2 class="pageheader-title">Dashboard</h2>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link to="/" class="breadcrumb-link"
                      >Dashboard</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Général
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Collecté ce mois</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1" v-if="collected > 0">{{ collected }} €</h1>
                  <h1 class="mb-1" v-else>0 €</h1>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-success font-weight-bold"
                  v-if="collected_last > 0"
                >
                  <span><font-awesome-icon icon="arrow-up" class="mr-1"/></span
                  ><span>+{{ collected_last * 100 }} %</span>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-danger font-weight-bold"
                  v-else-if="collected_last < 0"
                >
                  <span
                    ><font-awesome-icon icon="arrow-down" class="mr-1"/></span
                  ><span>{{ collected_last * 100 }} %</span>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-warning font-weight-bold"
                  v-else
                >
                  <span>+{{ collected_last }} %</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Nombre de donateurs</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ nb_donators }}</h1>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-success font-weight-bold"
                  v-if="nb_donators_last > 0"
                >
                  <span><font-awesome-icon icon="arrow-up" class="mr-1"/></span
                  ><span>+{{ nb_donators_last * 100 }} %</span>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-danger font-weight-bold"
                  v-else-if="nb_donators_last < 0"
                >
                  <span
                    ><font-awesome-icon icon="arrow-down" class="mr-1"/></span
                  ><span>{{ nb_donators_last * 100 }} %</span>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-warning font-weight-bold"
                  v-else
                >
                  <span>+{{ nb_donators_last }} %</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Nombre de terminaux</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ nb_terminals }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Temps total de jeu</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ total_gamesession }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-9 col-lg-12 col-md-6 col-sm-12 col-12">
            <div class="card">
              <h5 class="card-header">Terminaux allumés</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Status</th>
                        <th class="border-0">Nom</th>
                        <th class="border-0">Client</th>
                        <th class="border-0">Campsagnes</th>
                        <th class="border-0">Total dons</th>
                      </tr>
                    </thead>
                    <tbody v-if="terminals.length > 0">
                      <tr v-for="(terminal, index) in terminals" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          <span v-if="terminal.is_playing" class="text-success"
                            >En jeu</span
                          >
                          <span v-else class="text-warning">Allumé</span>
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
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6" class="text-center">
                          Aucun terminal allumé pour le moment.
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
  name: "Home",
  data: function() {
    return {
      terminals: {},
      collected: 0,
      nb_donators: 0,
      nb_terminals: 0,
      total_gamesession: 0,
      collected_last: 0,
      nb_donators_last: 0
    };
  },
  mounted: function() {
    this.getStats();
  },
  methods: {
    getStats: function() {
      this.$http
        .get("dashboard/")
        .then(resp => {
          this.terminals = resp.data.terminals;
          this.collected = resp.data.collected;
          this.nb_donators = resp.data.nb_donators;
          this.nb_terminals = resp.data.nb_terminals;
          this.total_gamesession = resp.data.total_gamesession;

          if ((resp.data.collected_last == 0) | !resp.data.collected_last) {
            this.collected_last = 0;
          } else {
            this.collected_last =
              (resp.data.collected - resp.data.collected_last) /
              resp.data.collected_last;
          }

          if ((resp.data.nb_donators_last == 0) | !resp.data.nb_donators_last) {
            this.nb_donators = 0;
          } else {
            this.nb_donators_last =
              (resp.data.nb_donators - resp.data.nb_donators_last) /
              resp.data.nb_donators_last;
          }
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message:
              "Impossible de récupérer les statistiques, contactez le webmaster."
          };
        });
    }
  }
};
</script>
