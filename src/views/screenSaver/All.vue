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
                :to="{ name: 'addScreensaverMedia' }">
                <font-awesome-icon icon="plus" class="mr-2" />
                Ajouter un média
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
                    Tous les médias
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
              <h5 class="card-header">Médias</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Nom</th>
                        <th class="border-0">Editeur</th>
                        <th class="border-0">Visibilité</th>
                        <th class="border-0">Terminaux associés</th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(media, index) in medias" :key="index">
                        <td>{{ media.id }}</td>
                        <td>
                          {{ media.title }}
                        </td>
                        <td>{{ media.visibility }}</td>
                        <td>
                          {{ media.nb_terminals }} termina<span
                            v-if="media.nb_terminals > 1"
                            >ux</span
                          ><span v-else>l</span>
                        </td>
                        <td>
                          <router-link
                            :to="{ name: 'editScreensaverMedia', params: { id: media.id } }"
                            class="text-primary">
                            <font-awesome-icon icon="pen" />
                          </router-link>
                        </td>
                        <td>
                          <a
                            href=""
                            @click.prevent="deleteMedia(media.id)"
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
  name: "AllScreenSaverMedia",
  data: function() {
    return {
      medias: {},
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.fetchMedias();
  },
  methods: {
    deleteMedia: function(id) {
      this.$http.delete("/screensaver-medias/" + id + "/").then(() => {
        this.fetchMedias();
      });
    },
    fetchMedias: function() {
      let loader = this.$loading.show();

      this.$http
        .get("screensaver-medias/")
        .then((resp) => {
          this.medias = resp.data;
        })
        .catch((err) => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des médias.",
          });
          throw err;
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>
