<template>
  <div id="app">
    <router-view class=""/>
  </div>
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
  color: #2F2E41;
  padding: 30px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
