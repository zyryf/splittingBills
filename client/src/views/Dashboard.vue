<template>
  <div id="dashboard" class="layout">
    <h2>
      Welcome
      <strong class="primary--text">{{ getUserName }}</strong
      >!
    </h2>

    <div id="search-container">
      <v-text-field
        class=""
        label="Search Groups"
        outlined
        rounded
        v-model="searchInput"
        required
        :dense="true"
      ></v-text-field>
      <v-btn
        id="search-btn"
        color="primary"
        block
        class="submit-btn"
        rounded
        @click="searchGroup"
        >Search</v-btn
      >
    </div>

    <v-list rounded min-width="300" max-height="300" :outlined="true">
      <vuescroll>
        <v-subheader>YOUR GROUPS</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            :class="{ focused: name === groupToFocus }"
            v-for="(name, index) in getUserGroups"
            :key="index"
            @click="$router.push(`/group-panel/ + ${name}`)"
          >
            <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon> -->
            <v-list-item-content>
              <Group :groupname="name" v-on:show-modal="askToDelete(name)" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </vuescroll>
    </v-list>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"
          >You were the last memeber of the group</v-card-title
        >
        <v-card-text
          >Do you want to delete the group while leaving?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteGroup">Yes</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <form class="mt-8">
      <h5 class="mb-4">Create group or join one</h5>
      <v-text-field
        label="Group Name"
        outlined
        rounded
        v-model="name"
        required
        :dense="true"
      ></v-text-field>
      <v-text-field
        label="Password"
        outlined
        rounded
        v-model="password"
        required
        type="password"
        :dense="true"
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import Group from "../components/Group";
import vuescroll from "vuescroll";
const jwtDecode = require("jwt-decode");

export default {
  data() {
    return {
      name: "",
      password: "",
      error: "",
      success: "",
      message: false,
      deleteWhenEmpty: null,
      groupToDelete: "",
      dialog: false,
      searchInput: "",
      groupToFocus: "",
    };
  },
  components: {
    Group,
    vuescroll,
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
      this.dialog = true;
      this.groupToDelete = groupName;
    },

    async deleteGroup() {
      await axios.delete(`api/groups/${this.groupToDelete}`);
      this.dialog = false;
      this.groupToDelete = "";
    },
    searchGroup() {
      if (this.getUserGroups.indexOf(this.searchInput) !== -1) {
        this.groupToFocus = this.searchInput;
      }
      this.searchInput = "";
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

.groups-box {
  width: 100%;
  max-width: 400px;
}

#search-container {
  display: flex;
  flex-direction: row;
  margin: 20px 0;
}
#search-btn {
  height: 40px !important;
}
#dashboard {
  display: flex;
  justify-content: center;
}
#logout-btn {
  margin: 20px;
}
.v-list {
  overflow: hidden;
}
.focused {
  border: 1px solid #6c63ff;
}
</style>
