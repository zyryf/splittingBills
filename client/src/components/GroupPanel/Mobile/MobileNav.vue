<template>
  <div id="mobileNav">
    <button class="groups-btn">GROUPS</button>
    <button class="new-expense-btn"></button>
    <button class="menu-btn">MENU</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {},
};
</script>

<style lang="scss">
#mobileNav {
    display: flex;
    justify-content: space-between;
  width: 100vw;
  height: 60px;
  background-color: #3f3d56;
  position: fixed;
  bottom: -4px;
}

.new-expense-btn {

  width: 80px;
  height: 80px;
  background: #6c63ff;
  border-radius: 50%;

  position: relative;
  bottom: 30px;
  box-shadow: 0px 5px 30px 5px rgba(0, 0, 0, 0.3);
  &:before {
  content: "+";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  font-size:50px;
  font-family:courier;
  color:white;
  }
}


.groups-btn,
.menu-btn{
    color: white;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;

}
</style>
