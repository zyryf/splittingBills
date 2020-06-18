<template>
  <div>
    <b-card
      bg-variant="secondary"
      text-variant="white"
      header="Members"
      class="text-center"
      header-bg-variant="dark"
    >
      <b-alert
        show
        variant="light"
        v-for="(member, index) in members"
        :key="index"
        >{{ member }}</b-alert
      >
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["members"],
  data() {
    return {};
  }
};
</script>