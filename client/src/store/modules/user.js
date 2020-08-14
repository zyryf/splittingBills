import axios from "axios";

const state = {
  user: {
    email: "",
    name: "",
    groups: [],
    balance: 0,
  },
};

const getters = {
  getUser: (state) => {
    return state.user;
  },

  getUserName: (state) => {
    return state.user.name;
  },

  getUserGroups: (state) => {
    return state.user.groups;
  },
  getBalance: (state) => {
    return state.user.balance;
  },
};

const mutations = {
  setUser(state, userData) {
    state.user.name = userData.name;
    state.user.email = userData.email;
    if (userData.groups) state.user.groups = [...userData.groups];
    else state.user.groups = [];
  },
  SET_USER_BALANCE(state, payload) {
    state.user.balance = payload;
  },
};

const actions = {
  async setUserData(context) {
    try {
      const response = await axios.get("api/users/user", {
        headers: { token: localStorage.getItem("token") },
      });
      context.commit("setUser", response.data);
    } catch (err) {
      console.log(err);
    }
  },
  setUserBalance: async ({ commit, getters }, groupname) => {
    try {
      const userName = getters.getUserName;

      const response = await axios.get(
        `/api/groups/${groupname}/${userName}/balance`
      );

      commit("SET_USER_BALANCE", response.data);
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
