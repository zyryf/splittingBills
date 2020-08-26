<template>
  <div class="home">
    <h1 class="header">Share your expenses in a comfortable way</h1>
    <p>Try our easy to use application for splitting the bills</p>
    <div class="buttons">
      <h5>Create an account or log in</h5>
      <v-btn  rounded color="primary" block class="m-2 ">Sign Up</v-btn>
      <v-btn rounded outlined block color="primary" class="m-2 ">Log In</v-btn>
    </div>
    <p>Want to learn more? Check the <strong>about</strong> section</p>
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

<style lang="scss" scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 30px;
}

.header {
  font-size: 30px;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80%;
}

.btn {
  width: 80%;
}

</style>
