<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <router-link to="/login">Log In</router-link>
          |
          <router-link to="/signin">Sign In</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
    <p class="info">
      Development version:
      <a href="https://github.com/zyryf/splitting_bills"
        ><i class="fab fa-github"></i>Github</a
      >
    </p>
  </div>
</template>

<script>
export default {};
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
  min-height: 50vh;
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

</style>
