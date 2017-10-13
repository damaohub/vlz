// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/'
import store from './store/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created: function() {
    //this.checkLogin();
  },
   methods: {
      checkLogin: function (){
          if(window.localStorage.getItem('user')) {
            this.$router.push('/users');
          }else{
             this.$router.push('/login');
          }
      }

  }

})


