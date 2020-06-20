<template>
  <div>
    <b-card bg-variant="light" class="form-wrapper">
      <b-form @submit.prevent="addNewExpense">
        <h5 class="m-3 ">
          <strong> New Expense</strong>
        </h5>
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

        <b-form-group label="Select members for this expense">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="expense.selectedMembers"
            :options="members"
            value="accepted"
          ></b-form-checkbox-group>
        </b-form-group>
        <b-button variant="outline-primary" @click="selectAll" class="m-3"
          >Select all</b-button
        >
        <b-button variant="success" type="submit" class="m-3"
          >Add expense</b-button
        >
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
  props: ["groupname", "members"],
  data() {
    return {
      expense: {
        title: "",
        amount: "",
        payer: "",
        date: "",
        selectedMembers: []
      },
      success: "",
      error: ""
    };
  },
  mounted() {
    this.expense.payer = this.getUserName();
  },
  methods: {
    ...mapGetters(["getUserName"]),
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
            headers: { token: localStorage.getItem("token") }
          }
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
    },
    selectAll() {
      this.expense.selectedMembers = [...this.members];
    }
  }
};
</script>

<style  scoped>
.form-wrapper {
  min-width: 40vw;
}

.member-checkbox {
  display: inline;
  margin: 0 10px;
}
</style>