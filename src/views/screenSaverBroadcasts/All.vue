<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Diffusion d'écran de veille</h2>
              <router-link
                class="btn btn-primary mb-1"
                :to="{ name: 'addScreensaverBroadcast' }">
                <font-awesome-icon icon="plus" class="mr-2" />
                Créer une diffusion
              </router-link>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'home' }" class="breadcrumb-link">Dashboard</router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'screensaverBroadcasts' }" class="breadcrumb-link">Ecran de veille</router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">
                    Liste de diffusion
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

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">Diffusions</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Terminal</th>
                        <th class="border-0">Média</th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(broadcast, index) in broadcasts" :key="index">
                        <td>{{ broadcast.id }}</td>
                        <td>
                          {{ broadcast.terminal.name }}
                        </td>
                        <td>
                          {{ broadcast.media.title }}
                        </td>
                        <td>
                          <a
                            href=""
                            v-if="broadcast.visible"
                            @click.prevent="deactivateBroadcast(index)"
                            class="text-success"
                            ><font-awesome-icon icon="power-off"
                          /></a>
                          <a
                            href=""
                            v-else
                            @click.prevent="activateBroadcast(index)"
                            class="text-danger"
                            ><font-awesome-icon icon="power-off"
                          /></a>
                        </td>
                        <td>
                          <a
                            href=""
                            @click.prevent="deleteBroadcast(broadcast.id)"
                            class="text-danger">
                            <font-awesome-icon icon="trash-alt"/>
                          </a>
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
  name: "AllScreenSaverBroadcasts",
  data: function() {
    return {
      broadcasts: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  computed: {
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    isCustomer: function() {
      return this.$store.getters.isCustomer;
    },
  },
  mounted: function() {
    this.fetchBroadcasts();
  },
  methods: {
    fetchBroadcasts: function() {
      let loader = this.$loading.show();

      this.$http
        .get("screensaver-broadcasts/")
        .then((resp) => {
          this.broadcasts = resp.data;
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste de diffusion.",
          });
          throw err;
        })
        .finally(() => {
          loader.hide();
        });
    },
    activateBroadcast: function(index) {
      this.$http
        .post("screensaver-broadcasts/" + this.broadcasts[index].id + "/activate/")
        .then((resp) => {
          this.$set(this.broadcasts[index], "visible", resp.data.visible);
          this.$toasted.global.success({
            message: "La diffusion a bien été activée.",
          });
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible d'activer la diffusion.",
          });
        });
    },
    deactivateBroadcast: function(index) {
      this.$http
        .post("screensaver-broadcasts/" + this.broadcasts[index].id + "/deactivate/")
        .then((resp) => {
          this.$set(this.broadcasts[index], "visible", resp.data.visible);
          this.$toasted.global.success({
            message: "La diffusion a bien été désactivée.",
          });
        })
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de désactiver la diffusion.",
          };
        });
    },
    deleteBroadcast: function(id) {
      this.$http.delete("/screensaver-broadcasts/" + id + "/").then(() => {
        this.fetchBroadcasts();
      });
    },
  },
};
</script>
