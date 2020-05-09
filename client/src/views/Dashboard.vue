<template>
  <div>
    <p>Welcome !</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (!localStorage.getItem("token")) this.$router.push("/login");
  },
};
</script>
