<template>
  <div>
    <h2>
      Welcome
      <strong>{{ getUserName }}</strong
      >!
    </h2>
    <div class="card-wrapper">
      <b-card-group deck>
        <div v-for="(name, index) in getUserGroups" :key="index">
          <group :groupname="name" v-on:delete="askToDelete"></group>
        </div>
      </b-card-group>
    </div>

    <h1 v-if="!getUserGroups.length">You don't belong to any group :(</h1>

    <b-modal id="delete-group" title="Warning" hide-footer>
      <b-alert show class="message w-100"
        >You are the last member. Do you want to delete this group?</b-alert
      >
      <div class="d-flex flex-row justify-content-center">
        <b-button @click="deleteGroup" variant="danger" class="mx-2"
          >Yes</b-button
        >
        <b-button @click="hideModal" variant="success" class="mx-2"
          >No</b-button
        >
      </div>
    </b-modal>

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
            v-model="name"
            placeholder="Enter  group name"
            @blur="$v.name.$touch()"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            required
            placeholder="Enter group password"
            type="password"
            @blur="$v.password.$touch()"
            v-model="password"
          ></b-form-input>
        </b-form-group>

        <b-button
          @click="createGroup"
          type="submit"
          class="mx-2"
          variant="primary"
          :disabled="$v.$invalid"
          >Create group</b-button
        >
        <b-button
          @click="joinGroup"
          :disabled="$v.$invalid"
          type="submit"
          variant="success"
          >Join group</b-button
        >

        <b-alert v-if="error" show variant="danger" class="my-2">{{
          error
        }}</b-alert>
        <b-alert v-if="success" show variant="success" class="my-2 info mx-0">{{
          this.success
        }}</b-alert>
      </b-form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

import Group from "../components/group";

export default {
  data() {
    return {
      name: "",
      password: "",
      error: "",
      success: "",
      message: false,
      deleteWhenEmpty: null,
      groupToDelete: ""
    };
  },
  validations: {
    name: {
      required
    },
    password: {
      required
    }
  },
  created() {
    if (!localStorage.getItem("token")) this.$router.push("/login");
  },
  async mounted() {
    this.setUserData();
  },
  methods: {
    ...mapActions(["setUserData"]),
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
        members: this.getUserName
      };
      try {
        const response = await axios.post("/api/groups", group, {
          headers: { token: localStorage.getItem("token") }
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
      try {
        const response = await axios.patch(
          `api/users/join/${this.name}/${this.getUserName}`,
          {
            password: this.password
          },
          {
            headers: { token: localStorage.getItem("token") }
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
    }
  },
  computed: {
    ...mapGetters(["getUser", "getUserName", "getUserGroups"])
  },
  components: {
    group: Group
  }
};
</script>

<style scoped>
.form-wrapper {
  width: 40%;
  margin: 0 auto;
  text-align: left;
}
.group {
  min-width: 30%;
  margin: 10px;
}
.card-wrapper {
  display: flex;
  justify-content: center;
  padding: 15px;
}
.card-deck {
  justify-content: space-around;
}

h2 {
  margin: 50px;
}

h2 strong {
  color: #42b983;
}

ul {
  list-style: none;
}

.message {
  width: 60%;
  margin: 20px auto;
}
</style>
