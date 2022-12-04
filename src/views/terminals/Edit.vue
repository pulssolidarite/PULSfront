<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Terminaux</h2>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'home' }" class="breadcrumb-link"
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
                  <li class="breadcrumb-item" aria-current="page">
                    <router-link
                      v-if="terminal"
                      :to="'/terminal/' + terminal.id"
                      class="breadcrumb-link">
                      {{ terminal.name }}
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Modifier
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

      <div v-if="terminal" class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Editer un terminal</h5>
            </div>
            <div class="card-body" v-if="terminal.owner">
              <h4>Informations sur le terminal</h4>
              <div v-if="isAdmin" class="row">
                <div class="col-6">
                  <div class="form-group w-100">
                    <label for="name">Nom du terminal</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp"
                      v-model="terminal.name"
                    />
                    <small id="nameHelp" class="form-text text-muted"
                      >Donnez un nom cohérent au terminal.</small
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group w-100">
                    <label for="owner">Client</label>
                    <input
                      type="text"
                      class="form-control"
                      disabled
                      aria-describedby="ownerHelp"
                      v-model="terminal.customer.company"
                    />
                    <small id="nameHelp" class="form-text text-muted">
                      Le client rattaché au terminal.
                    </small>
                  </div>
                </div>
              </div>
              <div v-if="isAdmin" class="row">
                <div class="col-6">
                  <div class="form-group w-100">
                    <label for="owner">Username</label>
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><font-awesome-icon icon="user"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        disabled
                        aria-describedby="ownerHelp"
                        v-model="terminal.owner.username"
                      />
                    </div>
                    <small id="nameHelp" class="form-text text-muted"
                      >Le username attribué au terminal.</small
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group w-100">
                    <label for="owner">Password</label>
                    <small id="nameHelp" class="form-text text-muted"
                      >Par définition, il n'est pas possible de changer ou de
                      retrouver le mot de passe. En cas de problèmes, il faut
                      recréer un terminal.
                    </small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div v-if="isAdmin" class="form-group">
                    <label for="location">Localisation</label>
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><font-awesome-icon icon="map-pin"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="terminal.location"
                        aria-describedby="helpId"
                        placeholder="Adresse ou coordonnées de la borne"
                      />
                    </div>
                    <small id="helpId" class="form-text text-muted"
                      >Localisation de la borne.</small
                    >
                  </div>
                  <div class="form-group">
                    <label for="play_timer" class="col-form-label"
                      >Temps de jeu maximum</label
                    >
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><font-awesome-icon icon="clock"
                        /></span>
                      </div>
                      <input
                        v-model="terminal.play_timer"
                        type="number"
                        min="0"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div v-if="canCurrentUserEditDonationFormula" class="row">
                    <div class="form-group col-md-6 col-12">
                      <label for="core">Formule de dons</label>
                      <select class="custom-select mb-2"  v-model="terminal.donation_formula" >
                        <option value="Classique" selected>Classique</option>
                        <option value="Gratuit">Gratuit</option>
                        <option value="Mécénat">Mécénat</option>
                        <option value="Partage">Partage</option>
                      </select>
                    </div>
                    <div v-if="canCurrentUserEditDonationAmount" class="form-group col-md-2 col-4">
                      <label for="core">Montant min</label>
                      <input
                        v-model="terminal.donation_min_amount"
                        type="number"
                        min="1"
                        :max="terminal.donation_max_amount"
                        class="form-control"
                      />
                    </div>
                    <div v-if="canCurrentUserEditDonationAmount" class="form-group col-md-2 col-4">
                      <label for="core">Montant par défaut</label>
                      <input
                        v-model="terminal.donation_default_amount"
                        type="number"
                        :min="terminal.donation_min_amount"
                        :max="terminal.donation_max_amount"
                        class="form-control"
                      />
                    </div>
                    <div v-if="canCurrentUserEditDonationAmount" class="form-group col-md-2 col-4">
                      <label for="core">Montant max</label>
                      <input
                        v-model="terminal.donation_max_amount"
                        type="number"
                        :min="terminal.donation_min_amount"
                        class="form-control"
                      />
                    </div>
                  </div>
				          <div class="row">
                    <div class="form-group col-12">
                      <label for="core">Montant max</label>
                      <textarea
                        class="form-control"
                        v-model="terminal.free_mode_text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isAdmin" class="card-body border-top">
            <div class="row">
              <div class="col-6">
                  <div class="form-group w-100">
                    <h4>Numéro du Terminal de paiement</h4>
                    <small id="nameHelp" class="form-text text-muted"
                      >Indiquer le réfèrence fournisseur du terminal de paiement </small
                    >
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp"
                      v-model="terminal.payment_terminal"
                    />
                  </div>
                </div>
                </div>
            </div>
            <div class="card-body border-top">
              <h4>Campagnes & jeux</h4>
              <div class="row">
                <div class="col" v-if="terminal.campaigns">
                  <label for="campaign"
                    >Campagnes actives :
                  </label>
                  <div class="row form-group">
                    <label
                      v-for="campaign in campaigns"
                      :key="campaign.id"
                      :for="campaign.id"
                      :class="[
                        campaignIsSelected(campaign.id) ? 'checked' : '',
                        'card-checkbox',
                        'col-3',
                        'py-2',
                        'mx-2',
                      ]"
                      @click.prevent="selectCampaign(campaign)"
                    >
                      <input type="radio" :value="campaign.id" />
                      <span
                        :class="[
                          'selected',
                          'd-flex',
                          'align-items-center',
                          'justify-content-center',
                        ]"
                      >
                        <font-awesome-icon icon="check" />
                      </span>
                      <span class="checkbox-icon">
                        <img
                          :src="campaign.logo"
                          height="70"
                          :alt="campaign.name"
                        />
                      </span>
                      <h5 class="mt-2">{{ campaign.name }}</h5>
                      <p class="lead">
                        {{ campaign.collected }}/{{ campaign.goal_amount }} €
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col" v-if="terminal.games">
                  <label for="game">Jeux actifs :</label>
                  <div class="row form-group">
                    <label
                      v-for="game in games"
                      :for="game.id"
                      :class="[
                        gameIsSelected(game.id) ? 'checked' : '',
                        'card-checkbox',
                        'col-3',
                        'py-3',
                        'mx-2',
                      ]"
                      :key="game.id"
                      @click.prevent="selectGame(game)">
                      <input type="radio" :value="game.id" />
                      <span
                        :class="[
                          'selected',
                          'd-flex',
                          'align-items-center',
                          'justify-content-center',
                        ]">
                        <font-awesome-icon icon="check" />
                      </span>
                      <span class="checkbox-icon">
                        <img :src="game.logo" height="70" :alt="game.name" />
                      </span>
                      <h4 class="mt-2">{{ game.name }}</h4>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="submit">
                Modifier le terminal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditTerminal",
  data: function () {
    return {
      terminal: null,
      campaigns: {},
      games: {},
      user: {},
      customer: {},
      // maxGames: this.$store.state.maxGames,
      // maxCampaigns: this.$store.state.maxCampaigns,
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isCustomer() {
      return this.$store.getters.isCustomer;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    canCurrentUserEditDonationFormula() {
      if (this.isAdmin) {
        return true;
      }
      const customer = this.currentUser.customer;
      if (customer) {
        return customer.can_edit_donation_formula;
      }
      return false;
    },
    canCurrentUserEditDonationAmount() {
      if (this.isAdmin) {
        return true;
      }
      const customer = this.currentUser.customer;
      if (customer) {
        return customer.can_edit_donation_amount;
      }
      return false;
    },
  },
  mounted: function () {
    this.getTerminal();
    this.getCampaigns();
    this.getGames();
  },
  methods: {
    getGames: function () {
      this.$http
        .get("games/")
        .then((resp) => {
          this.games = resp.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getCampaigns: function () {
      this.$http
        .get("campaign/")
        .then((resp) => {
          this.campaigns = resp.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getTerminal: function () {
      this.$http
        .get("terminal/" + this.$route.params.id + "/")
        .then((resp) => {
          this.terminal = resp.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    campaignIsSelected: function (id) {
      return this.terminal.campaigns.includes(id);
    },
    selectCampaign: function (campaign) {
      if (!this.campaignIsSelected(campaign.id)) {
        this.terminal.campaigns.push(campaign.id);
      } else {
        var index = this.terminal.campaigns.indexOf(campaign.id);
        if (index !== -1) {
          this.terminal.campaigns.splice(index, 1);
        }
      }
    },
    gameIsSelected: function (id) {
      return this.terminal.games.includes(id);
    },
    selectGame: function (game) {
      if (!this.gameIsSelected(game.id)) {
        this.terminal.games.push(game.id);
        // }
      } else {
        var index = this.terminal.games.indexOf(game.id);
        if (index !== -1) {
          this.terminal.games.splice(index, 1);
        }
      }
    },
    submit: function () {
      if (this.terminal) {
        let sentTerminal = { ...this.terminal };

        // Rearranging data for serializer reasons
        delete sentTerminal.payments;
        delete sentTerminal.avg_gametimesession;
        delete sentTerminal.avg_timesession;
        delete sentTerminal.avg_donation;
        delete sentTerminal.total_donations;

        sentTerminal.owner = sentTerminal.owner.id;
        sentTerminal.customer = sentTerminal.customer.id;

        this.$http
          .put("terminal/" + sentTerminal.id + "/", sentTerminal)
          .then(() => {
            this.getTerminal();
            this.$toasted.global.success({
              message: "Le terminal a bien été modifié.",
            });
          })
          .catch((err) => {
            this.$toasted.global.success({
              message: "Une erreur s'est produite durant la modification.",
            });
          });
      }
    },
  },
};
</script>
