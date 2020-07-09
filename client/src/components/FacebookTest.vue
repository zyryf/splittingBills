<template>
  <div>
    <facebook-login
      class="button"
      appId="603233220569288"
      @login="onLogin"
      @logout="onLogout"
      @get-initial-status="getUserData"
      @sdk-loaded="sdkLoaded"
    >
    </facebook-login>
  </div>
</template>

<script>
import facebookLogin from "facebook-login-vuejs";

export default {
  data() {
    return {
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      picture: "",
      FB: undefined,
    };
  },
  components: {
    facebookLogin,
  },
  methods: {
    getUserData() {
      this.FB.api("/me", "GET", { fields: "id,name,email,picture" }, (user) => {
          console.log(user)
        this.personalID = user.id;
        this.email = user.email;
        this.name = user.name;
        this.picture = user.picture.data.url;
      });
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
  },
};
</script>

<style>
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>
