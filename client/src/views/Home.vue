<template>
  <div id="home" class="layout">
    <h2>
      <strong
        >Share your expenses
        <br v-if="windowWidth < 1050 && windowWidth > 600" />
        in a <span class="primary--text">comfortable</span> way
      </strong>
    </h2>
    <p>
      Try our easy to use application <br v-if="windowWidth < 600" />for
      splitting the bills
    </p>

    <img
      id="home-img"
      class="my-auto"
      src="./../assets/img/home-photo.png"
      alt=""
      srcset=""
    />

    <div class="buttons">
      <h5 id="home-info">Create an account or log in</h5>
      <router-link to="/signup"
        ><v-btn id="signin-btn" rounded color="primary" block class="m-2 "
          >Sign Up</v-btn
        ></router-link
      >

      <router-link to="/login"
        ><v-btn
          id="login-btn"
          rounded
          outlined
          block
          color="primary"
          class="m-2 "
          >Log In</v-btn
        ></router-link
      >
    </div>
    <p>
      Want to learn more? <br v-if="windowWidth < 600" />Check the
      <strong> <router-link to="/about">about</router-link></strong> section
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    if (this.$store.state.isLogged) {
      this.$router.push("/dashboard");
    }
  },

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
#home-img {
  width: 80vw;
  // max-width: 500px;
  margin: auto 0;
}

h2 {
  font-size: 30px;
}

p {
  font-size: 20px;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 10px;
}

.v-btn {
  width: 170px;
}

.v-btn:hover {
  text-decoration: none;
}

@import "../assets/media-queries/extra-large.scss";
@import "../assets/media-queries/large.scss";
@import "../assets/media-queries/tablets.scss";
@import "../assets/media-queries/super-small.scss";
</style>
