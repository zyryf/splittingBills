<template>
  <div id="group-panel">
    <div class="grid-container my-8">
      <div class="Header p-2">
        <h1 class="my-6 m-auto">
          Group: <strong>{{ $attrs.groupname }}</strong>
        </h1>
        <Balance :groupname="$attrs.groupname" :key="expenses" />
      </div>

      <div class="New-Expense p-2">
        <NewExpense
          :groupname="$attrs.groupname"
          :members="members"
          v-on:reloadExpenses="getExpenses"
        />
      </div>
      <div class="Members p-2">
        <Members :members="members" />
      </div>
      <div class="Expenses p-2">
        <expense
          v-for="item in expenses"
          :key="item.id"
          :expense="item"
          :groupname="$attrs.groupname"
          :groupmembers="members"
          v-on:reloadExpenses="getExpenses"
        ></expense>
      </div>
    </div>

    <div class="mobile-nav">
      <div class="menu"><h1>mobile</h1></div>
      <div class="nav-bar"><h1>mobile</h1></div>
      <div class="mobile-new-expense"><h1>mobile</h1></div>
    </div>
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
  computed: {
    isMobile() {
      return true;
    },
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
  },

  components: {
    Members,
    NewExpense,
    Expense,
    Balance,
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 1000px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto auto auto auto;
    gap: 1px 1px;
    grid-template-areas: "Header Header New-Expense New-Expense" ". . New-Expense New-Expense" "Members Expenses Expenses Expenses" "Members Expenses Expenses Expenses" "Members Expenses Expenses Expenses";
  }
  .grid-container > div {
    //border: solid 1px red;
  }

  .Header {
    grid-area: Header;
  }

  .New-Expense {
    grid-area: New-Expense;
  }

  .Members {
    grid-area: Members;
  }

  .Expenses {
    grid-area: Expenses;
  }

  .mobile-nav {
    display: none;
  }
}
@media (max-width: 1000px) {
  .New-Expense {
    display: none;
  }
  .Members {
    display: none;
  }
}

.Expenses {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

  .Members {
      flex-direction: column-reverse;
  justify-content: flex-end;
  }

</style>
