<template>
  <div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">
        Connexion
      </h1>
      <p class="lead">
        Connectez vous à l'espace d'administration.
      </p>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form class="col-6 offset-3">
      <div class="row">
        <div class="col">
          <label for="firstName">Username</label>
          <input
            v-model="credentials.username"
            type="text"
            class="form-control"
            required>
          <div class="invalid-feedback">
            Valid first name is required.
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <label for="firstName">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            class="form-control"
            required>
          <div class="invalid-feedback">
            Password is invalid.
          </div>
        </div>
      </div>
      <div class="row my-3">
        <div class="col text-center">
          <button class="btn btn-primary btn-lg" @click="login">
            Se connecter
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data: function () {
    return {
      credentials: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", this.credentials)
        .then(() => {
          this.$toasted.global.success({
            message: "Nous sommes ravis de vous revoir !",
          });
        })
        .catch((error) => {
          this.$toasted.global.error(error);
        });
    },
  },
};
</script>
