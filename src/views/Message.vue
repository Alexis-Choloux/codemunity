<template>
  <div class="container">
    <div class="row text-start">
      <router-link :to="{ path: '/' }" class="routerLink">
        <button class="btn btn-outline-info rounded-pill return">
          <i class="fas fa-hiking fa-flip-horizontal"></i>Retour
        </button>
      </router-link>
    </div>

    <div class="row">
      <div class="col-md-9 offset-md-3">
        <div class="card text-dark bg-light mb-3">
          <div class="card-header text-start">
            <div class="row">
              <div class="col-9">
                <div class="d-flex">
                  <h2>
                    {{ message.name }}
                  </h2>
                  <router-link
                    :to="{ path: '/editmessage/' + message._id }"
                    class="routerLink"
                  >
                    <i class="fas fa-pen fa-2x"></i>
                  </router-link>

                  <div>
                    <button
                      type="button"
                      class="btn btn-light btn-sm"
                      data-bs-toggle="modal"
                      :data-bs-target="'#deleteModal' + message._id"
                    >
                      <i class="fas fa-trash fa-2x"></i>
                    </button>

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

export default {
  name: "Message",

  data() {
    return {
      id: this.$route.params.id,
      message: [],
    };
  },
  methods: {
    getMessage() {
      axios
        .get(
          "https://crudcrud.com/api/4143cd4d6ef14f8085d339535146d35b/message/" +
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
          "https://crudcrud.com/api/4143cd4d6ef14f8085d339535146d35b/message/" +
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

<style scoped></style>
