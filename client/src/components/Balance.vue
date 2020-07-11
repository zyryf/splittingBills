<template>
  <div>
    <b-card
      bg-variant="light"
      text-variant="black"
      header="Your balance"
      class="text-center  "
      :header-bg-variant="color"
      header-text-variant="white"
    >
      <div class="d-flex justify-content-between ">
        <h3 class=" mr-4">{{ userBalance  | addSign}} PLN</h3>
        <b-button v-if="userBalance < 0" variant="danger">Pay</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import axios from "axios";
export default {
  props: ['groupname'],
  data() {
    return {
      userBalance: 0,
    };
  },
  async mounted(){  
    await this.setUserData()
    this.userBalance  =  await this.getUserBalance;
  },
  methods: {
   ...mapActions(["setUserData"]),
  },
  computed: {
    ...mapGetters(["getUserName"]),
    
    color() {
      if (this.balance > 0) return "success";
      if (this.balance < 0) return "danger";
      return "dark";
    },
    async getUserBalance() {
      try {
        
        const userName = this.getUserName
        const response = await axios.get(`/api/groups/${this.groupname}/${userName}/balance`)
        return response.data

      } catch(err){
        console.log(err);
      }
    },
    
  },

  filters: {
    addSign(value) {
      if (value === 0) return value;
      if (value > 0) return `+ ${value}`;
      value = Math.abs(value);
      return `- ${value}`;
    },
  },
};
</script>
