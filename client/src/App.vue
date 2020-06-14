<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <router-link v-if="!this.$store.state.userLogged" to="/login"
            >Log In</router-link
          >
          |
          <router-link v-if="!this.$store.state.userLogged" to="/signup"
            >Sign Up</router-link
          >
          <router-link v-if="this.$store.state.userLogged" to="/dashboard"
            >Dashboard</router-link
          >
          <button
            v-if="this.$store.state.userLogged"
            class="logout"
            @click="logout"
          >
            Log out
          </button>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view class="p-4 router" />

    <p class="info">
      Development version:
      <a href="https://github.com/zyryf/splittingBills"
        ><i class="fab fa-github"></i>Github</a
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (localStorage.getItem("token")) this.$store.state.userLogged = true;
    const expTime = localStorage.getItem('expire time');
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.state.userLogged = false;
      this.$router.push("/");
    }
  }
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
  max-width: 1300px;
  margin: 25px auto;
  border: 2px solid #2c3e50;
  min-height: 90vh;
}

#nav a {
  color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  margin: 5px;
  transition: 0.2s;
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
