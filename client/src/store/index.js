import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
import { vm } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    endOfSession: false,
    timerTime: 0,
  },
  getters: {},
  mutations: {
    SET_SESSION_STATUS(state, status) {
      state.endOfSession = status;
    },
    SET_LOGG_STATUS(state, status) {
      state.isLogged = status;
    },
    SET_TIME(state, time) {
      state.timerTime = Math.round(time / 1000);
    },
    LOG_OUT(state) {
      localStorage.clear();
      state.isLogged = false;
      vm.$router.push("/");
      state.timerTime = 0;
    },
  },
  actions: {
    isTokenExpired(context) {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenPayload = token.split(".")[1];
        const tokenData = JSON.parse(atob(tokenPayload));
        const timeLeft = tokenData.exp * 1000 - Date.now();

        if (timeLeft > 0) {
          context.commit("SET_TIME", timeLeft);
          setTimeout(() => {
            context.commit("SET_SESSION_STATUS", true);
            context.commit("LOG_OUT");
          }, timeLeft);
        }
      } else context.commit("SET_SESSION_STATUS", false);
    },
  },
  modules: {
    User,
  },
});
