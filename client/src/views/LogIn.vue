<template>
  <div id="login ">
    <h1>Here you can Log in</h1>
    <p>Enter your email</p>
    <v-text-field label="E-mail" outlined></v-text-field>
    <p>Enter your password</p>
    <v-text-field label="Password" color="primary" background-color="" outlined></v-text-field>
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

<style lang="scss" scoped>
#ligin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 30px;
}

h1 {
}
</style>
