<template>
  <div class="home">
    <b-jumbotron>
      <h1 class="mb-5">Splitting bills app</h1>

      <h5>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero vero,
        consectetur excepturi quasi quas sunt eum asperiores et odio totam
        facere sed ipsa maiores pariatur, adipisci aliquam omnis ab enim?
      </h5>

      <hr class="my-4" />

      <p v-if="!this.$store.state.userLogged">
        To continue please log in or sign up if you don't have an account.
      </p>

      <b-button
        class="m-1"
        v-if="!this.$store.state.userLogged"
        variant="primary"
        @click="logIn"
        >Log In</b-button
      >
      <b-button
        class="m-1"
        v-if="!this.$store.state.userLogged"
        variant="success"
        @click="signUp"
      >
        Sign Up</b-button
      >
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    logIn() {
      this.$router.push("login");
    },
    signUp() {
      this.$router.push("signup");
    }
  }
};
</script>

<style scoped>
.jumbotron {
  margin: 0;
}

h1 {
  font-size: 4rem;
}

a:hover {
  text-decoration: none;
}

h5 {
  width: 60%;
  margin: 0 auto;
}
</style>
