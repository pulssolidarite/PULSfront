<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
          <div class="d-flex justify-content-between">
            <h2 class="pageheader-title">Rapport d'utilisation</h2>

            <router-link
                class="btn btn-primary mb-1"
                :to="{ name: '' }"
                ><font-awesome-icon  class="mr-2" /> Export </router-link
              >
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">

                  <li class="breadcrumb-item active" aria-current="page">

                  </li>
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
                 <div class="form-group col">
                    <label for="core">Compagne</label>
            <select class="custom-select mb-2" >
                <option> Tout </option>
                <option
                  v-for="Compagne in campaigns"
                  :value="Compagne"
                  :key="Compagne.id"
                  >{{ Compagne.name }}</option
                >
              </select>
                  </div>
                  <div class="form-group col">
                    <label for="core">Terminal</label>
                            <select class="custom-select mb-2" >
                             <option> Tout </option>
                <option
                  v-for="terminal in terminals"
                  :value="terminal"
                  :key="terminal.id"
                  >{{ terminal.name }} </option
                >
              </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">Client</label>
                        <select class="custom-select mb-2"  >
                         <option> Tout </option>
                <option
                  v-for="customer in customers"
                  :value="customer"
                  :key="customer.id"
                  >{{ customer.company }} -
                  {{ customer.representative }}</option
                >
              </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">Formule de dons</label>
                     <select class="custom-select mb-2"  >
                      <option > Tout </option>
                <option>  Classique </option>
                 <option> Mécénat,  </option>
                  <option> Partage  </option>

                  </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">Transaction</label>

                   <select class="custom-select mb-2" >
                      <option> Tout </option>
                <option class="text-success">  Acceptée </option>
                 <option class="text-danger">Refusée  </option>
                  <option class="text-warning"> Skipe  </option>

                  </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">jeux</label>
                          <select class="custom-select mb-2" >
                         <option > Tout </option>
                <option
                  v-for="g in games"
                  :value="g"
                  :key="g.id"
                  >{{ g.name }} </option
                >
              </select>
                  </div>
                   <div class="form-group col">
                    <label for="core">TPE</label>
                            <select class="custom-select mb-2"  >
                         <option > Tout </option>
                 </select>
                  </div>
                   <div class="form-group col">
                    <label for="core">Période</label>

                        <input type="datetime-local" id="date" name="date" step="1"  >
                  </div>

                    <div class="form-group col">
                    <label for="core">Time</label><br>

                        <input type="time" id="time" name="time" step="1"  >
                  </div>

                </div></div>
     </div>
        <div class="row">
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">

                 <div class="metric-value d-inline-block">
                  <h1 class="mb-1" v-if="collected > 0">{{ collected }} €</h1>
                  <h1 class="mb-1" v-else>0 €</h1>
                </div>
                <h5 class="text-muted">Total des dons</h5>


              </div>
            </div>
          </div>
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">

                <div class="metric-value d-inline-block">
                  <h1 class="mb-1" v-if="collected > 0">{{ collected }} €</h1>
                  <h1 class="mb-1" v-else>0 €</h1>
                </div>

                <h5 class="text-muted">Don moyen</h5>


              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">

                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">0</h1>
                </div>
                <h5 class="text-muted">Nombre de parties</h5>

              </div>
            </div>
          </div>
           <table class="table">
              <thead class="bg-light">
                <tr class="border-0">
           <th class="border-0">#</th>
        <th class="border-0">Date</th>
        <th class="border-0">Heure</th>
        <th class="border-0">Transaction</th>
        <th class="border-0">Donateur</th>
        <th class="border-0">Compagne</th>
        <th class="border-0">Terminal</th>
        <th class="border-0">Client</th>
        <th class="border-0">TPE</th>
        <th class="border-0">Montant</th>
        <th class="border-0">Jeu</th>
        <th class="border-0">Forumle des dons</th>

            </tr>
          </thead>
          <tbody>

            <tr
              v-for="payment in result"
              :key="payment.id"
            >
              <td>{{ payment.id }}</td>
              <td>{{ payment.date }}</td>
              <td>{{ none }}</td>
               <td>
                <span
                  v-if="payment.status == 'Accepted'"
                  class="text-success"
                  >{{ payment.status }}</span
                >
                <span v-else class="text-danger">{{
                  payment.status
                }}</span>
              </td>
              <td>N° {{ payment.donator.id }}</td>
              <td>{{ payment.campaign.name }} </td>
              <td>{{ payment.terminal.name }} </td>
             <td>{{ none }} </td>
             <td>{{ none }} </td>
             <td>{{ payment.amount }} </td>
              <td>
                <router-link to="/">
                  <img
                    :src="payment.game.logo"
                    width="20"
                    class="mr-2 campaign-logo-grayed"
                    :alt="payment.game.name"
                  />{{ payment.game.name }}</router-link
                >
              </td>

            </tr>
          </tbody>
        </table>
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
      customers: {},
      games : {},
      campaigns: {},
      result : {},
      nb_donators_last: 0,

    };
  },


  mounted: function() {
    this.getFilterResults();
    this.getStats();
    this.getGames();
    this.getCustomers();
  },
  methods: {

    getFilterResults: function() {
      this.$http
        .get("/payment/filtered/1/" )
        .then((resp) => {
          this.result = resp.data.payments;
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Probléme avec la liste des payments.",
          };
        });
    },

    getCustomers: function() {
      this.$http
        .get("customer/")
        .then((resp) => {
          this.customers = resp.data;
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de charger la liste des clients.",
          };
        });
    },

  getGames: function() {

        this.$http
        .get("game/")
        .then((resp) => {
          this.games = resp.data;
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de charger la liste des jeux.",
          };
        });

    },


    getStats: function() {
      this.$http
        .get("dashboard/")
        .then(resp => {
          this.campaigns = resp.data.campaigns;
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
    },

  }
};
</script>
