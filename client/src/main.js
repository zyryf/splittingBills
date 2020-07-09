import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import axios from "axios";
// bootsrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(Vuelidate);

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:5000/";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
