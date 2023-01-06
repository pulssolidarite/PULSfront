<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">
                Ecran de veille
              </h2>
              <router-link
                v-if="canCurrentUserEditScreensavers"
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
                    <router-link :to="{ name: 'home' }" class="breadcrumb-link">
                      Dashboard
                    </router-link>
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1" />
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'screensaverMedias' }" class="breadcrumb-link">
                      Ecran de veille
                    </router-link>
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
        v-if="errors.visible"
        :type="errors.type"
        :message="errors.message"
        @dismiss="errors.visible = false" />

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">
                Médias
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
                          Nom
                        </th>
                        <th v-if="isAdmin" class="border-0">
                          Editeur
                        </th>
                        <th v-if="isAdmin" class="border-0">
                          Portée
                        </th>
                        <th class="border-0">
                          Terminaux associés
                        </th>
                        <th class="border-0" />
                        <th v-if="canCurrentUserEditScreensavers" class="border-0" />
                        <th v-if="canCurrentUserEditScreensavers" class="border-0" />
                        <th v-if="canCurrentUserEditScreensavers" class="border-0" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(media, index) in medias" :key="index">
                        <td>{{ media.id }}</td>
                        <td>
                          {{ media.title }}
                        </td>
                        <td v-if="isAdmin">
                          {{ media.owner.username }}
                        </td>
                        <td v-if="isAdmin">
                          <span v-if="media.scope == 'private'">Privé</span>
                          <span v-else-if="media.scope == 'public'">Publique</span>
                        </td>
                        <td>
                          {{ media.nb_terminals }} termina<span
                            v-if="media.nb_terminals > 1">ux</span><span v-else>l</span>
                        </td>
                        <td>
                          <a
                            :href="'https://vimeo.com/' + media.vimeo_video_id"
                            target="_blank"
                            class="text-dark">
                            <font-awesome-icon icon="eye" />
                          </a>
                        </td>
                        <td v-if="canCurrentUserEditScreensavers">
                          <router-link
                            :to="{ name: 'editScreensaverMedia', params: { id: media.id } }"
                            class="text-primary">
                            <font-awesome-icon icon="pen" />
                          </router-link>
                        </td>
                        <td v-if="canCurrentUserEditScreensavers">
                          <a
                            href=""
                            class="text-danger"
                            @click.prevent="deleteMedia(media.id)">
                            <font-awesome-icon icon="trash-alt" />
                          </a>
                        </td>
                        <td v-if="canCurrentUserEditScreensavers">
                          <router-link
                            :to="{ name: 'addScreensaverBroadcast', params: { media_id: media.id } }"
                            class="text-primary">
                            <font-awesome-icon icon="bell" />
                          </router-link>
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
  data: function () {
    return {
      medias: {},
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
    canCurrentUserEditScreensavers() {
      return this.$store.getters.canCurrentUserEditScreensavers;
    },
  },
  mounted: function () {
    this.fetchMedias();
  },
  methods: {
    deleteMedia: function (id) {
      this.$http.delete("/screensaver-medias/" + id + "/").then(() => {
        this.fetchMedias();
      });
    },
    fetchMedias: function () {
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
