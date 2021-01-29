<template>
  <nav class="navbar navbar-expand-lg navbar-info bg-info">
    <a class="navbar-brand ms-5 me-5"><img src="../assets/logo-codemunity.png" alt="codemunity-logo" height="50px"></a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <div>
          <router-link to="/" class="routerLinkNav">Accueil</router-link>
        </div>

        <div v-if="isLoggedIn">
          <a @click="logout" class="routerLinkNav">Déconnexion</a>
        </div>
        <div v-else>
          <router-link to="/login" class="routerLinkNav">Connexion</router-link>
          <router-link to="/register" class="routerLinkNav"
            >Inscription</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.routerLinkNav {
  text-decoration: none;
  margin: 10px 15px 0 15px;
  color: rgb(92, 91, 91);
  font-size: 15px;
  font-weight: bold;
}.routerLinkNav:hover {
  color: white;
}
</style>