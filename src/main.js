// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import store from './vuex/store'
import router from './router';
import App from './App'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

FastClick.attach(document.body)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')



