import axios from "axios";

const state = {
    user: {
        email: "",
        name: "",
        groups: []
    }
}

const getters = {
    getUser: (state) => {
        return state.user
    },

    getUserName: (state) => {
        return state.user.name;
    },

    getUserGroups: (state) => {
        return state.user.groups;
    }
};

const mutations = {
    setUser(state, userData) {
        state.user.name = userData.name;
        state.user.email = userData.email;
        if(userData.groups) state.user.groups = [...userData.groups]
        else state.user.groups = []
    }
}

const actions = {
    async setUserData(context) {
        try {
          const response = await axios.get("api/users/user", {
            headers: { token: localStorage.getItem("token") }
          });
          console.log(response.data)
          context.commit('setUser', response.data)
        } catch (err) {
          console.log(err);
        }
      }
}

export default {
    state,
    getters,
    mutations,
    actions
};