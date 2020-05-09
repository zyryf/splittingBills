<template>
  <div>
    <h2>Welcome {{ user.name }} !</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        name: ""
      }
    };
  },
  created() {
    if (!localStorage.getItem("token")) this.$router.push("/login");
  },
  async mounted() {
    try {
      const response = await axios.get("api/users/getuser", {
        headers: { token: localStorage.getItem("token") }
      });
      console.log(response);
      this.user.email = response.data.email;
      this.user.name = response.data.name;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
