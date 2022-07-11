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
            <select class="custom-select mb-2" name="fruit" @change="onChange" v-model="choosen_compaign" >
                <option value ="all"  > Tout </option>
                <option
                  v-for="Compagne in campaigns"
                  :value="Compagne.id"
                  :key="Compagne.id"
                  >{{ Compagne.name }}</option
                >
              </select>

                  </div>
                  <div class="form-group col">
                    <label for="core">Terminal</label>
                            <select class="custom-select mb-2" @change="onChange" v-model="choosen_terminal" >
                             <option value ="all" selected> Tout </option>
                <option
                  v-for="terminal in terminals"
                  :value="terminal.id"
                  :key="terminal.id"
                  >{{ terminal.name }} </option
                >
              </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">Client</label>
                        <select class="custom-select mb-2" @change="onChange" v-model="choosen_client"  >
                         <option value ="all" selected> Tout </option>
                <option
                  v-for="customer in customers"
                  :value="customer.id"
                  :key="customer.id"
                  >{{ customer.company }} -
                  {{ customer.representative }}</option
                >
              </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">Formule de dons</label>
                     <select class="custom-select mb-2"  @change="onChange" v-model="choosen_formule" >
                      <option value ="all" selected > Tout </option>
                <option>  Classique </option>
                 <option> Mécénat,  </option>
                  <option> Partage  </option>

                  </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">Transaction</label>

                   <select class="custom-select mb-2" @change="onChange" v-model="choosen_transaction" >
                      <option value ="all" selected> Tout </option>
                <option class="text-success" value ="Accepted" >  Acceptée </option>
                 <option class="text-danger" value ="Refused" >Refusée  </option>
                  <option class="text-warning" value ="Skiped" > Skipe  </option>

                  </select>
                  </div>
                     <div class="form-group col">
                    <label for="core">jeux</label>
                          <select class="custom-select mb-2" @change="onChange" v-model="choosen_game"  >
                         <option value ="all" selected> Tout </option>
                <option
                  v-for="g in games"
                  :value="g.id"
                  :key="g.id"
                  >{{ g.name }} </option
                >
              </select>
                  </div>
                   <div class="form-group col">
                    <label for="core">TPE</label>
                            <select class="custom-select mb-2" @change="onChange" v-model="choosen_tpe"  >
                         <option value ="all" selected > Tout </option>
                 </select>
                  </div>


                   <div class="form-group col">
                    <label for="core">Période</label>

                           <select class="custom-select mb-2" @change="onChange" v-model="choosen_period" >
                          <option value ="all" selected> Tout </option>
                    <option  value ="Today" >  Today </option>
                     <option  value ="Yesterday" >Yesterday  </option>
                      <option  value ="7days" > Last 7 days  </option>
                      <option  value ="CurrentWeek" > Current Week  </option>
                      <option  value ="LastWeek" > Last Week  </option>
                      <option  value ="CurrentMonth" > Current Month  </option>
                      <option  value ="LastMonth" > Last Month  </option>
                      <option  value ="ThisYear" > This Year  </option>
                      <option  value ="LastYear" > Last Year  </option>

                      </select>
                  </div>
                   <div class="form-group col">
                    <label for="core">Date</label>

                        <input type="datetime-local" id="date" name="date" step="1" @change="onChange" v-model="choosen_date"  >

                  </div>

                    <div class="form-group col">
                    <label for="core">Time</label><br>

                        <input type="time" id="time" name="time" step="1" @change="onChange" v-model="choosen_time"   >
                  </div>

                </div></div>

     </div>
        <div class="row">
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">

                 <div class="metric-value d-inline-block">
                  <h1 class="mb-1" >{{ sum }} €</h1>
                </div>
                <h5 class="text-muted">Total des dons</h5>


              </div>
            </div>
          </div>
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">

                <div class="metric-value d-inline-block">
                  <h1 class="mb-1" >{{ avg }} €</h1>

                </div>
                <h5 class="text-muted">Don moyen</h5>


              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">

                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">{{ nbr_parties }}</h1>
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
          <tbody v-if="result.length > 0">

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

                 <span
                  v-else-if="payment.status == 'Refused'"
                  class="text-danger"
                  >{{ payment.status }}</span
                >
                <span v-else class="text-warning">{{
                  payment.status
                }}</span>

              </td>
              <td>N° {{ payment.donator.id }}</td>
              <td>{{ payment.campaign.name }} </td>
              <td>{{ payment.terminal.name }} </td>
              <td>{{ payment.terminal.owner.customer.company }} </td>

             <td>{{ none }} </td>
             <td>{{ payment.amount }} € </td>
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
              <tbody v-else>
                     <tr>
                        <td colspan="13" class="text-center">

                        </td>
                      </tr>
                      <tr>
                        <td colspan="13" class="text-center">
                             <h5> {{  message }} </h5>
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
      key : "",
      choosen_compaign : "all",
      choosen_terminal : "all" ,
      choosen_client : "all" ,
      choosen_formule : "all" ,
      choosen_transaction : "all" ,
      choosen_game : "all" ,
      choosen_tpe : "all" ,
      choosen_date : "all" ,
      choosen_time : "all" ,
      choosen_period : "all",
      sum : 0,
      avg :  0,
      nbr_parties : 0,
      message : "Aucun résultat correspond à votre recherche"

    };
  },


  mounted: function() {
    this.getStats();
    this.getFilterResults();


  },
  methods: {

   onChange(event) {

   this.message = "Loading results , please be patient this can take long..."

    this.sum =  0
    this.avg =  0
    this.nbr_parties = 0
    this.result =  {}

    this.getFilterResults()
    },

    getFilterResults: function() {
      this.$http
        .get("/payment/filtered/?campaign_id="+ this.choosen_compaign +"&terminal_id="+ this.choosen_terminal+"&client_id=" + this.choosen_client +"&status="+ this.choosen_transaction+"&game_id=" + this.choosen_game +"&date=" + this.choosen_period   )

        .then((resp) => {
          this.result = resp.data.payments;
           this.sum = resp.data.amountSum;
           this.avg  = resp.data.amountAvg;
           this.nbr_parties = resp.data.nbr_parties;
           this.message = "Aucun résultat correspond à votre recherche"
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Probléme avec la liste des payments.",
          };
        });
    },



    getStats: function() {
      this.$http
        .get("payment/stats/")
        .then(resp => {
          this.campaigns = resp.data.campaigns;
          this.terminals = resp.data.terminals;
          this.games = resp.data.games;
          this.customers = resp.data.customers;

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

  }
};
</script>
