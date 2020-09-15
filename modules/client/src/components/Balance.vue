<template>
  <div class="balance"> 
    <div class="head mr-4">Your Balance:</div>
    <div class="amount">{{ getBalance }}</div>
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

<style lang="scss" scoped>

.balance {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
}

</style>
