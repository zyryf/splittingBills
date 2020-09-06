<template>
  <div id="login" class="layout">
    <h2 class="mt-auto mb-8">
      <strong
        >Here you can
        <br v-if="windowWidth < 600" />
        <span class="primary--text">log in</span>
      </strong>
    </h2>

    <form class="mb-2">
      <p>Enter your email</p>
      <v-text-field
        label="E-mail"
        outlined
        rounded
        v-model="user.email"
        required
        :error-messages="emailErrors"
        :dense="true"
      ></v-text-field>
      <p>Enter your password</p>
      <v-text-field
        label="Password"
        color="primary"
        class=""
        outlined
        rounded
        v-model="user.password"
        required
        :type="'password'"
        :error-messages="passwordErrors"
        :dense="true"
      ></v-text-field>
      <v-alert
        :dense="true"
        v-if="isError"
        color="error"
        style="border-radius: 38px; width: 100%;"
        outlined
        >{{ errorsFromServer }}
      </v-alert>
      <v-btn
        color="primary"
        block
        class="submit-btn"
        rounded
        @click="submitForm"
        :disabled="!isFormCorect"
        >LOG IN</v-btn
      >
      <v-btn
        color="primary"
        block
        class="submit-btn mt-4"
        rounded
        @click="logTestUserJakub1"
        >TEST USER: jakub1</v-btn
      >
      <v-btn
        color="primary"
        block
        class="submit-btn mt-4"
        rounded
        @click="logTestUserSzymon1"
        >TEST USER: szymon1</v-btn
      >
    </form>

    <p class="mt-auto">
      Want to learn more? <br />Check the
      <strong> <router-link to="/about">about</router-link></strong> section
    </p>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      errorsFromServer: "",
    };
  },
  validations: {
    user: {
      email: { required, email },
      password: { required },
    },
  },
  mounted() {
    if (this.$store.state.isLogged) {
      this.$router.push("/dashboard");
    }
  },
  computed: {
    isError() {
      return !!this.errorsFromServer;
    },
    emailErrors() {
      const errors = [];
      if (this.user.email === null) return errors;
      !this.$v.user.email.email && errors.push("Must be valid e-mail");
      !this.$v.user.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (this.user.password === null) return errors;
      !this.$v.user.password.required && errors.push("Password is required");
      return errors;
    },
    isFormCorect() {
      if (
        this.user.email != null &&
        this.user.password != null &&
        this.emailErrors.length === 0 &&
        this.passwordErrors.length === 0
      )
        return true;
      return false;
    },
  },
  methods: {
    ...mapActions(["isTokenExpired"]),
    async submitForm() {
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
          this.errorsFromServer = err.response.data.title;
        } else {
          this.errorsFromServer =
            "Oooops. Something went wrong :( Server error!";
        }
      }
    },

    logTestUserJakub1() {
      this.user = {
        email: "jakub1@op.pl",
        password: "jakub1",
      };
      this.submitForm();
    },
    logTestUserSzymon1() {
      this.user = {
        email: "szymon1@gmail.com",
        password: "szymon1",
      };
      this.submitForm();
    },
  },

  /* async logInFB() {
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
          this.errorsFromServer = err.response.data.title;
        } else {
          this.errorsFromServer = "Oooops. Something went wrong :( Server error!";
        }
      }
    }, */
};
</script>

<style lang="scss" scoped>
#ligin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
}
p {
  margin-bottom: 5px;
}
.all {
  position: relative;
}
</style>
