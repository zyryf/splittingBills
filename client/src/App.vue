<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <router-link v-if="!this.$store.state.isLogged" to="/login"
            >Log In</router-link
          >
          |
          <router-link v-if="!this.$store.state.isLogged" to="/signup"
            >Sign Up</router-link
          >

          <router-link v-if="this.$store.state.isLogged" to="/dashboard"
            >Dashboard</router-link
          >
          <button
            v-if="this.$store.state.isLogged"
            class="logout"
            @click="logout"
          >
            Log out
          </button>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <div v-if="$store.state.isLogged" class="timer"><Timer /></div>
    <router-view class="p-4 router" />
    <EndOfSession v-if="$store.state.endOfSession" />

    <p class="info">
      Development version:
      <a href="https://github.com/zyryf/splittingBills"
        ><i class="fab fa-github"></i>Github</a
      >
    </p>
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 25px auto;
  border: 2px solid #2c3e50;
  min-height: 90vh;
  max-width: 90vw;
  min-width: 1000px;
}

#nav a {
  color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  margin: 5px;
  transition: 0.2s;
}

.timer {
  display: flex;
  justify-content: flex-end;
}

#nav a:hover {
  text-decoration: none;
  color: rgba(66, 185, 131, 0.55);
}

#nav a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
i {
  margin: 5px;
}
p a {
  font-weight: bold;
  color: #2c3e50;
}
.info {
  margin: 15px;
}

.logout {
  color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  margin: 5px;
  transition: 0.2s;
  border: none;
  background-color: transparent;
}

.logout:hover {
  text-decoration: none;
  color: rgba(66, 185, 131, 0.55);
}

.router {
  height: 85%;
  min-height: 75vh;
}
</style>
