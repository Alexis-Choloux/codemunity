<template>
<div>
  <!-- Button trigger modal -->
<button type="button" class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Publier un nouveau POST
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">

            <form
              id="form"
              @submit="checkForm"
              method="post"
            >

      <div class="modal-header">
        <input
          id="subjectInput"
          v-model="subjectInput"
          type="text"
          name="subjectInput"
          class="form-control"
          placeholder="Sujet"
        >        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


  <div class="modal-body">
  <p v-if="errors.length">
    <b>S'il vous plait, corriger les erreurs suivantes :</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>

<div class="row mb-2">
  <div class="col-4">
    <input
      id="nameInput"
      v-model="nameInput"
      type="text"
      name="nameInput"
      class="form-control"
      placeholder="Pseudo"
    >
  </div>

  <div class="col-4">
    <input
      id="cityInput"
      v-model="cityInput"
      type="text"
      name="cityInput"
      class="form-control"
      placeholder="Ville"
    >
  </div>

  <div class="col-4">
    <input
      id="countryInput"
      v-model="countryInput"
      type="text"
      name="countryInput"
      class="form-control"
      placeholder="Pays"
    >
  </div>
    </div>

    <textarea
      id="messageInput"
      v-model="messageInput"
      name="messageInput"
      class="form-control"
      placeholder="Message"
    ></textarea>

  <div class="row">
  <div class="col-6">
    <input
      id="tagsInput"
      v-model="tagsInput"
      type="text"
      name="tagsInput"
      class="form-control"
      placeholder="Tags"
    > 
  </div>

  <div class="col-6">
    <input
      id="picInput"
      v-model="picInput"
      type="text"
      name="picInput"
      class="form-control"
      placeholder="Collez, ici, l'url de votre photo"
    > 
  </div>
  </div>
    </div>


      <div class="modal-footer">
        <input
      type="submit"
      value="Poster" 
      class="btn btn-primary btn-lg"
    >
      </div>
          </form>

    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Form",
  data() {
    return {
      errors: [],
      nameInput: null,
      cityInput: null,
      countryInput: null,
      subjectInput: null,
      tagsInput: null,
      messageInput: null,
      picInput: null,
    };
  },
  methods: {
    checkForm: function (e) {
      e.preventDefault();

      if (
        this.nameInput &&
        this.cityInput &&
        this.countryInput &&
        this.subjectInput &&
        this.tagsInput &&
        this.messageInput
      ) {
        this.sendPost();
      }

      this.errors = [];

      if (!this.nameInput) {
        this.errors.push("Pseudo requis.");
      }
      if (!this.cityInput) {
        this.errors.push("Ville requis.");
      }
      if (!this.countryInput) {
        this.errors.push("Pays requis.");
      }
      if (!this.tagsInput) {
        this.errors.push("Tags requis.");
      }
      if (!this.messageInput) {
        this.errors.push("Message requis.");
      }
    },

    sendPost() {
      let message = {
        name: this.nameInput,
        city: this.cityInput,
        country: this.countryInput,
        subject: this.subjectInput,
        tags: this.tagsInput,
        content: this.messageInput,
        picture: this.picInput,
        date: moment().format("DD/MM/YYYY hh:mm"),
      };
      axios
        .post(
          "https://crudcrud.com/api/1f2570c1545a439b97cfe9ece1a09710/message",
          message
        )
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

</style>