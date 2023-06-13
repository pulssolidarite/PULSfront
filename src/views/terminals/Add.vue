<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
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
                  <li class="breadcrumb-item active" aria-current="page">
                    Ajouter un terminal
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

      <div v-if="!formVisible" class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <h5 class="card-header">
              Ajouter un terminal
            </h5>
            <div class="card-body">
              <h4 class="mb-0">
                Choisir un client
              </h4>
              <p class="">
                Veuillez choisir à qui vous voulez attribuer ce nouveau
                terminal. Vous pouvez également créer un nouveau client.
              </p>
              <select v-model="choosenCustomer" class="custom-select mb-2">
                <option
                  v-for="_customer in customers"
                  :key="_customer.id"
                  :value="_customer">
                  {{ _customer.company }} -
                  {{ _customer.representative }}
                </option>
              </select>
              <button
                class="btn btn-primary w-100"
                @click.prevent="continueWithCustomer">
                Choisir un client existant
              </button>
              <div class="hr-text my-4 text-center">
                <span class="lead">- ou -</span>
              </div>
              <button
                class="btn btn-success w-100"
                @click.prevent="continueWithoutCustomer">
                <font-awesome-icon icon="plus" class="mr-2" /> Créer un nouveau
                client
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">
                Ajouter un terminal
              </h5>
              <a
                href=""
                class="btn btn-dark"
                @click.prevent="goBack"><font-awesome-icon icon="undo" class="mr-2" />Choisir un autre
                client</a>
            </div>
            <div class="card-body">
              <h4 v-if="choosenCustomer.company" class="mb-0">
                Client choisi
              </h4>
              <h4 v-else class="mb-0">
                Nouveau client
              </h4>
              <p>Le compte lié au nouveau terminal.</p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label
                      for="company"
                      class="col-form-label">Nom de l'entreprise</label>
                    <input
                      v-model="customer.company"
                      :disabled="choosenCustomer.company"
                      type="text"
                      class="form-control">
                  </div>
                  <div class="form-group col">
                    <label
                      for="inputEmail"
                      class="col-form-label">Contact au sein de l'entreprise</label>
                    <input
                      v-model="customer.representative"
                      type="email"
                      class="form-control"
                      placeholder="name@example.com"
                      :disabled="choosenCustomer.representative">
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">
                Paramètres de connexion
              </h4>
              <p>
                Ces identifiants doivent être sauvegardés quelque part. Vous ne
                pourrez pas les retrouver.
              </p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label
                      for="company"
                      class="col-form-label">Utilisateur</label>
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text"><font-awesome-icon
                          icon="user" /></span>
                      </div>
                      <input
                        v-model="terminal.owner.username"
                        type="text"
                        class="form-control">
                    </div>
                  </div>
                  <div class="form-group col">
                    <label
                      for="company"
                      class="col-form-label">Mot de passe</label>
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text"><font-awesome-icon
                          icon="lock" /></span>
                      </div>
                      <input
                        v-model="terminal.owner.password"
                        type="password"
                        class="form-control">
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">
                Paramètres du terminal
              </h4>
              <p>
                Différents paramètres permettant d'identifier clairement le
                terminal.
              </p>
              <form>
                <div class="form-group">
                  <label for="company" class="col-form-label">Nom du terminal</label>
                  <input
                    v-model="terminal.name"
                    type="text"
                    class="form-control">
                </div>
                <div class="form-group">
                  <label for="company" class="col-form-label">Localisation du terminal</label>
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><font-awesome-icon icon="map-pin" /></span>
                    </div>
                    <input
                      v-model="terminal.location"
                      type="text"
                      class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label for="play_timer" class="col-form-label">Temps de jeu maximum</label>
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><font-awesome-icon icon="clock" /></span>
                    </div>
                    <input
                      v-model="terminal.play_timer"
                      type="number"
                      min="0"
                      class="form-control">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-2 col-4">
                    <label for="core">Formule de dons</label>
                    <select v-model="terminal.donation_formula" class="custom-select mb-2">
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
                  <div
                    class="form-group col-md-2 col-4">
                    <label for="core">Montant min</label>
                    <input
                      v-model="terminal.donation_min_amount"
                      type="number"
                      min="1"
                      :max="terminal.donation_max_amount"
                      class="form-control">
                  </div>
                  <div class="form-group col-md-2 col-4">
                    <label for="core">Montant par défaut</label>
                    <input
                      v-model="terminal.donation_default_amount"
                      type="number"
                      :min="terminal.donation_min_amount"
                      :max="terminal.donation_max_amount"
                      class="form-control">
                  </div>
                  <div class="form-group col-md-2 col-4">
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
              </form>
            </div>
            <div class="card-body border-top">
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
                      placeholder="P6XXXXXXXXXX"
                      class="form-control"
                      aria-describedby="nameHelp">
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body border-top">
              <h4 class="mb-0">
                Campagnes & jeux
              </h4>
              <p>
                Sélectionnez les campagnes et les jeux actifs sur ce terminal.
              </p>
              <form>
                <div class="row">
                  <div v-if="campaigns" class="col">
                    <label
                      for="campaign">Campagnes actives :
                      <span
                        :class="['font-weight-bold']">({{ terminal.campaign_ids.length }}/{{
                        campaigns.length
                      }})</span></label>
                    <div class="row form-group">
                      <label
                        v-for="campaign in campaigns"
                        :key="campaign.id"
                        :for="campaign.id"
                        :class="[
                          campaignExists(campaign.id) ? 'checked' : '',
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
                            class="img-fluid"
                            :alt="campaign.name">
                        </span>
                        <h5 class="mt-2">{{ campaign.name }}</h5>
                        <p class="lead px-1">
                          {{ campaign.collected }}/{{ campaign.goal_amount }} €
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div v-if="games" class="col">
                    <label
                      for="game">Jeux actifs :
                      <span
                        :class="['font-weight-bold']">({{ terminal.game_ids.length }}/{{ games.length }})</span></label>
                    <div class="row form-group">
                      <label
                        v-for="game in games"
                        :key="game.id"
                        :for="game.id"
                        :class="[
                          gameExists(game.id) ? 'checked' : '',
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
              </form>
            </div>
            <div class="card-body text-center">
              <button
                class="btn btn-success"
                :disabled="!isValid"
                @click.prevent="addTerminal">
                Enregistrer le terminal
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
  name: "AddTerminal",
  data: function () {
    return {
      choosenCustomer: {},
      customer: {},
      terminal: {
        campaigns: [],
        games: [],
        payment_terminal: null,
        donation_formula: "Classique",
        owner: {
          username: null,
          password: null,
        },
        play_timer: 10,
        donation_min_amount: 1,
        donation_default_amount: 1,
        donation_max_amount: 1,
      },
      formVisible: false,
      customers: {},
      campaigns: {},
      games: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  computed: {
    isValid() {
      if (this.terminal == null || this.terminal.name == null || this.terminal.owner == null || this.terminal.owner.username == null || this.terminal.owner.password == null || this.terminal.payment_terminal == null) {
        return false;
      }

      if (this.terminal.donation_formula == "Partage") {
        return this.terminal.donation_share > 0 && this.terminal.donation_share <= 50;
      }

      return true;
    },
  },
  mounted: function () {
    this.getCustomers();
    this.getCampaigns();
    this.getGames();
  },
  methods: {
    getCustomers: function () {
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
    getGames: function () {
      this.$http
        .get("games/")
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
    getCampaigns: function () {
      this.$http
        .get("campaign/")
        .then((resp) => {
          this.campaigns = resp.data;
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de charger la liste des campagnes.",
          };
        });
    },
    campaignExists: function (id) {
      for (let i = 0; i < this.terminal.campaign_ids.length; i++) {
        if (this.terminal.campaign_ids[i] == id) {
          return true;
        }
      }
      return false;
    },
    selectCampaign: function (campaign) {
      if (!this.campaignExists(campaign.id)) {
        // Only if not max campaigns
        this.terminal.campaign_ids.push(campaign.id);
      } else {
        for (let index = 0; index < this.terminal.campaign_ids.length; index++) {
          const element = this.terminal.campaign_ids[index];
          if (element == campaign.id) {
            this.$delete(this.terminal.campaign_ids, index);
          }
        }
      }
    },
    gameExists: function (id) {
      for (let i = 0; i < this.terminal.game_ids.length; i++) {
        if (this.terminal.game_ids[i] == id) {
          return true;
        }
      }
      return false;
    },
    selectGame: function (game) {
      if (!this.gameExists(game.id)) {
        this.terminal.game_ids.push(game.id);
      } else {
        for (let index = 0; index < this.terminal.game_ids.length; index++) {
          const element = this.terminal.game_ids[index];
          if (element == game.id) {
            this.$delete(this.terminal.game_ids, index);
          }
        }
      }
    },
    continueWithCustomer: function () {
      if (this.choosenCustomer) {
        // Get data about customer first
        this.formVisible = true;
        this.customer = this.choosenCustomer;
      }
    },
    continueWithoutCustomer: function () {
      this.choosenCustomer = "";
      this.customer = {};
      this.formVisible = true;
    },
    goBack: function () {
      this.choosenCustomer = "";
      this.customer = {};
      this.formVisible = false;
    },
    addTerminal: function () {
      const body = {
        ...this.terminal,
      };

      if (this.customer.id) {
        body.customer_id = this.customer.id;

      } else {
        body.customer = this.customer;
      }

      this.$http
        .post("terminals/", body)

        .then((resp) => {
          this.terminal = resp.data;
          this.$toasted.global.success({
            message: "Le terminal a bien été ajouté.",
          });
          this.$router.push("/terminals");
        })

        .catch((err) => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Erreur dans l'enregistrement du terminal.",
          };

          throw err;
        });
    },
  },
};
</script>
