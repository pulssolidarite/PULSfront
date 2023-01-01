<template>
  <!-- ============================================================== -->
  <!-- login page  -->
  <!-- ============================================================== -->
  <div class="splash-container">
    <div class="card ">
      <div class="card-header text-center">
        <h3>Seth - Arcade for Good API</h3> 
        <span
          class="splash-description">Veuillez entrer vos informations de connexion.</span>
      </div>
      <div v-if="errors.visible" class="card-body border-bottom">
        <Alert
          v-if="errors.visible"
          :type="errors.type"
          :message="errors.message"
          @dismiss="errors.visible = false" />
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <input
              id="username"
              v-model="credentials.username"
              class="form-control form-control-lg"
              type="text"
              placeholder="Username">
          </div>
          <div class="form-group">
            <input
              id="password"
              v-model="credentials.password"
              class="form-control form-control-lg"
              type="password"
              placeholder="Password">
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block"
            @click.prevent="login">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      credentials: {
        username: "",
        password: "",
      },
      loading: false,
      errors: {
        visible: false,
        type: "danger",
        message: "",
      },
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

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
