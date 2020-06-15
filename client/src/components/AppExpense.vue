<template>
  <b-alert show variant="primary" class="d-flex flex-row justify-content-between">
      <div>
        <div class="d-inline-block">
        <h5 class="m-0 d-flex justify-content-start"><strong> Title:  </strong></h5>
        <p class="m-0 d-flex justify-content-start"><strong>  User:   </strong></p>
        <p class="m-0 d-flex justify-content-start"><strong>  Amount: </strong></p>
        <p class="m-0 d-flex justify-content-start"><strong>  Time:   </strong></p>
        </div>
        <div class="d-inline-block ml-3">
        <h5 class="m-0 d-flex justify-content-start"> {{expense.title}}         </h5>
        <p class="m-0 d-flex justify-content-start">  {{expense.userName}}      </p>
        <p class="m-0 d-flex justify-content-start">  {{expense.amount}} PLN    </p>
        <p class="m-0 d-flex justify-content-start">  {{expense.date}}          </p>
        </div>
      </div>
    <div class="d-flex flex-column justify-content-around">
      <b-button href="#" variant="primary" class="custom-button" @click="editExpense">Edit</b-button>
      <b-button href="#" variant="danger" class="custom-button" @click="deleteExpense">Delete</b-button>
    </div>

  </b-alert>
</template>

<script>
import axios from "axios";
export default {
    props: ["expense"],
    methods: {
        editExpense() {

        },
        deleteExpense() {
            console.log("pesos")
            axios.delete('api/groups/pesos/expenses/pesos')
        }
    }
};

</script>

<style scoped>
.custom-button {
  width: 80px;
}
</style>