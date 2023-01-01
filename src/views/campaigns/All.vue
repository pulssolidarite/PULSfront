<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Campagnes
              </h2>
              <router-link
                v-if="isAdmin"
                class="btn btn-primary mb-1"
                :to="{ name: 'addCampaign' }">
                <font-awesome-icon icon="plus" class="mr-2" />
                Ajouter une campagne
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
                    Toutes les campagnes
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

      <div v-if="featuredCampaign" class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h5>Campagne à la une</h5>
                <small>La campagne à la une sera mis en avant sur tous les terminaux.</small>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h1>{{ featuredCampaign.name }}</h1>
                    <p>{{ featuredCampaign.description }}</p>
                  </div>
                  <div class="col text-right">
                    <img
                      :src="featuredCampaign.logo"
                      height="30"
                      :alt="featuredCampaign.name">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">
                Campagnes
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
                          Logo
                        </th>
                        <th class="border-0">
                          Nom
                        </th>
                        <th class="border-0">
                          Description
                        </th>
                        <th class="border-0">
                          Dons collectés
                        </th>
                        <th class="border-0">
                          Terminaux associés
                        </th>
                        <th class="border-0" style="text-align: center;">
                          Mis en avant
                        </th>
                        <th class="border-0" />
                        <th v-if="isAdmin" class="border-0" />
                        <th v-if="isAdmin" class="border-0" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(campaign, index) in campaigns" :key="index">
                        <td>{{ campaign.id }}</td>
                        <td>
                          <span
                            class="text-success"><img
                            :src="campaign.logo"
                            height="30"
                            :alt="campaign.name"></span>
                        </td>
                        <td>
                          {{ campaign.name }}
                        </td>
                        <td>{{ stripCharacters(campaign.description) }}</td>
                        <td>
                          {{ campaign.collected }}/{{ campaign.goal_amount }} €
                        </td>
                        <td>
                          {{ campaign.nb_terminals }} termina<span
                            v-if="campaign.nb_terminals > 1">ux</span><span v-else>l</span>
                        </td>

                        <td v-if="campaign == featuredCampaign" style="text-align: center;">
                          <a
                            v-if="canCurrentUserUnselectFeaturedCampaign"
                            href=""
                            @click.prevent="toggleFeaturedCampaign(campaign)">
                            <span class="badge-dot badge-success mr-1" />
                          </a>
                          <span v-else class="badge-dot badge-success mr-1" />
                        </td>
                        <td v-else style="text-align: center;">
                          <a
                            v-if="canCurrentUserSelectFeaturedCampaign"
                            href=""
                            @click.prevent="toggleFeaturedCampaign(campaign)">
                            <span class="badge-dot badge-light mr-1" />
                          </a>
                          <span v-else class="badge-dot badge-light mr-1" />
                        </td>

                        <td>
                          <router-link
                            :to="'/campaigns/' + campaign.id"
                            class="text-dark">
                            <font-awesome-icon
                              icon="eye" />
                          </router-link>
                        </td>
                        <td v-if="isAdmin">
                          <router-link
                            :to="'/campaign/' + campaign.id + '/edit'"
                            class="text-primary">
                            <font-awesome-icon
                              icon="pen" />
                          </router-link>
                        </td>
                        <td v-if="isAdmin">
                          <a
                            href=""
                            class="text-danger"
                            @click.prevent="deleteCampaign(campaign.id)"><font-awesome-icon
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
  name: "AllCampaigns",
  data: function () {
    return {
      campaigns: null,
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
    currentUser() {
      return this.$store.getters.currentUser;
    },
    canCurrentUserSelectFeaturedCampaign() {
      if (this.isAdmin) {
        return true;
      }
      const customer = this.currentUser.customer;
      if (customer) {
        return customer.can_edit_featured_content;
      }
      return false;
    },
    canCurrentUserUnselectFeaturedCampaign() {
      if (this.isAdmin) {
        return true;
      }
      const customer = this.currentUser.customer;
      if (customer) {
        return customer.can_edit_featured_content && customer.featured_campaign != null;
      }
      return false;
    },
    featuredCampaign() {
      if (!this.campaigns) {
        return null;
      }

      const currentUser = this.$store.getters.currentUser;
      const featuredCampaignIdForCustomer = currentUser.customer?.featured_campaign;

      if (featuredCampaignIdForCustomer) {
        return this.campaigns.find(campaign => campaign.id == featuredCampaignIdForCustomer);
      }

      return this.campaigns.find(campaign => campaign.featured);
    },
  },
  mounted: function () {
    this.getCampaigns();
  },
  methods: {
    stripCharacters: function (text) {
      if (text.length > 70) {
        return text.substring(0, 70) + "..";
      } else {
        return text;
      }
    },
    showDetail: function (id) {
      this.$router.push({
        name: "campaign",
        params: { id: id },
      });
    },
    editCampaign: function (id) {
      this.$router.push({
        name: "edit-campaign",
        params: { id: id },
      });
    },
    deleteCampaign: function (id) {
      this.$http.delete("/campaign/" + id + "/").then(() => {
        this.getCampaigns();
      });
    },
    toggleFeaturedCampaign(campaign) {
      this.$http.post("campaign/" + campaign.id + "/toggle_featured/")
        .then((resp) => {
          this.getCampaigns();
          if (this.isCustomer) {
            this.$store.dispatch("refreshCurrentUser");
          }
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de mettre la campagne en avant.",
          });
          throw err;
        });
    },
    getCampaigns: function () {
      let loader = this.$loading.show();

      this.$http
        .get("campaign/")
        .then((resp) => {
          this.campaigns = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des campagnes.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>
