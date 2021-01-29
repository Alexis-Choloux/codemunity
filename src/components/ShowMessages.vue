<template>
  <div class="card text-dark bg-light mb-3">
    <div class="card-body">
      <div class="row text-start">
        <div class="col-1">
          <img :src="message.picture" width="70" class="rounded" />
        </div>

        <div class="col-11">
          <div class="d-flex">
            <router-link
              :to="{ path: '/message/' + message._id }"
              class="routerLink"
            >
              <h2>
                {{ message.subject
                }}<span class="text-muted fs-6">{{ message.date }}</span>
              </h2>
            </router-link>

            <EditMessageModal :message="message" />
          </div>
          <router-link
            :to="{ path: '/message/' + message._id }"
            class="routerLink"
          >
            <p>{{ message.name }}</p>
            <p>{{ message.content }}</p>
            <p>{{ message.tags }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditMessageModal from "./EditMessageModal";

export default {
  name: "GetMessages",
  props: ["message"],
  components: {
    EditMessageModal,
  },
};
</script>
