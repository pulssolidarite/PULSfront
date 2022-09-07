<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
          <div class="d-flex justify-content-between">
            <h2 class="pageheader-title">Rapport d'utilisation</h2>
              <li class="nav-item" style="list-style: none;">
              <router-link
                to=""
                class="nav-link first"
                exact
                :event="''"
                href=""
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-export"
                aria-controls="submenu-export"
                >
                <center><button class="btn btn-primary mb-1" @click="exportCSV" ><font-awesome-icon icon="file" class="mr-2" />Exporter les résultats</button></center>
                </router-link
              >
            </li>
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
                    <center> <label for="core">Campagne</label></center>
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
                   <center>  <label for="core">Terminal</label></center>
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
                    <center> <label for="core">Client</label></center>
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
                    <center> <label for="core">Formule de dons</label></center>
                     <select class="custom-select mb-2"  @change="onChange" v-model="choosen_formula" >
                      <option value ="all" selected > Tout </option>
                <option value ="Classique">  Classique </option>
                <option value ="Gratuit"> Gratuit </option>
                 <option value ="Mécénat"> Mécénat  </option>
                  <option value ="Partage"> Partage  </option>
                  </select>
                  </div>
                     <div class="form-group col">
                    <center> <label for="core">Transaction</label></center>
                   <select class="custom-select mb-2" @change="onChange" v-model="choosen_transaction" >
                      <option value ="all" selected> Tout </option>
                <option class="text-success" value ="Accepted" >  Acceptée </option>
                 <option class="text-danger" value ="Refused" >Refusée  </option>
                  <option class="text-warning" value ="Skiped" > Skipe  </option>
                  </select>
                  </div>
                     <div class="form-group col">
                   <center>  <label for="core">Jeu</label></center>
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
                    <center> <label for="core">TPE</label></center>
                            <select class="custom-select mb-2" @change="onChange" v-model="choosen_tpe"  >
                         <option value ="all" selected > Tout </option>
                         <option
                  v-for="terminal in terminals"
                  :value="terminal.payment_terminal"
                  :key="terminal.id"
                  >{{ terminal.payment_terminal }} </option
                >
                 </select>
                  </div>


                   <div class="form-group col">

                        <div class="form-group col">
                    <center> <label for="core"> A partir de </label></center>
                    <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><font-awesome-icon icon="clock"
                      />
                      </span>
                    <datetime format="DD-MM-YYYY H:i:s"  :lang="fr" @input="onChange"  v-model=choosen_date_start   style = " text-align: center; color: #2c3e50;  font-family: Helvetica;  "></datetime>
                    </div>
                  </div>
                  </div>

                 <div class="form-group col">
                   <center> <label for="core"> Jusqu’à </label><br></center>
                       <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><font-awesome-icon icon="clock"
                      />
                      </span>
                      <datetime format="DD-MM-YYYY H:i:s"  @input="onChange" v-model=choosen_date_end  style = " text-align: center; color: #2c3e50;  font-family: Helvetica;  "></datetime>
                    </div>
                  </div>
                  </div>
                <div class="form-group col">
                    <center><label for="core">Période</label></center>
                           <select class="custom-select mb-2" @change="onChange" v-model="choosen_period" >
                          <option value ="all" selected> Tout </option>
                    <option  value ="Today" >  Aujourd'hui </option>
                     <option  value ="Yesterday" >Hier  </option>
                      <option  value ="7days" > Les 7 derniers jours  </option>
                      <option  value ="CurrentWeek" > Cette semaine  </option>
                      <option  value ="LastWeek" > La semaine dernière  </option>
                      <option  value ="CurrentMonth" > Mois en cours  </option>
                      <option  value ="LastMonth" > Le mois dernier  </option>
                      <option  value ="ThisYear" > Cette année  </option>
                      <option  value ="LastYear" > L'année dernière  </option>
                      </select>
                  </div>

                  </div>






                   <div class="form-group col">
                    <center><label for="core">Nombre de résultats</label></center>
                            <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          <font-awesome-icon icon="file" text = "dsfs"/>
                        </span>
                      </div>
                      <input type="number" step="1" pattern="\d+" class="form-control" @change="onChange" v-model="results_number"  />
                    </div>

                  </div>


                </div> <button class="btn btn-primary"  @click="clearAll" STYLE=" background-color:black; float : right" > Effacer Tout </button></div>
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
                  <h1 class="mb-1">{{ total_games }}</h1>
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
        <th class="border-0">Transaction</th>
        <th class="border-0">Donateur</th>
        <th class="border-0">Campagne</th>
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
              v-for="(payment, index) in displayedPayments"
                              :key="index"
            >
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
                  {{ payment.donator.email ? payment.donator.email : `N° ${payment.donator.id}` }}
                </span>
              </td>
              <td>{{ payment.campaign.name }} </td>
              <td>{{ payment.terminal.name }} </td>
              <td>{{ getCustomerById(payment.terminal.owner) }} </td>
              <td>{{ payment.terminal.payment_terminal }} </td>
             <td>{{ payment.amount }} € </td>
              <td>
                <router-link to="/">
                 {{ payment.game.name }}</router-link
                >
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
        </div><br>
                      <div
                        class="d-flex align-items-center justify-content-between my-2"
                      >
                        <div class="col-sm-12 col-md-5">
                          <div
                            class="dataTables_info"
                            id="DataTables_Table_0_info"
                            role="status"
                            aria-live="polite"

                          >
                            <div style="color:white; color:#1C7DCE ;display:inline; "> Afficher :  &nbsp;&nbsp;</div> <strong>1 à {{ perPage }} de
                            {{ allPayments.length }} entrées </strong>
                          </div>
                          <div style="color:white; color:#1C7DCE ;display:inline; "> Nombre Total de résultats : </div> &nbsp;&nbsp;<strong>{{ TotalResults }} entrées</strong>
                        </div>
                        <div
                          class="col-sm-12 col-md-7 d-flex justify-content-end"
                        >
                          <nav
                            aria-label="Page navigation example"
                            class="w-100"
                          >
                            <ul
                              class="pagination w-100  d-flex justify-content-end"
                            >
                              <li class="page-item">
                                <a
                                  class="page-link"
                                  v-if="page != 1"
                                  @click.prevent="page--"
                                  href="#"
                                  >Previous</a
                                >
                              </li>
                              <li
                                class="page-item"
                                v-for="pageNumber in pages.slice(
                                  page - 1,
                                  page + 5
                                )"
                                :key="pageNumber"
                              >
                                <a
                                  class="page-link"
                                  @click.prevent="page = pageNumber"
                                  href="#"
                                  >{{ pageNumber }}</a
                                >
                              </li>
                              <li class="page-item">
                                <a
                                  class="page-link"
                                  @click.prevent="page++"
                                  v-if="page < pages.length"
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
  name: "Home",
   components: { datetime },
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
      result : [],
         types: [
      ],
      nb_donators_last: 0,
      key : "",
      choosen_compaign : "all",
      choosen_terminal : "all" ,
      choosen_client : "all" ,
      choosen_formula : "all" ,
      choosen_transaction : "all" ,
      choosen_game : "all" ,
      choosen_tpe : "all" ,
      choosen_date_start : "DD-MM-YYYY" ,
      choosen_date_end : "DD-MM-YYYY" ,
      choosen_time : "all" ,
      choosen_period : "all",
      sum : 0,
      avg :  0,
      total_games : 0,
      message : "Aucun résultat correspond à votre recherche",
      downloadFile : "",
      page: 1,
      perPage: 12,
      pages: [],
      results_number : 50,
      TotalResults : 0,
    };
  },

  mounted: function() {
    this.getSelectItems();
    this.message = "Loading results , please be patient this can take long..."
    this.getFilterResults();
  },
  watch: {
    allPayments() {
      this.setPages();
    }
  },
  computed: {
    allPayments() {
      return this.result;
    },
    displayedPayments() {
      return this.paginate(this.allPayments);
    }
  },
  methods: {
  setPages() {
      let numberOfPages = Math.ceil(this.allPayments.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(payments) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return payments.slice(from, to);
    },
  exportCSV(event) {
     let loader = this.$loading.show();
      this.$http.get("payment/exportCSV/?campaign_id="+ this.choosen_compaign +"&terminal_id="+ this.choosen_terminal+"&client_id=" + this.choosen_client +
      "&status="+ this.choosen_transaction+"&game_id=" + this.choosen_game +"&date=" + this.choosen_period  +
      "&date_start="+ this.choosen_date_start+"&date_end=" + this.choosen_date_end + "&results_number=" + this.results_number  +
      "&payment_terminal="+ this.choosen_tpe + "&donation_formula="+ this.choosen_formula )
       .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Export_date.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Probléme avec l'export CSV.",
          };
        })
          .finally(() => {
          loader.hide();
        });

    },
  clearAll(event) {

     this.choosen_compaign = "all",
      this.choosen_terminal = "all" ,
      this.choosen_client = "all" ,
      this.choosen_formula = "all" ,
      this.choosen_transaction = "all" ,
      this.choosen_game = "all" ,
      this.choosen_tpe = "all" ,
      this.choosen_date_start = "01-01-2010 00:00:00" ,
      this.choosen_date_end = "DD-MM-YYYY" ,
      this.choosen_time = "all" ,
      this.choosen_period = "all",
      this.results_number = 50,
      this.TotalResults = 0,
      this.choosen_formula = "all",
      this.getFilterResults()

    },
   onChange(event) {
   this.message = "Loading results , please be patient this can take long..."
      this.page= 1,
      this.perPage= 12,
      this.pages= [],
    this.sum =  0
    this.avg =  0
    this.total_games = 0
    this.result =  []
    this.TotalResults = 0
    this.getFilterResults()
    },
    getFilterResults: function() {
      let loader = this.$loading.show();
      this.$http
        .get("/payment/filtered/?campaign_id="+ this.choosen_compaign +"&terminal_id="+ this.choosen_terminal+"&client_id=" + this.choosen_client +
      "&status="+ this.choosen_transaction+"&game_id=" + this.choosen_game +"&date=" + this.choosen_period  +
      "&date_start="+ this.choosen_date_start+"&date_end=" + this.choosen_date_end + "&results_number=" + this.results_number +
      "&payment_terminal="+ this.choosen_tpe + "&donation_formula="+ this.choosen_formula )
        .then((resp) => {
          this.result = resp.data.payments;
           this.sum = resp.data.amountSum;
           this.avg  = resp.data.amountAvg;
           this.total_games = resp.data.total_games;
           this.TotalResults = resp.data.TotalResults;
            this.message = "Aucun résultat correspond à votre recherche"
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Probléme avec la liste des payments.",
          };
        })
        .finally(() => {
          loader.hide();
        });
    },
    getCustomerById(customerId) {
      if (this.customers.length == 0) {
        this.getSelectItems()
          .then(() => {
            for (const customer of this.customers) {
              if (customer['id'] === customerId) {
                return customer['company'];
              }
            }
          })
        ;
      } else {
          for (const customer of this.customers) {
            if (customer['id'] === customerId) {
              return customer['company'];
            }
          }
      }

      return undefined;
    },

    getSelectItems: function() {
     // let loader = this.$loading.show();
      this.$http
        .get("payment/SelectItems/")
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
          /*
          .finally(() => {
          loader.hide();
        }); */
    },
  }
};
</script>




