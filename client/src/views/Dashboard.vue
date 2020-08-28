<template>
  <div id="dashboard" class="layout">
    <h2>
      Welcome
      <strong class="primary--text">{{ getUserName }}</strong
      >!
    </h2>

    <v-text-field
      class=""
      label="Search Groups"
      outlined
      rounded
      v-model="searchField"
      required
    ></v-text-field>

    <div class="groups-box">
      <group
        v-for="(name, index) in getUserGroups"
        :key="index"
        :groupname="name"
        v-on:delete="askToDelete"
      ></group>
    </div>
    <form class="mt-8">
      <h5 class="mb-4">Create group or join one</h5>
      <v-text-field
        label="Group Name"
        outlined
        rounded
        v-model="name"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        outlined
        rounded
        v-model="password"
        required
      ></v-text-field>

      <div class="form-buttons">
        <v-btn
          color="primary"
          block
          class="submit-btn"
          rounded
          @click="createGroup"
          :disabled="false"
          >Create</v-btn
        >
        <v-btn
          color="primary"
          block
          class="submit-btn"
          rounded
          outlined
          @click="joinGroup"
          :disabled="false"
          >Join</v-btn
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
const jwtDecode = require("jwt-decode");

import Group from "../components/Group";

export default {
  data() {
    return {
      searchField: "",
      name: "",
      password: "",
      error: "",
      success: "",
      message: false,
      deleteWhenEmpty: null,
      groupToDelete: "",
    };
  },
  components: {
    Group,
  },
  validations: {
    name: {
      required,
    },
    password: {
      required,
    },
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    }
  },
  async mounted() {
    await this.setUserData();
  },
  methods: {
    ...mapActions(["setUserData", "isTokenExpired"]),
    clearMessages() {
      setTimeout(() => {
        this.error = "";
        this.success = "";
      }, 3000);
    },

    clearFormInputs() {
      this.name = "";
      this.password = "";
    },
    async createGroup() {
      const group = {
        name: this.name,
        password: this.password,
        members: this.getUserName,
      };
      try {
        const response = await axios.post("/api/groups", group, {
          headers: { token: localStorage.getItem("token") },
        });
        this.clearFormInputs();
        this.success = response.data.title;
        this.clearMessages();
        this.setUserData();
      } catch (err) {
        this.clearFormInputs();
        this.error = err.response.data.title;
        this.clearMessages();
      }
    },

    async joinGroup() {
      console.log(this.getUserGroups);
      try {
        const response = await axios.patch(
          `api/users/join/${this.name}/${this.getUserName}`,
          {
            password: this.password,
          },
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.success = "You have joined the " + this.name;
        this.clearFormInputs();
        this.clearMessages();

        this.setUserData();
      } catch (err) {
        this.clearFormInputs();
        this.error = err.response.data.title;
        this.clearMessages();
      }
    },

    askToDelete(groupName) {
      this.groupToDelete = groupName;
      this.$bvModal.show("delete-group");
    },

    async deleteGroup() {
      await axios.delete(`api/groups/${this.groupToDelete}`);
      this.hideModal();
      this.groupToDelete = "";
    },
    hideModal() {
      this.$bvModal.hide("delete-group");
    },
  },
  computed: {
    ...mapGetters(["getUser", "getUserName", "getUserGroups"]),
    sessionTimeLeft: function() {
      const timeNow = Date.now();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-buttons {
  display: flex;
  justify-content: center;
}
.submit-btn {
  min-width: 0% !important;
  max-width: 200px;
  margin-left: 10px;
  margin-right: 10px;
}

.groups-box{
  width: 100%;
  max-width: 400px;
}
</style>
