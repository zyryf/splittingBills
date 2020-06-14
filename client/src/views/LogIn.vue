<template>
  <div class="form-wrapper">
    <h2>Here you can <strong>log in </strong></h2>
    <b-form @submit.prevent="submitForm">
      <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="user.name"
          required
          placeholder="Enter name"
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
    </b-form>

    <b-alert v-if="error" show variant="danger" class="my-2">{{
      error
    }}</b-alert>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    async submitForm() {
      this.error = "";
      try {
        const res = await axios.post("/api/login", this.user);
        this.user.name = "";
        this.user.password = "";

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("expire time", res.data.expTime);

        this.$store.state.userLogged = true;
        this.$router.push("/dashboard");
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.title;
        } else {
          this.error = "Oooops. Something went wrong :( Server error!";
        }
      }
    },
 
  }
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
</style>
