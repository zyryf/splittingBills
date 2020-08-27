<template>
  <div id="home">
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

    <img src="./../assets/img/home-photo.png" alt="" srcset="" />

    <div class="buttons">
      <h5>Create an account or log in</h5>
      <router-link to="/signup"
        ><v-btn rounded color="primary" block class="m-2 "
          >Sign Up</v-btn
        ></router-link
      >

      <router-link to="/login"
        ><v-btn rounded outlined block color="primary" class="m-2 "
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
//mobile
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}

img {
  height: 35vh;
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
// big dev
@import "../assets/home-styles/extra-large.scss";
// super small dev
@import "../assets/home-styles/super-small.scss";
// tablets
@import "../assets/home-styles/tablets.scss";
</style>
