<template>
  <div class="home">
    <b-jumbotron>
      <h1 class="mb-5">Splitting bills app</h1>

      <h5>
        After log in you will have the ability to create your own group or join
        the existing group. Within the group all of the participating members
        are able to add,delete or edit specific expense, which affects your
        balance.
      </h5>
      <p>If you want to lear more, please go to the about section</p>

      <hr class="my-4" />

      <p v-if="!this.$store.state.isLogged">
        To continue please log in or sign up if you don't have an account.
      </p>

      <b-button
        class="m-1"
        v-if="!this.$store.state.isLogged"
        variant="primary"
        @click="logIn"
        >Log In</b-button
      >
      <b-button
        class="m-1"
        v-if="!this.$store.state.isLogged"
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

  methods: {
    logIn() {
      this.$router.push("login");
    },
    signUp() {
      this.$router.push("signup");
    },
    onHide(evt) {
      if (evt.trigger === "backdrop" || "close") {
        evt.preventDefault();
      }
    },
  },
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
