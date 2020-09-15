<template>
  <div id="dashboard" class="layout">
    <h2>
      Welcome
      <strong class="primary--text">{{ getUserName }}</strong
      >!
    </h2>

    <v-text-field
      class="my-4"
      id="search-input"
      label="Search for group..."
      outlined
      rounded
      v-model="searchInput"
      required
      :dense="true"
      @input="filterGroups"
      v-if="groups.length"
    ></v-text-field>

    <section id="dashboard-wrapper">
      <v-list
        rounded
        min-width="300"
        height="300"
        :outlined="true"
        v-if="groups.length"
      >
        <vuescroll>
          <v-subheader class="primary--text"> YOUR GROUPS</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="groupname in groups"
              :key="groupname"
              @click="$router.push(`/group-panel/${groupname}`)"
            >
              <v-list-item-content>
                <Group
                  :groupname="groupname"
                  v-on:show-modal="askToDelete(groupname)"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </vuescroll>
      </v-list>
      <form class="mt-8">
        <h4 class="mb-6">Create group or join one</h4>
        <v-text-field
          label="Group Name"
          outlined
          rounded
          v-model="groupname"
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
            :disabled="!this.groupname || !this.password"
            >Create</v-btn
          >
          <v-btn
            color="primary"
            block
            class="submit-btn"
            rounded
            outlined
            @click="joinGroup"
            :disabled="!this.groupname || !this.password"
            >Join</v-btn
          >
        </div>
      </form>
    </section>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="leaving-headline"
          >You were the last <br v-if="windowWidth < 600" />
          memeber of the group</v-card-title
        >
        <v-card-text class="leavegroup-msg"
          >Do you want to delete the group while leaving?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteGroup">Yes</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isError" max-width="500">
      <v-card>
        <v-card-title class="error-headline"
          >Something went wrong :(</v-card-title
        >
        <v-card-text class="error-msg">{{ error }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="isError = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      groups: [],
      groupname: "",
      password: "",
      error: "",
      message: false,
      deleteWhenEmpty: null,
      groupToDelete: "",
      dialog: false,
      searchInput: "",
      isError: false,
    };
  },
  components: {
    Group,
    vuescroll,
  },
  validations: {
    groupname: {
      required,
    },
    password: {
      required,
    },
  },
  async created() {
    await this.setUserData();
    this.groups = this.getUserGroups();
  },
  async mounted() {
    if (!this.$store.state.isLogged) this.$router.push("/");
    await this.setUserData();
  },

  methods: {
    ...mapActions(["setUserData", "isTokenExpired"]),
    ...mapGetters(["getUserGroups"]),

    clearFormInputs() {
      this.groupname = "";
      this.password = "";
    },
    filterGroups() {
      this.groups = this.getUserGroups();
      this.groups = this.groups.filter((group) => {
        if (group.includes(this.searchInput)) return group;
      });
    },
    async createGroup() {
      const group = {
        name: this.groupname,
        password: this.password,
        members: this.getUserName,
      };
      try {
        const response = await axios.post(`api/groups`, group, {
          headers: { token: localStorage.getItem("token") },
        });
        this.clearFormInputs();
        await this.setUserData();
        this.groups = this.getUserGroups();
      } catch (err) {
        console.log(err.response.data.title);
        this.clearFormInputs();
        this.error = err.response.data.title;
        this.isError = true;
      }
    },

    async joinGroup() {
      try {
        const response = await axios.patch(
          `api/users/join/${this.groupname}/${this.getUserName}`,
          {
            password: this.password,
          },
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.clearFormInputs();

        await this.setUserData();
        this.groups = this.getUserGroups();
      } catch (err) {
        this.clearFormInputs();
        this.error = err.response.data.title;
        this.isError = true;
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
  },
  computed: {
    ...mapGetters(["getUser", "getUserName"]),
    sessionTimeLeft: function() {
      const timeNow = Date.now();
    },
  },
};
</script>

<style lang="scss" scoped>
.leaving-headline,
.error-headline {
  display: flex;
  justify-content: center;
}
.leavegroup-msg {
  font-size: 14px;
}
.error-msg {
  font-size: 17px;
}
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

#dashboard {
  display: flex;
  justify-content: center;
  flex-grow: unset;
}
#logout-btn {
  margin: 20px;
}
.v-list {
  overflow: hidden;
  margin: 10px 0;
}

h2 {
  margin-left: 0;
}
.v-input {
  margin: 0 auto;
  width: 75%;
  flex-grow: unset;
}
#dashboard-wrapper {
  display: flex;
  flex-direction: column;
}
.v-input {
  max-width: 400px;
}
@import "../assets/media-queries/large.scss";
</style>
