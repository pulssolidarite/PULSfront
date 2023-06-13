<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Terminaux
              </h2>
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
                      to="/terminals"
                      class="breadcrumb-link">
                      Terminaux
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
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
                    class="mx-1" />
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
        v-if="errors.visible"
        :type="errors.type"
        :message="errors.message"
        @dismiss="errors.visible = false" />

      <div v-if="terminal" class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">
                Editer un terminal
              </h5>
            </div>
            <div v-if="terminal.owner" class="card-body">
              <h4>Informations sur le terminal</h4>
              <div v-if="isAdmin" class="row">
                <div class="col-6">
                  <div class="form-group w-100">
                    <label for="name">Nom du terminal</label>
                    <input
                      v-model="terminal.name"
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp">
                    <small
                      id="nameHelp"
                      class="form-text text-muted">Donnez un nom cohérent au terminal.</small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group w-100">
                    <label for="owner">Client</label>
                    <input
                      v-model="terminal.customer.company"
                      type="text"
                      class="form-control"
                      disabled
                      aria-describedby="ownerHelp">
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
                        <span
                          class="input-group-text"><font-awesome-icon
                          icon="user" /></span>
                      </div>
                      <input
                        v-model="terminal.owner.username"
                        type="text"
                        class="form-control"
                        disabled
                        aria-describedby="ownerHelp">
                    </div>
                    <small
                      id="nameHelp"
                      class="form-text text-muted">Le username attribué au terminal.</small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group w-100">
                    <label for="owner">Password</label>
                    <small
                      id="nameHelp"
                      class="form-text text-muted">Par définition, il n'est pas possible de changer ou de
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
                        <span
                          class="input-group-text"><font-awesome-icon
                          icon="map-pin" /></span>
                      </div>
                      <input
                        v-model="terminal.location"
                        type="text"
                        class="form-control"
                        aria-describedby="helpId"
                        placeholder="Adresse ou coordonnées de la borne">
                    </div>
                    <small
                      id="helpId"
                      class="form-text text-muted">Localisation de la borne.</small>
                  </div>
                  <div class="form-group">
                    <label
                      for="play_timer"
                      class="col-form-label">Temps de jeu maximum</label>
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text"><font-awesome-icon
                          icon="clock" /></span>
                      </div>
                      <input
                        v-model="terminal.play_timer"
                        type="number"
                        min="0"
                        class="form-control">
                    </div>
                  </div>
                  <div v-if="canCurrentUserEditDonationFormula" class="row">
                    <div class="form-group col-md-2 col-4">
                      <label for="core">Formule de dons</label>
                      <select v-model="terminal.donation_formula" class="custom-select mb-2" @change="onDonationFormulaChange">
                        <option value="Classique" selected>
                          Classique
                        </option>
                        <option value="Gratuit">
                          Gratuit
                        </option>
                        <option value="Mécénat">
                          Mécénat
                        </option>
                        <option value="Partage">
                          Partage
                        </option>
                      </select>
                    </div>
                    <div
                      v-if="terminal.donation_formula == 'Partage'"
                      class="form-group col-md-2 col-4">
                      <label for="donation-share">Pourcentage du don à reverser au propriétaire de la borne</label>
                      <input
                        id="donation-share"
                        v-model="terminal.donation_share"
                        type="number"
                        class="form-control"
                        :class="{ 'is-invalid': terminal.donation_share < 1 || terminal.donation_share > 50 }"
                        min="1"
                        max="50">
                      <span v-if="terminal.donation_share > 50" class="invalid-tooltip">
                        Le maximum est de 50%
                      </span>
                      <span v-if="terminal.donation_share < 1" class="invalid-tooltip">
                        Le minimum est de 1%
                      </span>
                    </div>
                    <div v-if="canCurrentUserEditDonationAmount" class="form-group col-md-2 col-4">
                      <label for="core">Montant min</label>
                      <input
                        v-model="terminal.donation_min_amount"
                        type="number"
                        min="1"
                        :max="terminal.donation_max_amount"
                        class="form-control">
                    </div>
                    <div v-if="canCurrentUserEditDonationAmount" class="form-group col-md-2 col-4">
                      <label for="core">Montant par défaut</label>
                      <input
                        v-model="terminal.donation_default_amount"
                        type="number"
                        :min="terminal.donation_min_amount"
                        :max="terminal.donation_max_amount"
                        class="form-control">
                    </div>
                    <div v-if="canCurrentUserEditDonationAmount" class="form-group col-md-2 col-4">
                      <label for="core">Montant max</label>
                      <input
                        v-model="terminal.donation_max_amount"
                        type="number"
                        :min="terminal.donation_min_amount"
                        class="form-control">
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-12">
                      <label>Texte personnalisé</label>
                      <textarea
                        v-model="terminal.free_mode_text"
                        class="form-control"
                        placeholder="Vous pouvez jouer gratuitement..." />
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
                    <small
                      id="nameHelp"
                      class="form-text text-muted">Indiquer le réfèrence fournisseur du terminal de paiement </small>
                    <input
                      v-model="terminal.payment_terminal"
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp">
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body border-top">
              <h4>Campagnes & jeux</h4>
              <div class="row">
                <div v-if="terminal.campaigns" class="col">
                  <label
                    for="campaign">Campagnes actives :
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
                      @click.prevent="selectCampaign(campaign)">
                      <input type="radio" :value="campaign.id">
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
                        <img
                          :src="campaign.logo"
                          height="70"
                          :alt="campaign.name">
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
                <div v-if="terminal.games" class="col">
                  <label for="game">Jeux actifs :</label>
                  <div class="row form-group">
                    <label
                      v-for="game in games"
                      :key="game.id"
                      :for="game.id"
                      :class="[
                        gameIsSelected(game.id) ? 'checked' : '',
                        'card-checkbox',
                        'col-3',
                        'py-3',
                        'mx-2',
                      ]"
                      @click.prevent="selectGame(game)">
                      <input type="radio" :value="game.id">
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
                        <img :src="game.logo" height="70" :alt="game.name">
                      </span>
                      <h4 class="mt-2">{{ game.name }}</h4>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body text-center">
              <button
                class="btn btn-success"
                :disabled="!isValid"
                @click.prevent="submit">
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
    isValid() {
      return this.terminal.donation_share > 0 && this.terminal.donation_share <= 50;
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
          this.$toasted.global.error({
            message: "Erreur lors de la récupération des informations des jeux",
          });
          throw err;
        });
    },
    getCampaigns: function () {
      this.$http
        .get("campaign/")
        .then((resp) => {
          this.campaigns = resp.data;
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Erreur lors de la récupération des informations des campagnes",
          });
          throw err;
        });
    },
    getTerminal: function () {
      this.$http
        .get("terminals/" + this.$route.params.id + "/")
        .then((resp) => {
          this.terminal = resp.data;
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Erreur lors de la récupération des informations du terminal",
          });
          throw err;
        });
    },
    onDonationFormulaChange() {
      if (this.terminal.donation_formula != "Partage") {
        this.terminal.donation_share = 50;
      }
    },
    campaignIsSelected: function (id) {
      return this.terminal.campaign_ids.includes(id);
    },
    selectCampaign: function (campaign) {
      if (!this.campaignIsSelected(campaign.id)) {
        this.terminal.campaign_ids.push(campaign.id);
      } else {
        var index = this.terminal.campaign_ids.indexOf(campaign.id);
        if (index !== -1) {
          this.terminal.campaign_ids.splice(index, 1);
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
        let loader = this.$loading.show();

        const submittedTerminal = {
          campaign_ids: this.terminal.campaign_ids,
          games: this.terminal.games,
          donation_default_amount: this.terminal.donation_default_amount,
          donation_formula: this.terminal.donation_formula,
          donation_max_amount: this.terminal.donation_max_amount,
          donation_min_amount: this.terminal.donation_min_amount,
          donation_share: this.terminal.donation_share,
          free_mode_text: this.terminal.free_mode_text,
          location: this.terminal.location,
          name: this.terminal.name,
          payment_terminal: this.terminal.payment_terminal,
          play_timer: this.terminal.play_timer,
        };

        this.$http
          .patch("terminals/" + this.terminal.id + "/", submittedTerminal)
          .then(() => {
            this.getTerminal();
            this.$toasted.global.success({
              message: "Le terminal a bien été modifié.",
            });
          })
          .catch((err) => {
            this.$toasted.global.error({
              message: "Erreur lors de l'enregistrement de vos modifications",
            });
            throw err;
          })
          .finally(() => {
            loader.hide();
          });
      }
    },
  },
};
</script>
