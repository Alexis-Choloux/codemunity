<template>
  <div class="row">
    <div class="col-md-3 offset-md-4 text-center mt-1">
      <div class="login">
        <div>
          <form @submit.prevent="submit">
            <div>
              <label for="username" class="form-label">Pseudo :</label>
              <input type="text" class="form-control" name="username" v-model="form.username" />
            </div>
            <div>
              <label for="password" class="form-label">Mot de passe :</label>
              <input type="password" class="form-control" name="password" v-model="form.password" />
            </div>
            <button type="submit" class="btn btn-primary mt-3">Connexion</button>
          </form>
          <p v-if="showError" id="error">Pseudo ou mot de passe incorrect</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false,
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
        await this.LogIn(User);
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
