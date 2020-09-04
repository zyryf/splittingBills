<template>
  <div id="group-panel">
    <div class="grid-container">
      <div class="menu">
        <div class="Header p-2">
          <header class="my-2 m-auto primary--text">
            {{ $attrs.groupname }}
          </header>
          <Balance :groupname="$attrs.groupname" :key="expenses.length" />
        </div>
        <hr class="hr my-1 mx-6 " />

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
      <MobileNavBar v-if="isMobile" :groupname="$attrs.groupname"/>
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
import MobileNavBar from "../components/GroupPanel/Mobile/MobileNav";
export default {
  data() {
    return {
      expenses: [],
      members: [],
      balance: 0,
    };
  },
  components: {
    Members,
    NewExpense,
    Expense,
    Balance,
    MobileNavBar,
  },
  computed: {
    isMobile() {
      return this.windowWidth < 1000;
    },
  },
  async mounted() {
    console.log()
    await this.setUserData();
    await this.getMembers();
    await this.getExpenses();
  },
  methods: {
    ...mapActions(["setUserData"]),
    ...mapGetters(["getUserName"]),
    async getMembers() {
      try {
        const response = await axios.get(`api/groups/${this.$attrs.groupname}`);
        this.members = response.data.members;
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
};
</script>

<style lang="scss" scoped>
header {
  font-size: 40px;
  font-weight: bold;
}
@media (min-width: 1000px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    gap: 1px 1px;
    grid-template-areas: "Menu Expenses";
  }

  .menu {
    grid-area: Menu;
    min-width: 300px;
  }

  .grid-container > div {
    //border: solid 1px red;
  }

  .Header {
    grid-area: Header;
    & > hr {
      display: none;
    }
  }

  .hr {
    grid-area: hr;
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
