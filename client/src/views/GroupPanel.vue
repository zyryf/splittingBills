<template>
  <div>
    <b-row align-h="between" class="mr-4 ml-4">
      <h1 class="m-auto">
        <strong>{{$attrs.groupname}}</strong>
      </h1>
      <div>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="New expense"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group label-cols-sm="3" label="Title:" label-align-sm="right" label-for="title">
              <b-form-input id="title" v-model="expense.title" required placeholder="Enter title"></b-form-input>
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
              <b-button
                variant="success"
                class="custom-position"
                @click="addNewExpense"
                type="submit"
              >ADD</b-button>
            </b-form-group>
          </b-form-group>
          <b-alert v-if="success" show variant="success" class="my-2">
            {{
            success
            }}
          </b-alert>
          <b-alert v-if="error" show variant="danger" class="my-2">
            {{
            error
            }}
          </b-alert>
        </b-card>
      </div>
    </b-row>
    <hr />
    <b-row class="wrapper">
      <b-col cols="3">
        <b-card
          bg-variant="secondary"
          text-variant="white"
          header="Members"
          class="text-center"
          header-bg-variant="dark"
        >
          <b-alert show variant="light" v-for="(member,index) in members" :key="index">{{member}}</b-alert>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          bg-variant="Secondary"
          text-variant="black"
          header="Expenses"
          class="text-center expenses "
        >
        <div class="d-flex flex-column-reverse">
            <app-expense v-for="(item,index) in expenses" :key="index" :expense="item"></app-expense>
        </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import moment from "moment"
import appExpense from '../components/AppExpense'

export default {
  data() {
    return {
      expense: {
        title: "",
        amount: "",
        userName: "",
        date: ""
      },
      expenses: [],
      members: [],
      success: "",
      error: ""
    };
  },
  components: {
      appExpense: appExpense
  },
  async mounted() {
    this.setUserData()
    this.members = await this.getMembers();
    this.expense.userName = this.getUserName();
    this.expenses = await this.getExpenses();
  },
  methods: {
    ...mapGetters(["getUserName"]),
    ...mapActions(["setUserData"]),
    async getMembers() {
      try {
        const response = await axios.get(`api/groups/${this.$attrs.groupname}`);
        return response.data.members;
      } catch (err) {
        console.log(err);
      }
    },
    addNewExpense() {
      if (this.expense.amount && this.expense.title) {
        this.expense.date = moment().format('MMM Do YYYY, h:mm:ss a');
        
        this.expense.userName = this.getUserName();
        console.log('username: '+ this.getUserName())
        this.sendExpense();
      } else alert("Amount and title field required");
    },
    async sendExpense() {
      try {
          console.log(this.expense)
        const response = await axios.post(
          `api/groups/${this.$attrs.groupname}/expenses`,
          this.expense
        );
        this.expense.amount = '';
        this.expense.title = "";
        this.success = response.data.title;
        this.expenses = await this.getExpenses();
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
    async getExpenses() {
      try {
        const response = await axios.get(`api/groups/${this.$attrs.groupname}`);
        return [...response.data.expenses];
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.custome-alert{
    justify-content: flex-start;
}
.custom-position {
  position: relative;
  z-index: 1;
  top: 0px;
  left: -260px;
}
.wrapper {
  min-height: 30vh;
}

form {
  width: 40%;
  text-align: left;
  margin: 0 auto;
}
h2 {
  text-align: left;
  padding: 10px 5px;
}

h2 strong {
  color: #42b983;
}

.expenses {
  min-height: 30vh;
}
</style>