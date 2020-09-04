<template>
  <div id="new-expense">
    <h2 class="mt-auto mb-8 font-weight-bold">
      New Expense
    </h2>
    <form class="mb-2">
      <p>Title</p>
      <v-text-field
        label="Title"
        outlined
        rounded
        v-model="expense.title"
        required
        :dense="true"
      ></v-text-field>
      <p>Amount</p>
      <v-text-field
        label="Amount"
        outlined
        rounded
        v-model="expense.amount"
        required
        :dense="true"
      ></v-text-field>
      <b-form-group label="Select members for this expense">
        <b-form-checkbox-group
          required
          id="checkbox-group-1"
          v-model="expense.selectedMembers"
          :options="members"
          value="accepted"
        ></b-form-checkbox-group>
      </b-form-group>
            <v-btn
        id="submit"
        color="primary"
        class="submit-btn panel-btn"
        rounded
        @click="addNewExpense"
        >SUBMIT</v-btn>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import moment from "moment";
export default {
  props: ["groupname"],
  data() {
    return {
      expense: {
        title: "",
        amount: "",
        payer: "",
        date: "",
        selectedMembers: [],
      },
      members: [],
      success: "",
      error: "",
    };
  },
  async mounted() {
    this.expense.payer = this.getUserName();
    await this.getMembers();
  },
  methods: {
    ...mapGetters(["getUserName"]),
    ...mapActions(["setUserBalance"]),
    addNewExpense() {
      this.expense.date = moment().format("MMM Do YYYY, h:mm:ss a");
      this.expense.payer = this.getUserName();
      this.sendExpense();
    },
    async sendExpense() {
      try {
        const response = await axios.post(
          `api/groups/${this.groupname}/expenses`,
          this.expense,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        this.expense.amount = "";
        this.expense.title = "";
        this.success = response.data.title;
        await this.setUserBalance(this.groupname);
        this.$emit("reloadExpenses");
        setTimeout(() => {
          this.success = "";
        }, 2000);
      } catch (err) {
        this.error = err.response.data.title;
        setTimeout(() => {
          this.error = "";
        }, 2000);
      }
    },
    selectAll() {
      this.expense.selectedMembers = [...this.members];
    },

    async getMembers() {
      try {
        const response = await axios.get(`api/groups/${this.groupname}`);
        this.members = response.data.members;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-btn {
  width: 200px;
}
</style>
