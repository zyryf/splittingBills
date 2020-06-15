<template>
  <div>
    <b-card bg-variant="light" class="form-wrapper">
      <h5 class="m-3 d-flex align-items-center">
        <strong>
          New<br />
          Expense</strong
        >
      </h5>
      <b-form @submit.prevent="addNewExpense">
        <b-form-group
          label-cols-sm="3"
          label="Title:"
          label-align-sm="right"
          label-for="title"
        >
          <b-form-input
            id="title"
            v-model="expense.title"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="Amount:"
          label-align-sm="right"
          label-for="amount"
        >
          <b-form-input
            id="amount"
            v-model="expense.amount"
            type="number"
            required
            placeholder="Enter amount"
          ></b-form-input>
        </b-form-group>
        <b-button variant="success" type="submit">Add expense</b-button>
      </b-form>
    </b-card>
    <b-alert v-if="success" show variant="success" class="my-2">
      {{ success }}
    </b-alert>
    <b-alert v-if="error" show variant="danger" class="my-2">
      {{ error }}
    </b-alert>
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
        userName: "",
        date: ""
      },
      success: "",
      error: ""
    };
  },
  mounted() {
    this.expense.userName = this.getUserName();
  },
  methods: {
    ...mapGetters(["getUserName"]),
    addNewExpense() {
      this.expense.date = moment().format("MMM Do YYYY, h:mm:ss a");
      this.expense.userName = this.getUserName();
      this.sendExpense();
    },
    async sendExpense() {
      try {
        console.log(this.expense);
        const response = await axios.post(
          `api/groups/${this.groupname}/expenses`,
          this.expense
        );
        this.expense.amount = "";
        this.expense.title = "";
        this.success = response.data.title;
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
    }
  }
};
</script>

<style  scoped>
.form-wrapper {
  min-width: 40vw;
}
.card-body {
  display: flex;
  flex-direction: row;
}
</style>