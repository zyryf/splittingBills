<template>
  <div id="group-card">
    <i class="fas fa-users"></i>
    <h5 class=" ml-4 m-auto ">{{ groupname }}</h5>
    <v-btn
      id="leave-btn"
      color="orange"
      block
      class="panel-btn"
      rounded
      outlined
      @click="leaveGroup"
      >Leave</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["groupname"],
  data() {
    return {
      members: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`api/groups/${this.groupname}`);
      this.members = response.data.members;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapGetters(["getUserName"]),
    ...mapActions(["setUserData"]),
    async leaveGroup(evt) {
      evt.stopPropagation();
      this.$emit("show-modal");

      try {
        const response = await axios.patch(
          `api/users/leave/${this.groupname}/${this.getUserName()}`,
          {},
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        if (response.data.isEmpty) this.$emit("delete", this.groupname);
        this.setUserData();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#group-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
h5 {
  font-size: 18px;
  margin: 0 3px;
}

.panel-btn {
  max-width: 100px !important;
  min-width: 10% !important;
}
#leave-btn {
  margin-right: 2px;
}
i {
  font-size: 18px;
}
</style>
