<template>
  <div class="mobile-menu">
    <div>
      <header class="primary--text my-6">MENU</header>
      <div class="mx-8">
        <span class="d-flex justify-space-between align-center">
          <v-text-field
            regular
            class="pr-8 h5 font-weight-bold"
            label="Groupname"
            v-model="groupname"
          >
          </v-text-field>
          <v-btn small color="primary" class="ml-8 my-2">EDIT</v-btn>
        </span>
        <hr />
      </div>

      <span class="h5 font-weight-bold">Members & Balance</span>
      <div class="users-box py-4 px-8">
        <div
          class="user-tab p-2 m-2 "
          v-for="member in membersWithBalance"
          :key="member.balance"
        >
          <div class="user-tab-name ml-2 ">{{ member.name }}</div>
          <div
            class="user-tab-balance mr-2 "
            :style="member.balance < 0 ? 'color: #D07070' : 'color: #A3D070'"
          >
            {{ member.balance }}
          </div>
        </div>
      </div>
    </div>
    <v-btn class="pay-btn" color="primary">Pay Your Delt</v-btn>

    <div class="bottom-tab">
      <button
        class="back-btn"
        @click="$router.push(`/group-panel/${$attrs.groupname}`)"
      >
        BACK
      </button>
      <v-btn color="error" @click="leaveGroup"> Leave Group</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      groupname: "groupname",
      members: [],
      membersWithBalance: [],
    };
  },
  async created() {
    this.groupname = this.$attrs.groupname;
    await this.getMembers();
    this.members.forEach(async (member) => {
      const data = {
        name: "",
        balance: 0,
      };
      data.name = member;
      data.balance = await this.getUserBalance(data.name, this.groupname);
      this.membersWithBalance.push(data);
    });
  },
  methods: {
    ...mapActions(["setUserData", "isTokenExpired"]),
    ...mapGetters(["getUserGroups", "getUserName"]),
    async getUserBalance(username, groupname) {
      try {
        const response = await axios.get(
          `api/groups/${groupname}/${username}/balance`
        );
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getMembers() {
      try {
        const response = await axios.get(`api/groups/${this.groupname}`);
        this.members = response.data.members;
      } catch (err) {
        console.log(err);
      }
    },
    async leaveGroup() {
      try {
        const response = await axios.patch(
          `api/users/leave/${this.groupname}/${this.getUserName()}`,
          {},
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.setUserData();
        this.$router.push(`/dashboard`);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>

<style lang="scss" scoped>
.mobile-menu {
  min-height: 90%;
  background-color: white;
  & > div > header {
    font-size: 40px;
    font-weight: bold;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.users-box {
  flex: 1 0 auto;
}

.user-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #707070;
  border-radius: 5px;
}

.bottom-tab {
  width: 100vw;
  height: 60px;
  background-color: #3f3d56;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.back-btn {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.pay-btn {
  margin-top: auto;

  width: 150px;
}

.user-tab-name {
  font-size: 20px;
  font-weight: bold;
}

.user-tab-balance {
  font-size: 30px;
  font-weight: bold;
}
</style>
