<template>
  <div>
    <h2>Welcome {{ user.name }} !</h2>
    <h1>You don't belong to any group :(</h1>
    <div class="form-wrapper">
      <b-form @submit.prevent>
        <b-form-group
          id="input-group-1"
          label="Group name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            required
            v-model="group.name"
            placeholder="Enter  group name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            required
            placeholder="Enter group password"
            type="password"
            v-model="group.password"
          ></b-form-input>
        </b-form-group>

        <b-button
          @click="createGroup"
          type="submit"
          class="mx-2"
          variant="primary"
          >Create group</b-button
        >
        <b-button type="submit" variant="success">Join group</b-button>
        <b-alert v-if="error" show variant="danger" class="my-2">{{
          error
        }}</b-alert>
        <b-alert v-if="success" show variant="success" class="my-2 info mx-0"
          >Group created!
        </b-alert>
      </b-form>
    </div>
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
      },
      group: {
        name: "",
        password: ""
      },
      error: "",
      success: false
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

      this.user.email = response.data.email;
      this.user.name = response.data.name;
    } catch (err) {
      console.log(err);
    }

    // try{
    //   const response = await axios.get('api/groups')
    // }
  },
  methods: {
    async createGroup() {
      const group = {
        name: this.group.name,
        password: this.group.password,
        members: this.user.name
      };
      try {
        const response = await axios.post("/api/groups", group);
        this.group.name = "";
        this.group.password = "";
        this.success = true;
      } catch (err) {
        this.error = err;
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  width: 40%;
  margin: 0 auto;
  margin-top: 100px;
  text-align: left;
}
</style>
