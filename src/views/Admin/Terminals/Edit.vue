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
                    <router-link to="/home" class="breadcrumb-link"
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
                      :to="'/terminal/' + terminal.id"
                      class="breadcrumb-link"
                      >{{ terminal.name }}</router-link
                    >
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

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between"
            >
              <h5 class="mb-0">Ajouter un terminal</h5>
            </div>
            <div class="card-body" v-if="terminal.owner">
              <h4>Informations sur le terminal</h4>
              <div class="row">
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
                      v-model="terminal.owner.customer.company"
                    />
                    <small id="nameHelp" class="form-text text-muted"
                      >Le client rattaché au terminal.</small
                    >
                  </div>
                </div>
              </div>
              <div class="row">
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
                  <div class="form-group">
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
                </div>
              </div>
            </div>

            <div class="card-body border-top">
              <h4>Campagnes & jeux</h4>
              <div class="row">
                <div class="col" v-if="terminal.campaigns">
                  <label for="campaign"
                    >Campagnes actives :
                    <span
                      :class="[
                        terminal.campaigns.length > maxCampaigns ||
                        terminal.campaigns.length == 0
                          ? 'text-danger'
                          : '',
                        'font-weight-bold'
                      ]"
                      >({{ terminal.campaigns.length }}/{{
                        maxCampaigns
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
                        'mx-2'
                      ]"
                      @click.prevent="selectCampaign(campaign)"
                    >
                      <input type="radio" :value="campaign.id" />
                      <span
                        :class="[
                          'selected',
                          'd-flex',
                          'align-items-center',
                          'justify-content-center'
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
                  <label for="game"
                    >Jeux actifs :
                    <span
                      :class="[
                        terminal.games.length > maxGames ||
                        terminal.games.length == 0
                          ? 'text-danger'
                          : '',
                        'font-weight-bold'
                      ]"
                      >({{ terminal.games.length }}/{{ maxGames }})</span
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
                        'mx-2'
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
                          'justify-content-center'
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
            </div>

            <div class="card-body text-center">
              <button class="btn btn-success" @click.prevent="edit">
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
  data: function() {
    return {
      terminal: "",
      campaigns: {},
      games: {},
      user: {},
      customer: {},
      maxGames: this.$store.state.maxGames,
      maxCampaigns: this.$store.state.maxCampaigns,
      errors: {
        visible: false,
        type: "danger",
        message: ""
      }
    };
  },
  mounted: function() {
    this.getTerminal();
    this.getCampaigns();
    this.getGames();
  },
  methods: {
    getGames: function() {
      this.$http
        .get("game/")
        .then(resp => {
          this.games = resp.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getCampaigns: function() {
      this.$http
        .get("campaign/")
        .then(resp => {
          this.campaigns = resp.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getTerminal: function() {
      this.$http
        .get("terminal/" + this.$route.params.id + "/")
        .then(resp => {
          this.terminal = resp.data;
          //   this.$http.get("user/" + this.terminal.owner + "/").then(resp => {
          //     this.user = resp.data;
          //     this.$http
          //       .get("customer/" + this.user.customer + "/")
          //       .then(resp => {
          //         this.customer = resp.data;
          //       });
          //   });
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    campaignExists: function(id) {
      for (let i = 0; i < this.terminal.campaigns.length; i++) {
        if (this.terminal.campaigns[i].id == id) {
          return true;
        }
      }
      return false;
    },
    selectCampaign: function(campaign) {
      if (!this.campaignExists(campaign.id)) {
        if (this.terminal.campaigns.length <= this.maxCampaigns) {
          // Only if not max campaigns
          this.terminal.campaigns.push(campaign);
        }
      } else {
        for (let index = 0; index < this.terminal.campaigns.length; index++) {
          const element = this.terminal.campaigns[index];
          if (element.id == campaign.id) {
            this.$delete(this.terminal.campaigns, index);
          }
        }
      }
    },
    gameExists: function(id) {
      for (let i = 0; i < this.terminal.games.length; i++) {
        if (this.terminal.games[i].id == id) {
          return true;
        }
      }
      return false;
    },
    selectGame: function(game) {
      if (!this.gameExists(game.id)) {
        if (this.terminal.games.length <= this.maxGames) {
          this.terminal.games.push(game);
        }
      } else {
        for (let index = 0; index < this.terminal.games.length; index++) {
          const element = this.terminal.games[index];
          if (element.id == game.id) {
            this.$delete(this.terminal.games, index);
          }
        }
      }
    },
    edit: function() {
      if (this.terminal) {
        let sentTerminal = { ...this.terminal };
        // Rearranging data for serializer reasons
        delete sentTerminal.payments;
        delete sentTerminal.avg_gametimesession;
        delete sentTerminal.avg_timesession;
        delete sentTerminal.avg_donation;
        delete sentTerminal.total_donations;

        sentTerminal.owner = sentTerminal.owner.id;
        let games_id = [];
        for (let index = 0; index < sentTerminal.games.length; index++) {
          const element = sentTerminal.games[index].id;
          games_id.push(element);
        }
        sentTerminal.games = games_id;
        let campaigns_id = [];
        for (let index = 0; index < sentTerminal.campaigns.length; index++) {
          const element = sentTerminal.campaigns[index].id;
          campaigns_id.push(element);
        }
        sentTerminal.campaigns = campaigns_id;

        this.$http
          .put("terminal/" + sentTerminal.id + "/", sentTerminal)
          .then(() => {
            this.getTerminal();
            this.errors = {
              visible: true,
              type: "success",
              message: "Modification réussie."
            };
          })
          .catch(err => {
            this.errors = {
              visible: true,
              type: "danger",
              message: err
            };
          });
      }
    }
  }
};
</script>
