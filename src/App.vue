<template>
  <div class="container">
    <NavBar />
    <div v-if="$route.path == '/'">
      <div class="row">
        <div class="col-md-3 text-center">
          <Form />
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
          "https://crudcrud.com/api/4143cd4d6ef14f8085d339535146d35b/message"
        )
        .then((response) => {
          this.messages = response.data;
        });
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
}.routerLink:hover {
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
</style>
