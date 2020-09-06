<template>
  <div id="login" class="layout">
    <h2 class="mt-auto mb-8">
      <strong
        >Here you can
        <br v-if="windowWidth < 600" />
        <span class="primary--text">sign up</span>
      </strong>
    </h2>

    <form class="mb-2">
      <p>Enter your email</p>
      <v-text-field
        label="E-mail"
        outlined
        rounded
        v-model="email"
        required
        :error-messages="emailErrors"
        :dense="true"
      ></v-text-field>
      <p>Enter your nickname</p>
      <v-text-field
        label="Nickname"
        outlined
        rounded
        v-model="name"
        required
        :error-messages="nicknameErrors"
        :dense="true"
      ></v-text-field>
      <p>Enter your password</p>
      <v-text-field
        label="Password"
        color="primary"
        outlined
        rounded
        v-model="password"
        required
        :error-messages="passwordErrors"
        :type="'password'"
        :dense="true"
      ></v-text-field>
      <p>Confirm password</p>
      <v-text-field
        label="Confirmed password"
        color="primary"
        outlined
        rounded
        v-model="confirmedPassword"
        required
        :error-messages="confirmedPasswordErrors"
        :type="'password'"
        :dense="true"
      ></v-text-field>
      <v-alert v-if="isError" color="error" outlined
        >{{ errorsFromServer }}
      </v-alert>
      <v-alert
        :dense="true"
        v-if="true"
        color="success"
        outlined
        style="border-radius: 38px; width: 100%;"
        >User created!
      </v-alert>
      <v-btn
        color="primary"
        block
        class="submit-btn"
        rounded
        @click="submitForm"
        :disabled="!isFormCorect"
        >SIGN UP</v-btn
      >
    </form>

    <p class="mt-auto">
      Want to learn more? <br />Check the
      <strong> <router-link to="/about">about</router-link></strong> section
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: null,
      name: null,
      password: null,
      confirmedPassword: null,
      errorsFromServer: "",
      signUpSuccess: false,
    };
  },
  validations: {
    email: {
      required,
      email,
      isUnique: async (email) => {
        if (!email) return false;
        try {
          const users = await axios.get("/api/users");
          return !users.data.filter((user) => email === user.email).length;
        } catch {
          this.errorsFromServer =
            "Oooops. Something went wrong :( Server error!";
        }
      },
    },
    name: {
      required,
      minLength: minLength(3),
      isUnique: async (name) => {
        if (!name) return false;
        try {
          const users = await axios.get("/api/users");
          return !users.data.filter((user) => name === user.name).length;
        } catch {
          this.errorsFromServer =
            "Oooops. Something went wrong :( Server error!";
        }
      },
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmedPassword: {
      required,
      sameAs: sameAs("password"),
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
      if (this.email === null) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      this.$v.email.email &&
        !this.$v.email.isUnique &&
        errors.push("E-mail already exist");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    nicknameErrors() {
      const errors = [];
      if (this.name === null) return errors;
      !this.$v.name.minLength && errors.push("Nickname is too short");
      this.$v.name.minLength &&
        !this.$v.name.isUnique &&
        errors.push("Nickname already exist");
      !this.$v.name.required && errors.push("Nickname is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (this.password === null) return errors;
      !this.$v.password.minLength && errors.push("Password is too short");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    confirmedPasswordErrors() {
      const errors = [];
      if (this.confirmedPassword === null) return errors;
      !this.$v.confirmedPassword.sameAs &&
        errors.push("Passwords are diferent!");
      !this.$v.confirmedPassword.required && errors.push("is required");
      return errors;
    },
    isFormCorect() {
      if (
        this.email != null &&
        this.name != null &&
        this.password != null &&
        this.confirmedPassword != null &&
        this.emailErrors.length === 0 &&
        this.nicknameErrors.length === 0 &&
        this.passwordErrors.length === 0 &&
        this.confirmedPasswordErrors.length === 0
      )
        return true;
      return false;
    },
  },
  methods: {
    async submitForm() {
      const user = {
        email: this.email,
        name: this.name,
        password: this.password,
      };

      try {
        await axios.post("/api/users", user);
        this.signUpSuccess = true;
        this.email = null;
        this.name = null;
        this.password = null;
        this.confirmedPassword = null;
      } catch (err) {
        if (err.response) {
          this.errorsFromServer =
            err.response.statusText + " :( Please try again later.";
        } else {
          this.errorsFromServer =
            "Oooops. Something went wrong :( Server error!";
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
p {
  margin-bottom: 5px;
}
</style>
