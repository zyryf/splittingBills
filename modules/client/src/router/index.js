import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import GroupPanel from "../views/GroupPanel.vue"
import MobileMenu from "../components/GroupPanel/Mobile/MobileMenu.vue"
import NewExpense from "../components/NewExpense.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/group-panel/:groupname",
    name: "GroupPanel",
    component: GroupPanel,
    props: true
  },
  {
    path: "/group-panel/:groupname/menu",
    name: "MobileMenu",
    component: MobileMenu,
    props: true
  },
  {
    path: "/group-panel/:groupname/new-expense",
    name: "NewExpense",
    component: NewExpense,
    props: true
  }


];

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
});

export default router;
