<template>
  <b-alert
    show
    variant="primary"
    class="d-flex flex-row justify-content-between"
  >
    <div>
      <div class="d-inline-block">
        <h5 class="m-0 d-flex justify-content-start">
          <strong>Title:</strong>
        </h5>
        <p class="m-0 d-flex justify-content-start">
          <strong>User:</strong>
        </p>
        <p class="m-0 d-flex justify-content-start">
          <strong>Amount:</strong>
        </p>
        <p class="m-0 d-flex justify-content-start">
          <strong>Time:</strong>
        </p>
      </div>
      <div class="d-inline-block ml-3">
        <h5 class="m-0 d-flex justify-content-start">{{ expense.title }}</h5>
        <p class="m-0 d-flex justify-content-start">{{ expense.userName }}</p>
        <p class="m-0 d-flex justify-content-start">{{ expense.amount }} PLN</p>
        <p class="m-0 d-flex justify-content-start">{{ expense.date }}</p>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap members-wrapper">
      <div class="m-1" v-for="(member, index) in members" :key="index">
        <b-avatar size="sm" variant="light"></b-avatar>
        <p class="d-inline m-2">{{ member }}</p>
      </div>
    </div>

    <div class="d-flex flex-column justify-content-around">
      <b-button
        href="#"
        variant="primary"
        class="custom-button"
        @click="editExpense"
        >Edit</b-button
      >
      <b-button
        href="#"
        variant="danger"
        class="custom-button"
        @click="deleteExpense"
        >Delete</b-button
      >
    </div>

    <edit-expense-panel
      v-if="editPanel"
      :expense="expense"
    ></edit-expense-panel>
  </b-alert>
</template>

<script>
import axios from "axios";
import groupVue from "./group.vue";
import editExpensePanel from "./EditExpensePanel";

export default {
  props: ["expense", "groupname"],
  data() {
    return {
      editPanel: false,
      members: []
    };
  },
  components: {
    editExpensePanel
  },
  async created() {
    this.members = [...this.expense.selectedMembers];
  },
  methods: {
    editExpense() {
      this.editPanel = true;
    },
    async deleteExpense() {
      try {
        const response = await axios.delete(
          `api/groups/${this.groupname}/expenses/${this.expense.id}`
        );
        this.$emit("reloadExpenses");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.custom-button {
  width: 80px;
}

.members-wrapper {
  width: 50%;
  color: black;
}
</style>