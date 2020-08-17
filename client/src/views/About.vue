<template>
  <div>
    <h2><strong>Step 1:</strong> Create your account and log in.</h2>

    <div class="image-wrapper">
      <img src="./../assets/img/sign-up.jpg" alt="sign up" />
    </div>
    <div class="image-wrapper">
      <img src="./../assets/img/log-in.jpg" alt="log in" />
    </div>
    <h2>
      <strong>Step 2:</strong> Create your own group or join the existing one.
    </h2>
    <div class="image-wrapper">
      <img src="./../assets/img/menage-groups.jpg" alt="menage groups" />
    </div>
    <h2><strong>Step 3:</strong> Add, edit or delete the expenses.</h2>
    <div class="image-wrapper expenses">
      <img src="./../assets/img/new-expense.jpg" alt="new expense" />
    </div>
    <div class="image-wrapper expenses">
      <img src="./../assets/img/menage-expenses.jpg" alt="menage expenses" />
    </div>
  </div>
</template>

<style scoped>
.image-wrapper {
  width: 30vw;
  margin: 20px auto;
  border-radius: 20px;
  padding: 5px;
  /* border: 1px solid #2c3e50; */
  box-shadow: 6px 7px 16px 2px rgba(148, 135, 148, 1);
}

img {
  width: 100%;
}
h2 {
  margin: 50px;
}

.expenses {
  width: 45vw;
}
</style>
