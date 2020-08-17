<template>
  <div class="expense">
    <b-card class="mt-3" header="Edit Expense">
      <b-form class="align-items-start">
        <b-form-group
          id="input-group-1"
          label-for="input-1"
          label="Title"
          class="text-left"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
            :value="modifiedExpense.title"
            v-model="modifiedExpense.title"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Payer"
          label-for="input-3"
          class="text-left"
        >
          <b-form-select
            id="input-3"
            required
            :options="members"
            v-model="modifiedExpense.payer"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Amount"
          label-for="input-2"
          class="text-left"
        >
          <b-form-input
            id="input-2"
            required
            type="number"
            :value="modifiedExpense.amount"
            v-model="modifiedExpense.amount"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group
            id="checkboxes-4"
            label="Mambers Included"
            :options="members"
            v-model="modifiedExpense.selectedMembers"
          >
          </b-form-checkbox-group>
        </b-form-group>
        <div class="d-flex justify-content-around">
          <b-button type="submit" variant="primary" @click="save"
            >Save</b-button
          >
          <b-button type="reset" variant="danger" @click="closePanel"
            >Close</b-button
          >
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: ["expense", "members", "groupname"],
  data() {
    return {
      modifiedExpense: {
        id: "",
        title: "",
        payer: "",
        amount: 0,
        selectedMembers: [],
      },
    };
  },
  created() {
    this.modifiedExpense.id = this.expense.id;
    this.modifiedExpense.title = this.expense.title;
    this.modifiedExpense.payer = this.expense.payer;
    this.modifiedExpense.amount = this.expense.amount;
    this.modifiedExpense.selectedMembers = this.expense.selectedMembers;
    this.modifiedExpense.date = this.expense.date;
  },
  mounted() {},
  computed: {},
  methods: {
    ...mapActions(["setUserBalance"]),
    closePanel() {
      this.$emit("close");
    },
    async save() {
      try {
        const response = await axios.patch(
          `api/groups/${this.groupname}/expenses`,
          this.modifiedExpense,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );

        this.$emit("close");
        await this.setUserBalance(this.groupname);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.expense {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(98, 98, 98, 0.404);
}
</style>
