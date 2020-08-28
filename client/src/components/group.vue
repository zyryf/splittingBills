<template>
  <div id="group-card" class="m-2">
    <h5 class=" ml-4 m-auto ">{{ groupname }}</h5>
    <v-btn
      color="primary"
      block
      class="panel-btn"
      rounded
      outlined
      @click="$router.push(routerLink)"
      >PANEL</v-btn
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
  computed: {
    routerLink() {
      return "/group-panel/" + this.groupname;
    },
  },
  methods: {
    ...mapGetters(["getUserName"]),
    ...mapActions(["setUserData"]),
    async leaveGroup() {
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
  border: solid 1px #b4b4b4;
  border-radius: 10px;
  padding: 10px;
}

.panel-btn {
  max-width: 100px !important;
  min-width: 10% !important;
}

</style>
