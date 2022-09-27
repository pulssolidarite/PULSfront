<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Ecran de veille</h2>
              <router-link
                class="btn btn-primary mb-1"
                :to="{ name: 'screensaverSettings' }">
                <font-awesome-icon icon="plus" class="mr-2" />
                Paramétrer la diffusion
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
                    <router-link :to="{ name: 'screensaver' }" class="breadcrumb-link">Ecran de veille</router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item active" aria-current="page">
                    Diffusion des médias
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
              <h5 class="card-header">Diffusion des médias</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Client</th>
                        <th class="border-0">Media</th>
                        <th class="border-0">Visibilité</th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(broadcast, index) in broadcasts" :key="index">
                        <td>{{ broadcast.id }}</td>
                        <td>
                          {{ broadcast.customer }}
                        </td>
                        <td>
                          {{ broadcast.media }}
                        </td>
                        <td>{{ broadcast.visibility }}</td>
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
  name: "ScreenSaverBroadcasting",
  data: function() {
    return {
      broadcast: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.fetchBroadcast();
  },
  methods: {
    fetchBroadcast: function() {
      let loader = this.$loading.show();

      this.$http
        .get("screensaver-broadcasts/")
        .then((resp) => {
          this.broadcast = resp.data;
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des diffusions.",
          });
          throw err;
        })
        .finally(() => {
          loader.hide();
        });
    },
    deleteBroadcast: function(id) {
      this.$http.delete("/screensaver-broadcasts/" + id + "/").then(() => {
        this.fetchBroadcast();
      });
    },
  },
};
</script>
