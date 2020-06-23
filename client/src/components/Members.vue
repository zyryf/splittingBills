<template>
  <div>
    <b-card
      bg-variant="secondary"
      text-variant="white"
      header="Members"
      class="text-center"
      header-bg-variant="dark"
    >
      <b-alert show variant="success"
        ><strong>{{ getUserName }}</strong></b-alert
      >
      <div v-for="(member, index) in members" :key="index">
        <b-alert show variant="light" v-if="member !== getUserName">{{
          member
        }}</b-alert>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["members"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserName"])
  }
};
</script>