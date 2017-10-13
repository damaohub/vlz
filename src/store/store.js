
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: ''
  },
  mutations: {
    login: (state, data) => {
      localStorage.Token = data;
      state.Token = data;
    },
    logout: (state) => {
      localStorage.removeItem('Token');
      state.Token = null
    },
    title: (state, data) => {
      state.title = data;
    },
    AllowPurse: (state,data) =>{
          state.user.AllowPurse= data;
    },
    InviteCode: (state,data) =>{
      state.user.InviteCode= data;
    }
  }
})
