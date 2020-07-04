<template>
  <div>
    <p>Session time: {{ time.minutes }}: {{ time.seconds | addZero }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: {
        seconds: 0,
        minutes: 0,
      },
    };
  },
  created() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.time.minutes = Math.floor(this.$store.state.timerTime / 60);
      this.time.seconds = this.$store.state.timerTime % 60;

      const timerInterval = setInterval(() => {
        if (this.time.seconds > 0) {
          this.time.seconds--;
        } else if (this.time.minutes > 0) {
          this.time.minutes--;
          this.time.seconds = 59;
        } else {
          clearInterval(timerInterval);
        }
      }, 1000);
    },
  },

  filters: {
    addZero(value) {
      return value / 10 < 1 ? `0${value}` : value;
    },
  },
};
</script>

<style scoped>
p {
  padding: 5px;
  margin: 20px 30px;
  font-size: 20px;
}
</style>
