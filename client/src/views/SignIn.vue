<template>
  <div class="form-wrapper">
    <h2>Here you can <strong>sign in</strong></h2>
    <b-form @submit.prevent="submitForm">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Confirm password:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="form.confirmedPassword"
          required
          placeholder="Confirm password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-alert v-if="success" show variant="success" class="my-2"
      >User created!</b-alert
    >
    <b-alert v-if="error" show variant="danger" class="my-2"
      >Oooops. Something went wrong :( {{ error }}</b-alert
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        confirmedPassword: "",
      },
      error: "",
      success: false,
    };
  },
  methods: {
    async submitForm() {
      const url = "http://localhost:5000/api/users";

      const user = {
        email: this.form.email,
        name: this.form.name,
        password: this.form.password,
      };

      try {
        await axios.post(url, user);
        this.success = true;
        this.form.email = "";
        this.form.name = "";
        this.form.password = "";
        this.form.confirmedPassword = "";
      } catch (err) {
        this.error = `error: ${err}`;
      }
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  width: 40%;
  text-align: left;
  margin: 50px auto;
}

h2 {
  margin: 20px auto;
  text-align: center;
}

h2 strong {
  color: #42b983;
}
</style>
