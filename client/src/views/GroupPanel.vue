<template>
  <div>
    <b-row align-h="between" class="mr-4 ml-4">
      <div class="d-flex flex-column justify-content-between">
        <h1 class="m-auto">
          <strong>{{ $attrs.groupname }}</strong>
        </h1>
        <Balance :groupname="$attrs.groupname" />
      </div>

      <NewExpense
        :groupname="$attrs.groupname"
        :members="members"
        v-on:reloadExpenses="reloadExpenses"
      />
    </b-row>
    <hr />
    <b-row class="wrapper">
      <b-col cols="3">
        <Members :members="members" />
      </b-col>
      <b-col>
        <b-card
          bg-variant="Secondary"
          text-variant="black"
          header="Expenses"
          class="text-center expenses"
        >
          <div class="d-flex flex-column-reverse">
            <expense
              v-for="item in expenses"
              :key="item.id"
              :expense="item"
              :groupname="$attrs.groupname"
              :groupmembers="members"
              v-on:reloadExpenses="reloadExpenses"
            ></expense>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import Expense from "../components/Expense";
import Balance from "../components/Balance";

import Members from "../components/Members";
import NewExpense from "../components/NewExpense";

export default {
  data() {
    return {
      expenses: [],
      members: [],
      balance: 0,
    };
  },
  async mounted() {
    await this.setUserData();
    this.members = await this.getMembers();

    await this.getExpenses();
  },
  methods: {
    ...mapActions(["setUserData"]),
    ...mapGetters(["getUserName"]),
    async getMembers() {
      try {
        const response = await axios.get(`api/groups/${this.$attrs.groupname}`);
        return response.data.members;
      } catch (err) {
        console.log(err);
      }
    },

    async getExpenses() {
      try {
        const response = await axios.get(`api/groups/${this.$attrs.groupname}`);
        this.expenses = [...response.data.expenses];
      } catch (err) {
        console.log(err);
      }
    },
    async reloadExpenses() {
      await this.getExpenses();
    }
  },

  components: {
    Members,
    NewExpense,
    Expense,
    Balance,
  },
};
</script>

<style scoped>
.custome-alert {
  justify-content: flex-start;
}

.wrapper {
  min-height: 30vh;
}

h2 {
  text-align: left;
  padding: 10px 5px;
}

h2 strong {
  color: #42b983;
}

.expenses {
  min-height: 30vh;
}
</style>
