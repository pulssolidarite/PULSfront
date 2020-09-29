<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Cores</h2>
              <router-link
                class="btn btn-primary mb-1"
                :to="{ name: 'addCore' }"
                ><font-awesome-icon icon="plus" class="mr-2" />Ajouter un
                core</router-link
              >
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
                    <router-link to="/cores" class="breadcrumb-link"
                      >Cores</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Tous les cores
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
              <h5 class="card-header">Cores</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Nom</th>
                        <th class="border-0">Description</th>
                        <th class="border-0">Jeux associés</th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(core, index) in cores" :key="index">
                        <td>{{ core.id }}</td>
                        <td>
                          {{ core.name }}
                        </td>
                        <td>{{ stripCharacters(core.description) }}</td>
                        <td>
                          <span v-if="core.nb_games">
                            {{ core.nb_games }} jeu<span
                              v-if="core.nb_games > 1"
                              >x</span
                            >
                          </span>
                        </td>
                        <td>
                          <router-link
                            :to="'/core/' + core.id + '/edit'"
                            class="text-primary"
                            ><font-awesome-icon icon="pen"
                          /></router-link>
                        </td>
                        <td>
                          <a
                            href=""
                            @click.prevent="deleteCore(core.id)"
                            class="text-danger"
                            ><font-awesome-icon icon="trash-alt"
                          /></a>
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
  name: "AllCores",
  data: function() {
    return {
      cores: [],
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
    };
  },
  mounted: function() {
    this.getCores();
  },
  methods: {
    stripCharacters: function(text) {
      if (text.length > 70) {
        return text.substring(0, 70) + "..";
      } else {
        return text;
      }
    },
    showDetail: function(id) {
      this.$router.push({
        name: "core",
        params: { id: id },
      });
    },
    editCore: function(id) {
      this.$router.push("/core/" + id + "/edit");
    },
    deleteCore: function(id) {
      this.$http.delete("/core/" + id + "/").then(() => {
        this.getCores();
      });
    },
    getCores: function() {
      let loader = this.$loading.show();

      this.$http
        .get("game/core/")
        .then((resp) => {
          this.cores = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des cores.",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>
