<template>
  <div>
    <div class="row text-start">
      <router-link
        :to="{ path: '/message/' + this.$route.params.id }"
        class="routerLink"
      >
        <button class="btn btn-outline-primary rounded-pill return">
          <i class="fas fa-hiking fa-flip-horizontal"></i>Retour
        </button>
      </router-link>
    </div>

    <div class="row mt-5">
      <form id="form" @submit="checkForm" method="post">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-4">
                <fieldset disabled>
                  <input
                    id="subjectInput"
                    v-model="User"
                    type="text"
                    name="subjectInput"
                    class="form-control"
                  />
                </fieldset>
              </div>
              <div class="col-4">
                <input
                  id="cityInput"
                  v-model="city"
                  type="text"
                  name="cityInput"
                  class="form-control"
                />
              </div>
              <div class="col-4">
                <input
                  id="countryInput"
                  v-model="country"
                  type="text"
                  name="countryInput"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">
              <input
                id="subjectInput"
                v-model="subject"
                type="text"
                name="subjectInput"
                class="form-control"
              />
              <textarea
                id="messageInput"
                v-model="content"
                name="messageInput"
                class="form-control"
              ></textarea>
              <div class="row">
                <div class="col-6">
                  <input
                    id="tagsInput"
                    v-model="tags"
                    type="text"
                    name="tagsInput"
                    class="form-control"
                  />
                </div>

                <div class="col-6" v-if="picture">
                  <input
                    id="picInput"
                    v-model="picture"
                    type="text"
                    name="picInput"
                    class="form-control"
                  />
                </div>
                <div class="col-6" v-else>
                  <input
                    id="picInput"
                    v-model="picture"
                    type="text"
                    name="picInput"
                    class="form-control"
                    placeholder="Collez, ici, l'url de votre photo"
                  />
                </div>
              </div>
            </div>
            <div class="card-text"></div>
            <input
              type="submit"
              value="Modifier"
              class="btn btn-primary btn-lg"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "EditMessage",
  data() {
    return {
      errors: [],
      id: this.$route.params.id,
      name: null,
      city: null,
      country: null,
      subject: null,
      tags: null,
      content: null,
      picture: null,
    };
  },
  computed: {
    ...mapGetters({
      User: "StateUser",
    }),
  },
  methods: {
    getMessage() {
      axios
        .get(
          "https://crudcrud.com/api/d05e49c9121845f4a41190c4d81bb942/message/" +
            this.id
        )
        .then((response) => {
          let message = response.data;
          this.name = message.name;
          this.city = message.city;
          this.country = message.country;
          this.subject = message.subject;
          this.tags = message.tags;
          this.content = message.content;
          this.picture = message.picture;
        })
        .catch(() => {
          console.log("error");
        });
    },
    checkForm: function(e) {
      e.preventDefault();

      if (
        this.name &&
        this.city &&
        this.country &&
        this.subject &&
        this.tags &&
        this.content
      ) {
        this.updatePost();
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Pseudo requis.");
      }
      if (!this.city) {
        this.errors.push("Ville requis.");
      }
      if (!this.country) {
        this.errors.push("Pays requis.");
      }
      if (!this.tags) {
        this.errors.push("Tags requis.");
      }
      if (!this.content) {
        this.errors.push("Message requis.");
      }
    },
    updatePost() {
      let message = {
        name: this.name,
        city: this.city,
        country: this.country,
        subject: this.subject,
        tags: this.tags,
        content: this.content,
        picture: this.picture,
        date: moment().format("DD/MM/YYYY hh:mm"),
      };
      axios
        .put(
          "https://crudcrud.com/api/d05e49c9121845f4a41190c4d81bb942/message/" +
            this.$route.params.id,
          message
        )
        .then(() => {
          this.$router.push({ name: "Message", params: this.$route.params.id });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getMessage();
  },
};
</script>

<style scoped></style>
