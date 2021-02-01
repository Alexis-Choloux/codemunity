<template>
  <nav class="navbar navbar-expand-lg navbar-info bg-blue-dark">
    <a class="navbar-brand ms-5 me-5"
      ><img
        src="../assets/logo-codemunity.png"
        alt="codemunity-logo"
        height="70px"
    /></a>
    <p class="user">{{ User }}</p>

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
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
    ...mapGetters({
      User: "StateUser",
    }),
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
.navbar {
  margin-top: -10px;
}

.routerLinkNav {
  text-decoration: none;
  margin: 10px 120px 0 150px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  transition: 0.3s;
}
.routerLinkNav:hover {
  color: #2d415c;
  transition: 0.3s;
}

.user {
  color: rgb(185, 185, 185);
}
</style>
