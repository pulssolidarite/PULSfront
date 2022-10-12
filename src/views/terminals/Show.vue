<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <h2 class="pageheader-title">Terminaux</h2>
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
                    {{ terminal.name }}
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

      <div class="row" v-if="terminal.name">
        <!-- ============================================================== -->
        <!-- profile -->
        <!-- ============================================================== -->
        <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
          <!-- ============================================================== -->
          <!-- card profile -->
          <!-- ============================================================== -->
          <div class="card">
            <div class="card-body">
              <div class="user-avatar text-center d-block">
                <img
                  src="@/assets/admin/images/arcade.svg"
                  alt="User Avatar"
                  height="100"
                />
              </div>
              <div class="text-center">
                <h2 class="font-24 mb-0">{{ terminal.name }}</h2>
                <p>
                  {{ terminal.customer.company }}
                  <span class="mx-2">|</span>
                  <span v-if="terminal.is_active" class="text-success"
                    >Activé</span
                  ><span v-else class="text-danger">Désactivé</span>
                </p>
              </div>
              <div
                class="d-flex align-items-center justify-content-center mt-2"
              >
                <span v-if="terminal.is_on" class="badge badge-success mr-2"
                  >Allumé</span
                >
                <span v-else class="badge badge-danger mr-2">Eteint</span>
                <span
                  v-if="terminal.is_playing"
                  class="badge badge-warning mr-2"
                  >En jeu</span
                >
              </div>
            </div>

            <div class="card-body border-top">
              <h3 class="font-16">Informations de contact</h3>
              <div class="">
                <ul class="list-unstyled mb-0">
                  <li class="mb-2">
                    <font-awesome-icon icon="envelope" class="mr-2" />{{
                      terminal.customer.representative
                    }}
                  </li>
                  <li class="mb-0">
                    <font-awesome-icon icon="map-pin" class="mr-2" />{{
                      terminal.location
                    }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body border-top">
              <h3 class="font-16">Campagnes</h3>
              <div class="">
                <ul class="mb-0 list-unstyled">
                  <li
                    class="mb-1 border border-primary rounded p-1 px-2 bg-light campaign-card"
                    v-for="(campaign, index) in terminal.campaigns"
                    :key="index"
                  >
                    <router-link :to="'/campaigns/' + campaign.id">
                      <img
                        :src="campaign.logo"
                        width="20"
                        class="mr-2 campaign-logo-grayed"
                        :alt="campaign.name"
                      />{{ campaign.name }}</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body border-top">
              <h3 class="font-16">Jeux</h3>
              <div class="">
                <ul class="mb-0 list-unstyled">
                  <li
                    class="mb-1 border border-primary rounded p-1 px-2 bg-light campaign-card"
                    v-for="(game, index) in terminal.games"
                    :key="index"
                  >
                    <router-link :to="'/games/' + game.id">
                      <img
                        :src="game.logo"
                        width="20"
                        class="mr-2 campaign-logo-grayed"
                        :alt="game.name"
                      />{{ game.name }}</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- ============================================================== -->
          <!-- end card profile -->
          <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- end profile -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- campaign data -->
        <!-- ============================================================== -->
        <div class="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
          <!-- ============================================================== -->
          <!-- campaign tab one -->
          <!-- ============================================================== -->
          <div class="influence-profile-content pills-regular">
            <ul
              class="nav nav-pills mb-3 nav-justified"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-stats-tab"
                  data-toggle="pill"
                  href="#pills-stats"
                  role="tab"
                  aria-controls="pills-stats"
                  aria-selected="true"
                  >Statistiques</a
                >
              </li>
              <li class="nav-item">
                <a
                  href=""
                  class="nav-link text-success"
                  id="pills-packages-tab"
                  v-if="!terminal.is_active"
                  @click.prevent="activateTerminal(terminal.id)"
                  >Activer</a
                >
                <a
                  href=""
                  class="nav-link text-danger"
                  id="pills-packages-tab"
                  v-else
                  @click.prevent="deactivateTerminal(terminal.id)"
                  >Désactiver</a
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="'/terminal/' + terminal.id + '/edit'"
                  class="nav-link text-warning"
                  id="pills-review-tab"
                  >Editer</router-link
                >
              </li>
              <li v-if="isAdmin" class="nav-item">
                <a class="nav-link text-danger" id="pills-review-tab"
                  >Supprimer</a
                >
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-stats"
                role="tabpanel"
                aria-labelledby="pills-stats-tab"
              >
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section-block">
                      <h3 class="section-title">Statistiques générales</h3>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <h1 class="mb-1">{{ terminal.total_donations }} €</h1>
                        <p>Totals dons</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <h1 class="mb-1" v-if="terminal.avg_donation">
                          {{ terminal.avg_donation.toFixed(2) }} €
                        </h1>
                        <h1 class="mb-1" v-else>
                          0 €
                        </h1>
                        <p>Don moyen</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <h1 class="mb-1" v-if="terminal.avg_timesession">
                          {{ terminal.avg_timesession }}
                        </h1>
                        <h1 class="mb-1" v-else>00:00:00</h1>
                        <p>Session moyenne</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <h1 class="mb-1" v-if="terminal.avg_gametimesession">
                          {{ terminal.avg_gametimesession }}
                        </h1>
                        <h1 class="mb-1" v-else>00:00:00</h1>
                        <p>Temps de jeu moyen</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="section-block">
                  <h3 class="section-title">Derniers dons</h3>
                </div>
                <div class="card">
                  <h5 class="card-header">Dons</h5>
                  <div class="card-body p-0">
                    <div class="dataTables_wrapper dt-bootstrap4">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class="bg-light">
                            <tr class="border-0">
                              <th class="border-0">#</th>
                              <th class="border-0">Status</th>
                              <th class="border-0">Donateur</th>
                              <th class="border-0">Campagne</th>
                              <th class="border-0">Montant</th>
                              <th class="border-0">Jeu</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(payment, index) in displayedPayments"
                              :key="index"
                            >
                              <td>{{ payment.id }}</td>
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
                              <td>
                                <router-link to="/">
                                  <img
                                    :src="payment.campaign.logo"
                                    width="20"
                                    class="mr-2 campaign-logo-grayed"
                                    :alt="payment.campaign.name"
                                  />{{ payment.campaign.name }}</router-link
                                >
                              </td>
                              <td>{{ payment.amount }} €</td>
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
                            Afficher 1 à {{ perPage }} de
                            {{ allPayments.length }} entrées
                          </div>
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
              </div>
            </div>
          </div>
          <!-- ============================================================== -->
          <!-- end campaign tab one -->
          <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- end campaign data -->
        <!-- ============================================================== -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowTerminal",
  data: function() {
    return {
      terminal: {
        owner: {
          customer: {
            company: ""
          }
        },
        payments: []
      },
      errors: {
        visible: false,
        type: "danger",
        message: ""
      },
      page: 1,
      perPage: 9,
      pages: []
    };
  },
  mounted: function() {
    this.getTerminal();
  },
  watch: {
    allPayments() {
      this.setPages();
    }
  },
  computed: {
    allPayments() {
      return this.terminal.payments;
    },
    displayedPayments() {
      return this.paginate(this.allPayments);
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isCustomer() {
      return this.$store.getters.isCustomer;
    },
  },
  methods: {
    getTerminal: function() {
      let loader = this.$loading.show();

      this.$http
        .get("terminal/" + this.$route.params.id + "/")
        .then(resp => {
          this.terminal = resp.data;
          this.terminal.avg_donation = resp.data.avg_donation;
          this.terminal.avg_gametimesession = resp.data.avg_gametimesession.replace(
            /"/g,
            ""
          );
          this.terminal.avg_timesession = resp.data.avg_timesession.replace(
            /"/g,
            ""
          );
        })
        .catch(err => {
          this.errors = {
            visible: true,
            type: "danger",
            message: err
          };
        }).finally(() => {
          loader.hide();
        });
    },
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
    activateTerminal: function(id) {
      if (
        this.terminal.campaigns.length > 0 &&
        this.terminal.games.length > 0
      ) {
        this.$http
          .get("terminal/" + id + "/activate/")
          .then(resp => {
            this.$set(this.terminal, "is_active", resp.data.is_active);
          })
          .catch(() => {
            this.errors = {
              visible: true,
              type: "danger",
              message: "Impossible d'activer le terminal."
            };
          });
      } else {
        this.errors = {
          visible: true,
          type: "danger",
          message: "Impossible d'activer un terminal sans campagne ou sans jeu."
        };
      }
    },
    deactivateTerminal: function(id) {
      this.$http
        .get("terminal/" + id + "/deactivate/")
        .then(resp => {
          this.$set(this.terminal, "is_active", resp.data.is_active);
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de désactiver le terminal."
          };
        });
    }
  }
};
</script>
