import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#6C63FF",
      },
    },
  },
  icons: {
    iconfont: "fa",
  },
});

export default vuetify;
