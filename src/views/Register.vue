<template>
  <div class="row">
    <div class="col-md-3 offset-md-4 text-center mt-1">
      <div class="register">
        <div>
          <form @submit.prevent="submit">
            <div>
              <label for="username" class="form-label">Pseudo :</label>
              <input
                type="text"
                class="form-control"
                name="username"
                v-model="form.username"
              />
            </div>

            <div>
              <label for="full_name" class="form-label">Nom complet :</label>
              <input
                type="text"
                class="form-control"
                name="full_name"
                v-model="form.full_name"
              />
            </div>

            <div>
              <label for="password" class="form-label">Mot de passe :</label>
              <input
                type="password"
                class="form-control"
                name="password"
                v-model="form.password"
              />
            </div>
            <button type="submit" class="btn btn-primary mt-3">
              Inscription
            </button>
          </form>
        </div>
        <p v-if="showError" id="error">Username already exists</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        username: "",
        full_name: "",
        password: "",
      },
      showError: false,
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

#error {
  color: red;
}
</style>
