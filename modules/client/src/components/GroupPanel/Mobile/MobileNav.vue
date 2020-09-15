<template>
  <div id="mobileNav">
    <button class="groups-btn" @click="$router.push('/dashboard')">
      GROUPS
    </button>
    <button class="new-expense-btn" @click="$router.push(`/group-panel/${groupname}/new-expense`)"></button>
    <button class="menu-btn" @click="$router.push(`/group-panel/${groupname}/menu`)">MENU</button>
    <Menu v-if="menuON"/>
    </div>
</template>

<script>
import Menu from './MobileMenu'
import NewExpense from './MobileNewExpense'
export default {
  props: ['groupname'],
  data() {
    return {
      menuON: false,
      newExpenseON: false,
    };
  },
  components: {
    Menu,
    NewExpense,
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
#mobileNav {
  z-index: 10;
  width: 100vw;
  height: 60px;
  background-color: #3f3d56;
  position: fixed;
  bottom: -4px;
  box-shadow: 0px -5px 30px 5px rgba(0, 0, 0, 0.3);
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
    text-align: center;
    font-size: 50px;
    font-family: courier;
    color: white;
  }
}

.groups-btn,
.menu-btn {
  position: absolute;
  color: white;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 20px;
  top: 15px;
}
.groups-btn {
  left: 0px;

}
.menu-btn {
  right: 0px;
}

</style>
