<template>
  <div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Connexion</h1>
      <p class="lead">Connectez vous à l'espace d'administration.</p>
    </div>

    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>

    <form class="col-6 offset-3">
      <div class="row">
        <div class="col">
          <label for="firstName">Username</label>
          <input
            type="text"
            class="form-control"
            v-model="credentials.username"
            required
          />
          <div class="invalid-feedback">
            Valid first name is required.
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <label for="firstName">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="credentials.password"
            required
          />
          <div class="invalid-feedback">
            Password is invalid.
          </div>
        </div>
      </div>
      <div class="row my-3">
        <div class="col text-center">
          <button @click="login" class="btn btn-primary btn-lg">
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
  data: function() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      loading: false,
      error: ""
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("login", this.credentials)
        .then(() => this.$router.push("/"))
        .catch(err => {
          this.loading = false;
          this.error = err.response;
        });
    }
  }
};
</script>
