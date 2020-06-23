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
        <h3 class=" mr-4">{{ balance | addSign }} PLN</h3>
        <b-button v-if="balance < 0" variant="danger">Pay</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["balance"],
  data() {
    return {};
  },
  computed: {
    color() {
      if (this.balance > 0) return "success";
      if (this.balance < 0) return "danger";
      return "dark";
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
