<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <h2 class="pageheader-title">
              Campagnes
            </h2>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link
                      to="/"
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
                      to="/campaigns"
                      class="breadcrumb-link">
                      Campagnes
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">
                    {{ campaign.name }}
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

      <div v-if="campaign.name" class="row">
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
                  :src="campaign.logo"
                  :alt="campaign.name"
                  height="100"
                  style="width: 100%; object-fit: contain;">
              </div>
              <div class="text-center">
                <h2 class="font-24 mb-0">
                  {{ campaign.name }}
                </h2>
                <p>
                  <a :href="campaign.link">{{ campaign.link }}</a>
                </p>
              </div>
              <div class="text-center">
                <span
                  v-if="campaign.is_archived"
                  class="text-danger">Archivé</span>
              </div>
            </div>

            <div class="card-body border-top">
              <h3 class="font-16">
                Informations de contact
              </h3>
              <div class="">
                <ul class="list-unstyled mb-0">
                  <li class="mb-2">
                    <font-awesome-icon icon="wallet" class="mr-2" />
                    Objectif de collecte : {{ campaign.goal_amount }} €
                  </li>
                  <li class="mb-0">
                    <p>{{ campaign.description }}</p>
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
              id="pills-tab"
              class="nav nav-pills mb-3 nav-justified"
              role="tablist">
              <li class="nav-item">
                <a
                  id="pills-stats-tab"
                  class="nav-link active"
                  data-toggle="pill"
                  href="#pills-stats"
                  role="tab"
                  aria-controls="pills-stats"
                  aria-selected="true">Statistiques</a>
              </li>
              <li class="nav-item">
                <a
                  id="pills-actions-tab"
                  class="nav-link"
                  data-toggle="pill"
                  href="#pills-actions"
                  role="tab"
                  aria-controls="pills-actions"
                  aria-selected="true">Actions associatives</a>
              </li>
              <li v-if="isAdmin" class="nav-item">
                <router-link
                  id="pills-review-tab"
                  :to="'/campaign/' + campaign.id + '/edit'"
                  class="nav-link text-warning">
                  Editer
                </router-link>
              </li>
              <li v-if="isAdmin" class="nav-item">
                <a
                  id="pills-review-tab"
                  href=""
                  class="nav-link text-danger"
                  @click.prevent="deleteCampaign(campaign.id)">Archiver</a>
              </li>
            </ul>
            <div id="pills-tabContent" class="tab-content">
              <div
                id="pills-stats"
                class="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="pills-stats-tab">
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section-block">
                      <h3 class="section-title">
                        Statistiques générales
                      </h3>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <span class="d-flex align-items-end mb-1">
                          <h1 class="mb-0">
                            {{ campaign.nb_terminals }}
                          </h1>
                          <p class="mb-1 ml-1">
                            termina<span
                              v-if="campaign.nb_terminals > 1">l</span><span v-else>ux</span>
                          </p>
                        </span>
                        <p>Actifs dans</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <h1 class="mb-1">
                          {{ campaign.collected }} €
                        </h1>
                        <p>Totals dons</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <h1 v-if="campaign.total_today" class="mb-1">
                          {{ campaign.total_today.toFixed(2) }} €
                        </h1>
                        <h1 v-else class="mb-1">
                          0 €
                        </h1>
                        <p>Dons aujourd'hui</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <h1 v-if="campaign.avg_donation" class="mb-1">
                          {{ campaign.avg_donation.toFixed(2) }} €
                        </h1>
                        <h1 v-else class="mb-1">
                          0 €
                        </h1>
                        <p>Don moyen</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="section-block">
                      <h3 class="section-title">
                        Derniers dons
                      </h3>
                    </div>
                    <div class="card">
                      <h5 class="card-header">
                        Dons
                      </h5>
                      <div class="card-body p-0">
                        <div class="dataTables_wrapper dt-bootstrap4">
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
                                    Donateur
                                  </th>
                                  <th class="border-0">
                                    Montant
                                  </th>
                                  <th class="border-0">
                                    Jeu
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(payment, index) in displayedPayments"
                                  :key="index">
                                  <td>{{ payment.id }}</td>
                                  <td>
                                    <span
                                      v-if="payment.status == 'Accepted'"
                                      class="text-success">{{ payment.status }}</span>
                                    <span v-else class="text-danger">{{
                                      payment.status
                                    }}</span>
                                  </td>
                                  <td>N° {{ payment.donator }}</td>
                                  <td>{{ payment.amount }} €</td>
                                  <td>
                                    <router-link to="/">
                                      <img
                                        :src="payment.game.logo"
                                        width="20"
                                        class="mr-2 campaign-logo-grayed"
                                        :alt="payment.game.name">{{ payment.game.name }}
                                    </router-link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div
                            class="d-flex align-items-center justify-content-between my-2">
                            <div class="col-sm-12 col-md-5">
                              <div
                                id="DataTables_Table_0_info"
                                class="dataTables_info"
                                role="status"
                                aria-live="polite">
                                Afficher 1 à {{ perPage }} de
                                {{ allPayments.length }} entrées
                              </div>
                            </div>
                            <div
                              class="col-sm-12 col-md-7 d-flex justify-content-end">
                              <nav
                                aria-label="Page navigation example"
                                class="w-100">
                                <ul
                                  class="pagination w-100  d-flex justify-content-end">
                                  <li class="page-item">
                                    <a
                                      v-if="page != 1"
                                      class="page-link"
                                      href="#"
                                      @click.prevent="page--">Previous</a>
                                  </li>
                                  <li
                                    v-for="pageNumber in pages.slice(
                                      page - 1,
                                      page + 5
                                    )"
                                    :key="pageNumber"
                                    class="page-item">
                                    <a
                                      class="page-link"
                                      href="#"
                                      @click.prevent="page = pageNumber">{{ pageNumber }}</a>
                                  </li>
                                  <li class="page-item">
                                    <a
                                      v-if="page < pages.length"
                                      class="page-link"
                                      href="#"
                                      @click.prevent="page++">Next</a>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="section-block">
                      <h3 class="section-title">
                        Vidéo d'association
                      </h3>
                    </div>
                    <div class="card">
                      <h5 class="card-header">
                        Lien YouTube
                      </h5>
                      <div class="card-body p-0">
                        <youtube
                          :video-id="campaign.video"
                          class="w-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="pills-actions"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="pills-actions-tab">
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section-block">
                      <h3 class="section-title">
                        Actions associatives
                      </h3>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <span class="mb-1">
                          <img
                            :src="campaign.photo1"
                            :alt="campaign.text1"
                            class="w-100 border"
                            style="height: 150px; object-fit: contain;">
                        </span>
                        <h1 class="mt-1 mb-0 text-center">
                          1 €
                        </h1>
                        <p class="mt-1">
                          {{ campaign.text1 }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <span>
                          <img
                            :src="campaign.photo5"
                            :alt="campaign.text5"
                            class="w-100 border"
                            style="height: 150px; object-fit: contain;">
                        </span>
                        <h1 class="mt-1 mb-0 text-center">
                          5 €
                        </h1>
                        <p>{{ campaign.text5 }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <span>
                          <img
                            :src="campaign.photo10"
                            :alt="campaign.text10"
                            class="w-100 border"
                            style="height: 150px; object-fit: contain;">
                        </span>
                        <h1 class="mt-1 mb-0 text-center">
                          10 €
                        </h1>
                        <p>{{ campaign.text10 }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <span>
                          <img
                            :src="campaign.photo20"
                            :alt="campaign.text20"
                            class="w-100 border"
                            style="height: 150px; object-fit: contain;">
                        </span>
                        <h1 class="mt-1 mb-0 text-center">
                          20 €
                        </h1>
                        <p>{{ campaign.text20 }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <span>
                          <img
                            :src="campaign.photo30"
                            :alt="campaign.text30"
                            class="w-100 border"
                            style="height: 150px; object-fit: contain;">
                        </span>
                        <h1 class="mt-1 mb-0 text-center">
                          30 €
                        </h1>
                        <p>{{ campaign.text30 }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-body">
                        <span>
                          <img
                            :src="campaign.photo50"
                            :alt="campaign.text50"
                            class="w-100 border"
                            style="height: 150px; object-fit: contain;">
                        </span>
                        <h1 class="mt-1 mb-0 text-center">
                          50 €
                        </h1>
                        <p>{{ campaign.text50 }}</p>
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
  name: "ShowCampaign",
  data: function () {
    return {
      campaign: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
      page: 1,
      perPage: 9,
      pages: [],
    };
  },
  computed: {
    allPayments() {
      return this.campaign.last_donations;
    },
    displayedPayments() {
      return this.paginate(this.allPayments);
    },
    isAdmin: function () {
      return this.$store.getters.isAdmin;
    },
    isCustomer: function () {
      return this.$store.getters.isCustomer;
    },
  },
  watch: {
    allPayments() {
      this.setPages();
    },
  },
  mounted: function () {
    this.getCampaign();
  },
  methods: {
    deleteCampaign: function (id) {
      this.$http.delete("/campaign/" + id + "/").then(() => {
        this.$router.push("/campaigns");
      });
    },
    getCampaign: function () {
      this.$http
        .get("campaign/" + this.$route.params.id + "/")
        .then((resp) => {
          this.campaign = resp.data;
        })
        .catch((err) => {
          console.log(err.response);
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
  },
};
</script>
