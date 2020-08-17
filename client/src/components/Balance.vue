<template>
  <div>
    <b-card
      bg-variant="light"
      text-variant="black"
      header="Your balance"
      class="text-center  "
      :header-bg-variant="color"
      header-text-variant="white"
    >
      <div class="d-flex justify-content-between ">
        <h3 class=" mr-4">{{ getBalance | addSign }} PLN</h3>
        <b-button v-if="getBalance < 0" variant="danger">Pay</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  props: ["groupname"],
  data() {

    return {};


  },
  async mounted() {
    await this.setUserData();
    await this.setUserBalance(this.groupname);
  },
  methods: {
    ...mapActions(["setUserBalance", "setUserData"]),
  },
  computed: {
    ...mapGetters(["getBalance"]),

    color() {
      if (this.balance > 0) return "success";
      if (this.balance < 0) return "danger";
      return "dark";
    },

  },

  filters: {
    addSign(value) {
      if (value === 0) return value;
      if (value > 0) return `+ ${value}`;
      value = Math.abs(value);
      return `- ${value}`;
    },
  },
};
</script>
