<template>
  <v-app id="app">
    <router-view class="view" />
    <v-btn
      v-if="$store.state.isLogged"
      color="red"
      id="logout-btn"
      block
      class="submit-btn"
      rounded
      outlined
      @click="LOG_OUT"
      >Log out</v-btn
    >
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import EndOfSession from "./components/EndOfSession";
import Timer from "./components/Timer";
export default {
  data() {
    return {};
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.state.isLogged = true;
      this.isTokenExpired();
      this.$router.push("/dashboard");
    }
  },
  methods: {
    ...mapActions(["setUserData", "isTokenExpired"]),
    ...mapMutations(["LOG_OUT"]),
  },
  components: {
    EndOfSession,
    Timer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Segoe UI, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2f2e41;
  margin: 0 auto;

  min-height: 100vh;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1000px;
  overflow: hidden;
  


}
.v-application a:hover {
  text-decoration: none;
}
.view {
  height: 100%;
  width: 100%;
}

.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
}
.submit-btn {
  height: 45px !important;
}
#logout-btn {
  min-width: 0px !important;
  width: 200px !important;
  margin: 20px auto;
}
</style>
