<template>
  <div class="m-2">
    <b-card
      :header="groupname"
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="dark"
      title="Members:"
      class="group"
    >
      <b-card-text>
        <ul>
          <li v-for="(member, index) in members" :key="index">
            {{ index + 1 }}. {{ member }}
          </li>
        </ul>
      </b-card-text>
      <router-link
        :to="{ name: 'GroupPanel', params: { groupname: groupname } }"
        ><b-button variant="info" class="mx-2">Panel</b-button></router-link
      >
      <b-button type="submit" class="mx-2" variant="warning" @click="leaveGroup"
        >Leave group</b-button
      >
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["groupname"],
  data() {
    return {
      members: []
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
    }
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
            headers: { token: localStorage.getItem("token") }
          }
        );
        if (response.data.isEmpty) this.$emit("delete", this.groupname);
        this.setUserData();
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>