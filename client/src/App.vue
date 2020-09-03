<template>
  <v-app id="app">
    <router-view class="view" />
    <hr v-if="$store.state.isLogged" />
    <footer v-if="$store.state.isLogged">
      <Timer id="timer" />
      <v-btn
        color="black"
        id="logout-btn"
        block
        text
        class="submit-btn p-2"
        @click="LOG_OUT"
      >
        <i class="fas fa-home"></i>Log out</v-btn
      >
    </footer>

    <v-dialog v-model="$store.state.endOfSession" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"
          >Your session time has ended!</v-card-title
        >
        <v-card-text>Please log in to continue</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="reLogin()">Log in</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    logout() {
      localStorage.clear();
      this.$store.state.isLogged = false;
      this.$router.push("/");
    },
    reLogin() {
      this.$store.state.endOfSession = false;
      this.$router.push("/login");
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

  min-height: 100vh;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1000px;
  overflow: hidden;
  margin: 10px auto;
}
.v-application--wrap {
  display: flex;
  justify-content: center;
}
.v-application a:hover {
  text-decoration: none;
}
.view {
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

  margin: 5px 30px;
  flex-grow: unset;
}
footer {
  display: flex !important;
  justify-content: center;
}
hr {
  margin: auto 20px;
}

#logout-btn i {
  margin: 0 5px;
  font-size: 18px;
}
</style>
