<template>
  <div class="my-1 mx-6">
    <div id="expense-wrapper">
      <i class="fas fa-money-bill-wave"></i>
      <button class="grid-expense-container " @click="editPanel = true">
        <div class="expense-header my-auto ml-2">{{ expense.title }}</div>
        <div class="paid-by-text my-auto ml-2">
          Paid by: {{ expense.payer }}
        </div>
        <div
          class="expense-amount ml-auto "
          :style="amountColor(expense.amount)"
        >
          {{ expense.amount }} PLN
        </div>
      </button>
    </div>
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
  },
};
</script>

<style lang="scss" scoped>
.grid-expense-container {
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
  margin: 0 50px;
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
#expense-wrapper {
  display: flex;
  // background-color: blue;
  align-items: center;
}

i.fa-trash-alt {
  color: red;
  font-size: 25px;
  padding: 0 10px;
}
i.fa-money-bill-wave {
  font-size: 25px;
  margin: 0 10px;
}
</style>
