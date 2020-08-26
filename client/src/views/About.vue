<template>
  <div>
    <h2>
      <strong>How does it <span class="primary--text">work</span> ?</strong>
    </h2>

    <p>
      Start sharing your payments <br v-if="windowWidth < 600" />
      just a few simple steps
    </p>
    <h3>Step One</h3>
    <p>Create accout & log in</p>
    <img src="../assets/img/about-login.png" alt="login photo" />
    <h3>Step Two</h3>
    <p>
      Create your own group <br v-if="windowWidth < 600" />
      or join the existing one
    </p>
    <img src="../assets/img/about-group.png" alt="group photo" />
    <h3>Step Three</h3>
    <p>Manage your expenses</p>
    <img src="../assets/img/about-money.png" alt="money photo" />
    <h3>Step Four</h3>
    <p>Pay online</p>
    <img src="../assets/img/about-pay.png" alt="pay photo" />
  </div>
</template>

<style scoped>
h2 {
  font-size: 36px;
  margin: 30px 0px 10px 0px;
}
p {
  font-size: 20px;
}
img {
  width: 80vw;
  margin-bottom: 30px;
}
h3:nth-of-type(1) {
  margin-top: 30px;
}
</style>
