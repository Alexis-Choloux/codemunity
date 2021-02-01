<template>
  <div class="card text-dark bg-light mb-3">
    <div class="card-body">
      <div class="row text-start">
        <div class="col-md-2 text-center">
          <router-link :to="{ path: '/message/' + message._id }">
            <img :src="message.picture" width="130" class="rounded mb-4" />
          </router-link>
        </div>

        <div class="col-md-10">
          <div class="row">
            <div class="col-md-9">

              <div class="row">

              <div class="d-flex col-8">
                <router-link
                  :to="{ path: '/message/' + message._id }"
                  class="routerLink"
                >
                  <h2>
                    {{ message.subject }}
                  </h2>
                </router-link>
              </div>
              <div v-if="User == message.name" class="col-4">
                <EditMessageModal :message="message" />
              </div>
              </div>
              <router-link
                :to="{ path: '/message/' + message._id }"
                class="routerLink"
              >
                <p>{{ message.name }}</p>
                <p class="text-muted fs-6">{{ message.date }}</p>
              </router-link>
            </div>
            <div class="col-md-3 text-brown text-end">
              <button type="button" class="btn btn-brown mb-3">
                {{ message.tags }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditMessageModal from "./EditMessageModal";
import { mapGetters } from "vuex";

export default {
  name: "GetMessages",
  props: ["message"],
  components: {
    EditMessageModal,
  },
  computed: {
    ...mapGetters({
      User: "StateUser",
    }),
  },
};
</script>

<style scoped>
.card-body {
  padding-bottom: 0;
}
</style>
