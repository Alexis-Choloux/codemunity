<template>
  <div class="container">
    <div class="row text-start">
      <router-link :to="{ path: '/' }" class="routerLink">
        <button class="btn btn-outline-primary rounded-pill return">
          <i class="fas fa-hiking fa-flip-horizontal"></i>Retour
        </button>
      </router-link>
    </div>

    <div class="row">
      <div class="col-md-10 offset-md-2">
        <div class="card text-dark bg-light mb-3">
          <div class="card-header text-start">
            <div class="row">
              <div class="col-9">
                <div class="d-flex">
                  <h2>
                    {{ message.name }}
                  </h2>
                  <div v-if="User == message.name" class="d-flex">
                    <router-link
                      :to="{ path: '/editmessage/' + message._id }"
                      class="routerLink ms-3"
                    >
                      <button type="button" class="btn btn-sm">
                        <i class="fas fa-pen fa-2x"></i>
                      </button>
                    </router-link>

                    <div>
                      <button
                        type="button"
                        class="btn btn-sm"
                        data-bs-toggle="modal"
                        :data-bs-target="'#deleteModal' + message._id"
                      >
                        <i class="fas fa-trash fa-2x"></i>
                      </button>
                    </div>

                    <!-- Modal -->
                    <div
                      class="modal fade"
                      :id="'deleteModal' + message._id"
                      tabindex="-1"
                      aria-labelledby="deleteModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="deleteModalLabel">
                              Suppression
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            Etes-vous sûr de vouloir prosséder à la suppression
                            de ce message ?
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-bs-dismiss="modal"
                            >
                              Fermer
                            </button>
                            <button
                              type="button"
                              class="btn btn-danger"
                              @click="deletePost()"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p>{{ message.city }} {{ message.country }}</p>
              </div>
              <div class="col-3">
                <img :src="message.picture" height="85" class="rounded" />
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row text-start">
              <p>{{ message.subject }} {{ message.date }}</p>
              <p>{{ message.content }}</p>
              <p>{{ message.tags }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Message",

  data() {
    return {
      id: this.$route.params.id,
      message: [],
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
          "https://crudcrud.com/api/1f2570c1545a439b97cfe9ece1a09710/message/" +
            this.id
        )
        .then((response) => {
          this.message = response.data;
        })
        .catch(() => {
          console.log("erreur");
        });
    },
    deletePost() {
      axios
        .delete(
          "https://crudcrud.com/api/1f2570c1545a439b97cfe9ece1a09710/message/" +
            this.message._id
        )
        .then(() => {
          window.location.href = "http://localhost:8080/";
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

<style scoped>
.fa-pen {
  color: #506c93;
  transition: 0.5s;
}
.fa-pen:hover {
  color: #683716;
  transition: 0.5s;
}
.fa-trash {
  color: #506c93;
  transition: 0.5s;
}
.fa-trash:hover {
  color: rgb(177, 31, 31);
  transition: 0.5s;
}
</style>
