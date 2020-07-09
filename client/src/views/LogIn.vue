<template>
  <div class="form-wrapper">
    <h2>Here you can <strong>log in </strong></h2>
    <b-form @submit.prevent="submitForm">
      <b-form-group id="input-group-1" label="Your Email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="user.email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="user.password"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Log in</b-button>

      <b-button class="ml-4 fb-color" @click="logInFB"
        >Log in with Facebook</b-button
      >
    </b-form>

    <b-alert v-if="error" show variant="danger" class="my-2">{{
      error
    }}</b-alert>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    ...mapActions(["isTokenExpired"]),
    async submitForm() {
      this.error = "";
      try {
        const res = await axios.post("/api/login", this.user);
        this.user.email = "";
        this.user.password = "";

        localStorage.setItem("token", res.data.token);
        this.$store.state.isLogged = true;
        this.isTokenExpired();

        this.$router.push("/dashboard");
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.title;
        } else {
          this.error = "Oooops. Something went wrong :( Server error!";
        }
      }
    },
    async logInFB() {
      FB.login();
      // To poniżej, to powinna być funkcja w storze, i jeżeli pzy odpaleniu appki jest connected też powinna się wywoływać
      const accessToken = FB.getAccessToken();
      console.log(accessToken);
      try {
        const res = axios.post("/api/login/fb", { accessToken: accessToken });
        // w odpowiedzi powinniśmy dostać nowy token przypisany do usera ale już stworzony na BackEndzie przez serwer
        localStorage.setItem("token", res.data.token);
        this.$store.state.isLogged = true;
        this.isTokenExpired();
        this.$router.push("/dashboard");
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.title;
        } else {
          this.error = "Oooops. Something went wrong :( Server error!";
        }
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

h2 strong {
  color: #42b983;
}
.form-wrapper {
  width: 40%;
  margin: 50px auto;
  text-align: left;
}

.fb-color {
  background-color: #3b5998;
  border: none;
}
.fb-color:hover {
  background-color: #527bd3;
}
</style>
