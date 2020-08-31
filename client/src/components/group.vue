<template>
  <div id="group-card">
    <h5 class=" ml-4 m-auto ">{{ groupname }}</h5>
    <v-btn
      color="orange"
      block
      class="panel-btn"
      rounded
      outlined
      @click="leaveGroup"
      >Leave</v-btn
    >

    <!-- <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"
          >You were the last memeber of the group</v-card-title
        >
        <v-card-text
          >Do you want to delete the group while leaving?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Yes</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
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

<style scoped>
#group-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.panel-btn {
  max-width: 100px !important;
  min-width: 10% !important;
}
</style>
