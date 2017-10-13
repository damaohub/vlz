import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  token: JSON.parse(localStorage.getItem('token'))||null,
  userInfo: JSON.parse(localStorage.getItem('userInfo'))||{}
}
export default new Vuex.Store({
  state,
  mutations: {
    updateLoadingStatus (state, status) {
      state.isLoading = status;
    },
    isLogin (state,data) {
      localStorage.token =JSON.stringify(data);
      state.token = data;
    },
    saveUserInfo (state, data) {
      localStorage.userInfo =JSON.stringify(data);
      state.userInfo = data;
    }
  }
})
