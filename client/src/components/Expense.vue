<template>
  <div class="my-1 mx-6">
    <button class="grid-expense-container w-100" @click="editPanel = true">
      <div class="expense-header my-auto ml-2">{{ expense.title }}</div>
      <div class="paid-by-text my-auto ml-2">Paid by: {{ expense.payer }}</div>
      <div class="expense-amount ml-auto m-auto mr-6" :style="amountColor(expense.amount)">
        {{ expense.amount }} PLN
      </div>
    </button>
    <edit-expense-panel
      v-if="editPanel"
      v-on:close="closeEditPanel"
      :expense="expense"
      :members="groupmembers"
      :groupname="groupname"
    ></edit-expense-panel>
  </div>
</template>

<script>
import axios from "axios";
import editExpensePanel from "./EditExpensePanel";
import { mapActions } from "vuex";

export default {
  props: ["expense", "groupname", "groupmembers"],
  data() {
    return {
      editPanel: false,
    };
  },
  components: {
    editExpensePanel,
  },
  computed: {},

  methods: {
    ...mapActions(["setUserBalance"]),
    amountColor(amount) {
      return amount < 0 ? "color: #D07070;" : "color: #8DD070;";
    },
    closeEditPanel() {
      this.editPanel = false;
      this.$emit("reloadExpenses");
    },
    async deleteExpense() {
      try {
        const response = await axios.delete(
          `api/groups/${this.groupname}/expenses/${this.expense.id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        await this.setUserBalance(this.groupname);
        this.$emit("reloadExpenses");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-expense-container {
  padding: 5px;
  border: solid 1px #707070;
  border-radius: 5px;

  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "expense-header expense-amount"
    "paid-by-text expense-amount";

  & > div {
    display: flex;
  }
}

.expense-header {
  grid-area: expense-header;
  font-size: 20px;
  font-weight: bold;
}

.paid-by-text {
  grid-area: paid-by-text;
  font-size: 12px;
  font-weight: bold;
}

.expense-amount {
  grid-area: expense-amount;
  font-size: 30px;
  font-weight: bold;
}


</style>
