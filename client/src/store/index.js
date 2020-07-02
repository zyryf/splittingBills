import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    endOfSession: false,
  },
  getters: {},
  mutations: {
    SET_SESSION_STATUS(state, status) {
      state.endOfSession = status;
    },
    SET_LOGG_STATUS(state,status) {
      state.isLogged = status 
    }
  },
  actions: {
    isTokenExpired(context) {
      const token = localStorage.getItem("token")
      if (token) {
        console.log('checking tokex expiracy!')
        const tokenPayload = token.split(".")[1];
        const tokenData = JSON.parse(atob(tokenPayload));
        const timeLeft = tokenData.exp * 1000 - Date.now();
        
        if(timeLeft > 0) {
          setTimeout(() => {
            console.log('TOKEN EXPIRED!')
            context.commit("SET_SESSION_STATUS", true);
          }, timeLeft);
        }
      } else context.commit("SET_SESSION_STATUS", false);
    },
  },
  modules: {
    User,
  },
});
