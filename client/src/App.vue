<template>
  <v-app id="app">
    <router-view class="view" />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
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
    }
  },

  methods: {
    ...mapActions(["setUserData", "isTokenExpired"]),
    logout() {
      localStorage.clear();
      this.$store.state.isLogged = false;
      this.$router.push("/");
    },
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
  justify-content: start;
  padding: 30px;
}
.submit-btn {
  height: 45px !important;
}
</style>
