<template>
  <div class="end-of-session">
    <b-card border-variant="dark" header="End of session" align="center">
      <h4 class="m-3">Your session time has expired</h4>
      <p>To continue, please log in</p>
      <b-button class="m-1" variant="primary" @click="hideInfo"
        >Log In</b-button
      >
    </b-card>
  </div>
</template>
<script>
export default {
  methods: {
    hideInfo() {
      this.$router.push("/login");
      this.$store.state.isLogged = false;
      this.$store.state.endOfSession = false;
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
.end-of-session {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(98, 98, 98, 0.404);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
