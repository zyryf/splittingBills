<template>
  <div>
    <h2>
      Welcome <strong>{{ user.name }} </strong>!
    </h2>
    <div class="card-wrapper" v-if="groups.length">
      <b-card-group deck>
        <b-card
          v-for="(group, index) in groups"
          :key="index"
          :header="group.name"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          title="Members:"
          class="group"
        >
          <b-card-text>
            <ul>
              <li v-for="(member, index) in group.members" :key="index">
                {{ index + 1 }}. {{ member }}
              </li>
            </ul>
          </b-card-text>
          <b-button
            type="submit"
            class="mx-2"
            variant="warning"
            @click="leaveGroup(group)"
            >Leave group</b-button
          >
        </b-card>
      </b-card-group>
    </div>

    <h1 v-else>You don't belong to any group :(</h1>
    <div v-if="message">
      <b-alert show class="message">{{ message }}</b-alert>
      <b-button @click="deleteGroup" variant="danger" class="mx-2"
        >Yes</b-button
      >
      <b-button @click="message = ''" variant="success">No</b-button>
    </div>
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
        <b-alert v-if="success" show variant="success" class="my-2 info mx-0"
          >{{ this.success }}
        </b-alert>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      groups: [],
      user: {
        email: "",
        name: ""
      },
      name: "",
      password: "",
      error: "",
      success: "",
      message: "",
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
    try {
      const response = await axios.get("api/users/getuser", {
        headers: { token: localStorage.getItem("token") }
      });

      this.user.email = response.data.email;
      this.user.name = response.data.name;
    } catch (err) {
      console.log(err);
    }

    this.getUserGroups();
  },
  methods: {
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
    async getUserGroups() {
      try {
        const response = await axios.get("api/groups/usergroups", {
          headers: { username: this.user.name }
        });

        this.groups = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async createGroup() {
      const group = {
        name: this.name,
        password: this.password,
        members: this.user.name
      };
      try {
        const response = await axios.post("/api/groups", group);
        this.clearFormInputs();
        this.success = "Group created!";
        this.clearMessages();

        this.getUserGroups();
      } catch (err) {
        this.clearFormInputs();
        this.error = err.response.data.title;
        this.clearMessages();
      }
    },
    async joinGroup() {
      try {
        const response = await axios.patch("api/groups/join", {
          name: this.name,
          password: this.password,
          username: this.user.name
        });
        this.success = "You have joined the " + this.name;
        this.clearFormInputs();
        this.clearMessages();

        this.getUserGroups();
      } catch (err) {
        this.clearFormInputs();
        this.error = err.response.data.title;
        this.clearMessages();
      }
    },
    async membersAmount(group) {
      const response = await axios.get(`api/groups/amount/${group.name}`);
      return response.data;
    },
    async leaveGroup(group) {
      const membersAmount = await this.membersAmount(group);

      if (membersAmount === 1) {
        this.message = `You were the last member of that group.
           Would you like to delete the group too?`;
        this.groupToDelete = group;
      }
      try {
        const response = await axios.patch("api/groups/leave", {
          name: group.name,
          member: this.user.name
        });
        this.getUserGroups();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGroup() {
      await axios.delete(`api/groups/${this.groupToDelete.name}`);
      this.groupToDelete = "";
      this.message = "";
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
.group {
  min-width: 30%;
  margin: 10px;
}
.card-wrapper {
  display: flex;
  justify-content: center;
  padding: 15px;
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
