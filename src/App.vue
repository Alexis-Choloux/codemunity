<template>
  <div class="container-fluid">
    <NavBar />

    <div class="container mt-5">
      <div v-if="$route.path == '/'">
        <div class="row">
          <div v-if="isLoggedIn" class="col-md-3 text-center mb-4">
            <Form />
          </div>
          <div v-else>
            <router-link to="/login" type="button" class="btn btn-primary rounded-pill"
              >Connectez-vous pour publier</router-link
            >
          </div>
        </div>

        <div class="row">
          <div
            class="col-md-9 offset-md-3"
            v-for="message in messages"
            :key="message.id"
          >
            <ShowMessages :message="message" />
          </div>
        </div>
      </div>
      <div v-else>
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
import Form from "./components/Form.vue";
import ShowMessages from "./components/ShowMessages.vue";

export default {
  components: {
    NavBar,
    Form,
    ShowMessages,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    getMessages() {
      axios
        .get(
          "https://crudcrud.com/api/d05e49c9121845f4a41190c4d81bb942/message"
        )
        .then((response) => {
          this.messages = response.data;
          this.messages = this.messages.reverse();
        });
    },
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.getMessages();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* GENERAL */
.bg-blue-dark {
  background-color: #506c93;
  color: white;
}

.btn-brown {
  color: #784421;
  border: solid #784421 1px;
  transition: 0.5s;
}
.btn-brown:hover {
  color: white;
  background-color: #784421;
  transition: 0.5s;
}

.container-fluid {
  padding: 0;
}

.modal-dialog {
  position: fixed;
  margin-left: 15%;
  bottom: -30px;
  width: 70%;
}
.modal-dialog input,
.modal-dialog textarea {
  border: none;
}

.routerLink {
  text-decoration: none;
  color: black;
}
.routerLink:hover {
  color: black;
}

.return {
  width: 150px;
  font-size: 20px;
}
.return i {
  margin-right: 20px;
  font-size: 30px;
}

@media screen and (max-width: 575px) {
  .modal-content {
    width: 100vw;
    margin: 0 0 5% -22%;
    padding: 0;
  }
}
</style>
