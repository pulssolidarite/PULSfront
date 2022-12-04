<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Rapport d'utilisation</h2>
              <li class="nav-item" style="list-style: none">
                <router-link
                  to=""
                  class="nav-link first"
                  exact
                  :event="''"
                  href=""
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-export"
                  aria-controls="submenu-export">
                  <center>
                    <button class="btn btn-primary mb-1" @click="exportCSV">
                      <font-awesome-icon icon="file" class="mr-2" />Exporter les
                      résultats
                    </button>
                  </center>
                </router-link>
              </li>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item active" aria-current="page"></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="ecommerce-widget">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="form-group col-3">
                    <center><label for="core">Campagne</label></center>
                    <select
                      class="custom-select mb-2"
                      name="fruit"
                      @change="onFilterChange"
                      v-model="filters.campaign">
                      <option :value="null">Tout</option>
                      <option
                        v-for="Compagne in campaigns"
                        :value="Compagne.id"
                        :key="Compagne.id">
                        {{ Compagne.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-3">
                    <center><label for="core">Terminal</label></center>
                    <select
                      class="custom-select mb-2"
                      @change="onFilterChange"
                      v-model="filters.terminal">
                      <option :value="null">Tout</option>
                      <option
                        v-for="terminal in terminals"
                        :value="terminal.id"
                        :key="terminal.id">
                        {{ terminal.name }}
                      </option>
                    </select>
                  </div>
                  <div v-if="isAdmin" class="form-group col-3">
                    <center><label for="core">Client</label></center>
                    <select
                      class="custom-select mb-2"
                      @change="onFilterChange"
                      v-model="filters.customer">
                      <option :value="null">Tout</option>
                      <option
                        v-for="customer in customers"
                        :value="customer.id"
                        :key="customer.id">
                        {{ customer.company }} - {{ customer.representative }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group col-3">
                    <center><label for="core">Formule de dons</label></center>
                    <select
                      class="custom-select mb-2"
                      @change="onFilterChange"
                      v-model="filters.formula">
                      <option :value="null">Tout</option>
                      <option value="Classique">Classique</option>
                      <option value="Gratuit">Gratuit</option>
                      <option value="Mécénat">Mécénat</option>
                      <option value="Partage">Partage</option>
                    </select>
                  </div>
                  <div class="form-group col-3">
                    <center><label for="core">Transaction</label></center>
                    <select
                      class="custom-select mb-2"
                      @change="onFilterChange"
                      v-model="filters.transaction"
                    >
                      <option :value="null">Tout</option>
                      <option class="text-success" value="Accepted">
                        Acceptée
                      </option>
                      <option class="text-danger" value="Refused">Refusée</option>
                      <option class="text-warning" value="Skiped">Skipe</option>
                    </select>
                  </div>
                  <div class="form-group col-3">
                    <center><label for="core">Jeu</label></center>
                    <select
                      class="custom-select mb-2"
                      @change="onFilterChange"
                      v-model="filters.game">
                      <option :value="null">Tout</option>
                      <option v-for="g in games" :value="g.id" :key="g.id">
                        {{ g.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-3">
                    <center><label for="core">Période</label></center>
                    <select
                      class="custom-select mb-2"
                      @change="onFilterChange"
                      v-model="filters.date">
                      <option :value="null">Tout</option>
                      <option value="Today">Aujourd'hui</option>
                      <option value="Yesterday">Hier</option>
                      <option value="7days">Les 7 derniers jours</option>
                      <option value="CurrentWeek">Cette semaine</option>
                      <option value="LastWeek">La semaine dernière</option>
                      <option value="CurrentMonth">Mois en cours</option>
                      <option value="LastMonth">Le mois dernier</option>
                      <option value="ThisYear">Cette année</option>
                      <option value="LastYear">L'année dernière</option>
                    </select>
                  </div>

                  <div class="form-group col-3">
                    <center><label for="core">TPE</label></center>
                    <input
                      v-model="filters.tpe"
                      type="text"
                      class="form-control"
                      @change="onFilterChange" />
                  </div>

                </div>
              </div>


              <div class="col-3">
                <div class="form-group">
                  <center><label for="core"> A partir de </label></center>
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <font-awesome-icon icon="clock" />
                      </span>
                      <datetime
                        format="DD-MM-YYYY H:i:s"
                        lang="fr"
                        @input="onFilterChange"
                        v-model="filters.start_date"
                        style="text-align: center; color: #2c3e50; font-family: Helvetica;" />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <center><label for="core"> Jusqu’à </label><br /></center>
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><font-awesome-icon icon="clock" />
                      </span>
                      <datetime
                        format="DD-MM-YYYY H:i:s"
                        @input="onFilterChange"
                        v-model="filters.end_date"
                        style="text-align: center; color: #2c3e50; font-family: Helvetica;" />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <button
              class="btn btn-primary"
              @click="resetAllFilters"
              style=" background-color:black; float : right">
              Effacer Tout
            </button>
          </div>
        </div>
        <div v-if="payments" class="row">
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ sum }} €</h1>
                </div>
                <h5 class="text-muted">Total des dons</h5>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ avg }} €</h1>
                </div>
                <h5 class="text-muted">Don moyen</h5>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ totalNumberOfPayments }}</h1>
                </div>
                <h5 class="text-muted">Nombre de parties</h5>
              </div>
            </div>
          </div>
          <div v-if="amountDonated" class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ amountDonated }} €</h1>
                </div>
                <h5 class="text-muted">Total des dons</h5>
              </div>
            </div>
          </div>
          <div v-if="amountForOwner" class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ amountForOwner }} €</h1>
                </div>
                <h5 class="text-muted">Recette personnelle</h5>
              </div>
            </div>
          </div>
          <table class="table">
            <thead class="bg-light">
              <tr class="border-0">
                <th class="border-0">#</th>
                <th class="border-0">Date</th>
                <th class="border-0">Transaction</th>
                <th class="border-0">Donateur</th>
                <th class="border-0">Campagne</th>
                <th class="border-0">Terminal</th>
                <th class="border-0">Client</th>
                <th class="border-0">TPE</th>
                <th class="border-0">Montant</th>
                <th class="border-0">Jeu</th>
                <th class="border-0">Formule des dons</th>
              </tr>
            </thead>
            <tbody v-if="payments.length > 0">
              <tr v-for="(payment, index) in payments" :key="index">
                <td>{{ payment.id }}</td>
                <td>{{ payment.date }}</td>
                <td>
                  <span
                    v-if="payment.status == 'Accepted'"
                    class="text-success"
                    >{{ payment.status }}</span
                  >
                  <span
                    v-else-if="payment.status == 'Refused'"
                    class="text-danger"
                    >{{ payment.status }}</span
                  >
                  <span v-else class="text-warning">{{
                  payment.status
                  }}</span>
                </td>
                <td>
                  <span v-if="payment.donator">
                    {{ payment.donator.email }}
                  </span>
                </td>
                <td>{{ payment.campaign.name }}</td>
                <td>{{ payment.terminal.name }}</td>
                <td>{{ payment.terminal.customer.company }}</td>
                <td>{{ payment.terminal.payment_terminal }}</td>
                <td>{{ payment.amount }} €</td>
                <td>
                  <router-link v-if="payment.game" to="/">
                    {{ payment.game.name }}
                  </router-link>
                </td>

                <td>
                  <router-link to="/">
                    {{ payment.terminal.donation_formula }}</router-link
                  >
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="13" class="text-center"></td>
              </tr>
              <tr>
                <td colspan="13" class="text-center">
                  <h5>{{  message }}</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div v-if="payments" class="d-flex align-items-center justify-content-between my-2">
          <div class="col-sm-12 col-md-5">
            <div
              class="dataTables_info"
              id="DataTables_Table_0_info"
              role="status"
              aria-live="polite">
              <div style="color: white; color: #1c7dce; display: inline">
                Afficher : &nbsp;&nbsp;
              </div>
              <strong>{{ (page-1) * limit }} à {{ (page-1) * limit + payments.length }} de {{ totalNumberOfPayments }} paiements</strong>
            </div>
          </div>
          <div class="col-sm-12 col-md-7 d-flex justify-content-end">
            <nav aria-label="Page navigation example" class="w-100">
              <ul class="pagination w-100 d-flex justify-content-end">
                <li class="page-item">
                  <a
                    class="page-link"
                    v-if="page != 1"
                    @click.prevent="previousPage"
                    href="#"
                    >Previous</a
                  >
                </li>
                <li v-if="haveMorePayments" class="page-item">
                  <a
                    class="page-link"
                    @click.prevent="nextPage"
                    href="#"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import datetime from 'vuejs-datetimepicker';

export default {
  name: "ShowUsageReport",
  components: { datetime },
  data: function() {
    return {
      terminals: null,
      customers: null,
      games : null,
      campaigns: null,

      // Payments list

      payments : null,
      page: 1,
      limit: 10,
      totalNumberOfPayments: 0,
      sum: 0,
      avg:  0,
      amountDonated: 0,
      amountForOwner: 0,
      
      // Filters

      filters: {
        campaign: null,
        terminal: null,
        customer: null,
        formula: null,
        transaction: null,
        game: null,
        tpe: null,
        time: null,
        date: null,
        start_date: null,
        end_date: null,
      },

      // Message
      message : "Aucun résultat correspond à votre recherche",      
    };
  },

  mounted: function() {
    this.fetchFiltersOptions();
    this.message = "Loading results , please be patient this can take long..."
    this.fetchPayments();
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isCustomer() {
      return this.$store.getters.isCustomer;
    },
    haveMorePayments() {
      return this.page * this.limit < this.totalNumberOfPayments;
    },
    filtersToUrlArgs() {
      const args = [];

      for (const [filter, value] of Object.entries(this.filters)) {
        if (value != null) {
          args.push(`${filter}=${value}`);
        }
      }

      return args.join("&");
    }
  },
  methods: {
    resetAllFilters(event) {
      this.filters = {
        campaign: null,
        terminal: null,
        customer: null,
        formula: null,
        transaction: null,
        game: null,
        tpe: null,
        time: null,
        date: null,
        start_date:null,
        end_date: null,
      };
      this.fetchPayments()
    },
    resetPayments() {
      this.payments = null;
      this.page = 1;
      this.totalNumberOfPayments = 0;
      this.sum = 0;
      this.avg = 0;
    },
    onFilterChange(event) {
      this.message = "Loading results , please be patient this can take long...";
      this.resetPayments();
      this.fetchPayments()
    },
    fetchPayments: function() {
      let loader = this.$loading.show();

      const args = [];

      for (const [filter, value] of Object.entries(this.filters)) {
        if (value != null && value != " DD-MM-YYYY ") {
          args.push(`${filter}=${value}`);
        }
      }

      this.$http
        .get("/payment/filtered/?" + this.filtersToUrlArgs + `&page=${this.page}`)
        .then((response) => {
          this.payments = response.data.payments;
          this.sum = response.data.amount_sum;
          this.avg = response.data.amount_avg;
          this.totalNumberOfPayments = response.data.total_number_of_payments;
          this.amountDonated = response.data.amount_donated;
          this.amountForOwner = response.data.amount_for_owner;           
          this.message = "Aucun résultat correspond à votre recherche"
        })
        .catch((error) => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Probléme avec la liste des payments.",
          };
          throw error;
        })
        .finally(() => {
          loader.hide();
        });
    },
    exportCSV(event) {
     let loader = this.$loading.show();

     const args = [];

      for (const [filter, value] of Object.entries(this.filters)) {
        if (value != null) {
          args.push(`${filter}=${value}`);
        }
      }

      this.$http
        .get("payment/filtered/to_csv/?" + this.filtersToUrlArgs)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Export_date.csv'); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Probléme avec l'export CSV.",
          };
          throw error;
        })
        .finally(() => {
          loader.hide();
        });

    },
    fetchFiltersOptions: function() {
      this.$http
        .get("payment/SelectItems/")
        .then(resp => {
          this.campaigns = resp.data.campaigns;
          this.terminals = resp.data.terminals;
          this.games = resp.data.games;
          this.customers = resp.data.customers; // Might be null or undefined if logged user is customer user
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message:
              "Impossible de récupérer les données, contactez le webmaster."
          };
        });
    },
    previousPage() {
      this.page--;
      this.fetchPayments();
    },
    nextPage() {
      this.page++;
      this.fetchPayments();
    },
  }
};
</script>
