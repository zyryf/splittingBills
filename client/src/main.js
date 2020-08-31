import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import axios from "axios";
import FB_init from "../src/SDK/facebook";
import vuescroll from "vuescroll";

// bootsrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import vuetify from "./plugins/vuetify";
import VueWindowSize from "vue-window-size";

// You can set global config here.
Vue.use(vuescroll, {
  ops: {
    // The global config
    mode: "slide",
    bar: {
      background: "#6C63FF",
    },
  }, // customize component name, default -> vueScroll
});

Vue.use(VueWindowSize);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

// Facebook Initialization
FB_init();

export { vm };
