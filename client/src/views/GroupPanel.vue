<template>
  <div>
    <b-row align-h="between" class="mr-4 ml-4">
      <h1 class="m-auto">
        <strong>{{ $attrs.groupname }}</strong>
      </h1>
      <NewExpense
        :groupname="$attrs.groupname"
        v-on:reloadExpenses="getExpenses"
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
          class="text-center expenses "
        >
          <div class="d-flex flex-column-reverse">
            <b-alert
              show
              variant="primary"
              v-for="(item, index) in expenses"
              :key="index"
              class="d-flex flex-column custome-alert"
            >
              <p class="m-0 "><strong>User</strong> {{ item.userName }}</p>
              <p class="m-0"><strong>Title:</strong> {{ item.title }}</p>
              <p class="m-0"><strong>Amount:</strong> {{ item.amount }}</p>
              <p class="m-0"><strong>Time:</strong> {{ item.date }}</p>
            </b-alert>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

import Members from "../components/Members";
import NewExpense from "../components/NewExpense";

export default {
  data() {
    return {
      expenses: [],
      members: []
    };
  },
  async mounted() {
    this.setUserData();
    this.members = await this.getMembers();

    await this.getExpenses();
  },
  methods: {
    ...mapActions(["setUserData"]),
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
    }
  },
  components: {
    Members,
    NewExpense
  }
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