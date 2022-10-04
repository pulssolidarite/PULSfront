<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
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
        :type="errors.type"
        :message="errors.message"
        v-if="errors.visible"
        @dismiss="errors.visible = false"
      />

      <div class="row" v-if="!formVisible">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <h5 class="card-header">Ajouter un terminal</h5>
            <div class="card-body">
              <h4 class="mb-0">Choisir un client</h4>
              <p class="">
                Veuillez choisir à qui vous voulez attribuer ce nouveau
                terminal. Vous pouvez également créer un nouveau client.
              </p>
              <select class="custom-select mb-2" v-model="choosenCustomer">
                <option
                  v-for="customer in customers"
                  :value="customer"
                  :key="customer.id"
                  >{{ customer.company }} -
                  {{ customer.representative }}</option
                >
              </select>
              <button
                class="btn btn-primary w-100"
                @click.prevent="continueWithCustomer"
              >
                Choisir un client existant
              </button>
              <div class="hr-text my-4 text-center">
                <span class="lead">- ou -</span>
              </div>
              <button
                class="btn btn-success w-100"
                @click.prevent="continueWithoutCustomer"
              >
                <font-awesome-icon icon="plus" class="mr-2" /> Créer un nouveau
                client
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between"
            >
              <h5 class="mb-0">Ajouter un terminal</h5>
              <a href="" class="btn btn-dark" @click.prevent="goBack"
                ><font-awesome-icon icon="undo" class="mr-2" />Choisir un autre
                client</a
              >
            </div>
            <div class="card-body">
              <h4 class="mb-0" v-if="choosenCustomer.company">Client choisi</h4>
              <h4 class="mb-0" v-else>Nouveau client</h4>
              <p>Le compte lié au nouveau terminal.</p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="company" class="col-form-label"
                      >Nom de l'entreprise</label
                    >
                    <input
                      :disabled="choosenCustomer.company"
                      v-model="customer.company"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group col">
                    <label for="inputEmail" class="col-form-label"
                      >Contact au sein de l'entreprise</label
                    >
                    <input
                      type="email"
                      class="form-control"
                      placeholder="name@example.com"
                      :disabled="choosenCustomer.representative"
                      v-model="customer.representative"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6 col-12">
                    <label for="sales_type">Type de vente</label>
                    <select
                      class="custom-select"
                      :disabled="choosenCustomer.sales_type"
                      v-model="customer.sales_type"
                    >
                      <option value="A" :checked="customer.sales_type == 'A'"
                        >Achat</option
                      >
                      <option value="L" :checked="customer.sales_type == 'L'"
                        >Location</option
                      >
                    </select>
                  </div>
                  <div class="form-group col-md-6 col-12">
                    <label for="sales_type">Contrat de maintenance</label>
                    <select
                      class="custom-select"
                      :disabled="choosenCustomer.maintenance_type"
                      v-model="customer.maintenance_type"
                    >
                      <option
                        value="option1"
                        :checked="customer.sales_type == 'option1'"
                        >Option 1</option
                      >
                      <option
                        value="option2"
                        :checked="customer.sales_type == 'option2'"
                        >Option 2</option
                      >
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">Paramètres de connexion</h4>
              <p>
                Ces identifiants doivent être sauvegardés quelque part. Vous ne
                pourrez pas les retrouver.
              </p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="company" class="col-form-label"
                      >Utilisateur</label
                    >
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><font-awesome-icon icon="user"
                        /></span>
                      </div>
                      <input
                        v-model="user.username"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group col">
                    <label for="company" class="col-form-label"
                      >Mot de passe</label
                    >
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><font-awesome-icon icon="lock"
                        /></span>
                      </div>
                      <input
                        v-model="user.password"
                        type="password"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">Paramètres du terminal</h4>
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
                    class="form-control" />
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
                      class="form-control" />
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
                      class="form-control" />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6 col-12">
                    <label for="core">Formule de dons</label>
                    <select class="custom-select mb-2"  v-model="terminal.donation_formula" >
                      <option value ="Classique"> Classique </option>
                      <option value ="Gratuit"> Gratuit </option>
                      <option  value ="Mécénat" >  Mécénat </option>
                      <option  value ="Partage" >Partage  </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6 col-12">
                    <label for="core">Pourcentage du don à reverser au propriétaire de la borne</label>
                    <input type="number" class="form-control" min="0" max="100" v-model="terminal.donation_share" :disabled="terminal.donation_formula != 'Partage'">
                  </div>
                </div>
				        <div class="mb-3">
                  <small id="nameHelp" class="form-text text-muted">Texte personnalisé</small>
                  <textarea
                    class="form-control"
                    v-model="terminal.free_mode_text"
                    placeholder="Vous pouvez jouer gratuitement...">
                  </textarea>
                </div>
              </form>
            </div>
             <div class="card-body border-top">
            <div class="row">
              <div class="col-6">
                  <div class="form-group w-100">
                    <h4>Numéro du Terminal de paiement</h4>
                    <small id="nameHelp" class="form-text text-muted"
                      >Indiquer le réfèrence fournisseur du terminal de paiement </small
                    >
                    <input
                      type="text"
                      placeholder="P6XXXXXXXXXX"
                      class="form-control"
                      aria-describedby="nameHelp"
                      v-model="terminal.payment_terminal"
                    />
                  </div>
                </div>
                </div>
            </div>



            <div class="card-body border-top">
              <h4 class="mb-0">Campagnes & jeux</h4>
              <p>
                Sélectionnez les campagnes et les jeux actifs sur ce terminal.
              </p>
              <form>
                <div class="row">
                  <div class="col" v-if="campaigns">
                    <label for="campaign"
                      >Campagnes actives :
                      <span :class="['font-weight-bold']"
                        >({{ terminal.campaigns.length }}/{{
                          campaigns.length
                        }})</span
                      ></label
                    >
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
                            class="img-fluid"
                            :alt="campaign.name"
                          />
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
                  <div class="col" v-if="games">
                    <label for="game"
                      >Jeux actifs :
                      <span :class="['font-weight-bold']"
                        >({{ terminal.games.length }}/{{ games.length }})</span
                      ></label
                    >
                    <div class="row form-group">
                      <label
                        v-for="game in games"
                        :for="game.id"
                        :class="[
                          gameExists(game.id) ? 'checked' : '',
                          'card-checkbox',
                          'col-3',
                          'py-3',
                          'mx-2',
                        ]"
                        :key="game.id"
                        @click.prevent="selectGame(game)"
                      >
                        <input type="radio" :value="game.id" />
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
                          <img :src="game.logo" height="70" :alt="game.name" />
                        </span>
                        <h4 class="mt-2">{{ game.name }}</h4>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="addTerminal">
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
  data: function() {
    return {
      choosenCustomer: {},
      customer: {},
      user: {},
      terminal: {
        campaigns: [],
        games: [],
        payment_terminal: null,
        donation_formula: 'Classique',
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
  mounted: function() {
    this.getCustomers();
    this.getCampaigns();
    this.getGames();
  },
  methods: {
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
    getCampaigns: function() {
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
    campaignExists: function(id) {
      for (let i = 0; i < this.terminal.campaigns.length; i++) {
        if (this.terminal.campaigns[i] == id) {
          return true;
        }
      }
      return false;
    },
    selectCampaign: function(campaign) {
      if (!this.campaignExists(campaign.id)) {
        // Only if not max campaigns
        this.terminal.campaigns.push(campaign.id);
      } else {
        for (let index = 0; index < this.terminal.campaigns.length; index++) {
          const element = this.terminal.campaigns[index];
          if (element == campaign.id) {
            this.$delete(this.terminal.campaigns, index);
          }
        }
      }
    },
    gameExists: function(id) {
      for (let i = 0; i < this.terminal.games.length; i++) {
        if (this.terminal.games[i] == id) {
          return true;
        }
      }
      return false;
    },
    selectGame: function(game) {
      if (!this.gameExists(game.id)) {
        this.terminal.games.push(game.id);
      } else {
        for (let index = 0; index < this.terminal.games.length; index++) {
          const element = this.terminal.games[index];
          if (element == game.id) {
            this.$delete(this.terminal.games, index);
          }
        }
      }
    },
    continueWithCustomer: function() {
      if (this.choosenCustomer) {
        // Get data about customer first
        this.formVisible = true;
        this.customer = this.choosenCustomer;
      }
    },
    continueWithoutCustomer: function() {
      this.choosenCustomer = "";
      this.customer = {};
      this.formVisible = true;
    },
    goBack: function() {
      this.choosenCustomer = "";
      this.customer = {};
      this.formVisible = false;
    },
    addTerminal: function() {
      if (this.choosenCustomer.id && this.customer.id) {
        this.user.customer = this.customer.id;
        this.$http
          .post("user/", this.user)
          .then((resp) => {
            if (resp) {
              this.user = resp.data;
              this.terminal.owner = this.user.id;

              this.$http
                .post("terminal/", this.terminal)
                .then((resp) => {
                  this.terminal = resp.data;
                  this.$toasted.global.success({
                    message: "Le terminal a bien été ajouté.",
                  });
                  this.$router.push("/terminals");
                })
                .catch((err) => {
                  if (err.response.data) {
                    Object.values(err.response.data).forEach((element) => {
                      this.$toasted.global.error({ message: element });
                    });
                  } else {
                    this.$toasted.global.error({
                      message: "Erreur dans l'enregistrement du terminal.",
                    });
                  }

                  // We also delete the newly created user
                  this.$http.delete("user/" + this.user.id + "/").catch(() => {
                    this.$toasted.global.error({
                      message:
                        "Impossible de supprimer l'utilisateur tout juste créé. Vérifiez si le serveur est opérationnelle.",
                    });
                  });
                });
            }
          })
          .catch((err) => {
            if (err.response.data) {
              Object.values(err.response.data).forEach((element) => {
                this.$toasted.global.error({ message: element });
              });
            }
          });
      } else if (this.customer && this.user && this.terminal) {
        this.$http
          .post("customer/", this.customer)
          .then((resp) => {
            this.customer = resp.data;
            this.user.customer = this.customer.id;
            this.$http
              .post("user/", this.user)
              .then((resp) => {
                this.user = resp.data;
                this.terminal.owner = this.user.id;
                this.$http
                  .post("terminal/", this.terminal)
                  .then((resp) => {
                    this.terminal = resp.data;
                    this.$router.push({
                      name: "terminals",
                    });
                  })
                  .catch(() => {
                    this.errors = {
                      visible: true,
                      type: "danger",
                      message: "Erreur dans l'enregistrement du terminal.",
                    };
                  });
              })
              .catch(() => {
                this.errors = {
                  visible: true,
                  type: "danger",
                  message: "Erreur dans l'enregistrement de l'utilisateur.",
                };
              });
          })
          .catch(() => {
            this.errors = {
              visible: true,
              type: "danger",
              message: "Erreur dans l'enregistrement du client.",
            };
          });
      }
    },
  },
};
</script>
