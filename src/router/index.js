import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import Users from '@/pages/users'
import Invite from '@/pages/invite'
import inviteDetail from '@/pages/inviteDetail'
import Record from '@/pages/record'
import Center from '@/pages/center'
import Bill from '@/pages/bill'
import Withdraw from '@/pages/withdraw'
import Login from '@/pages/login'
import Regist from '@/pages/regist'
import Repass from '@/pages/repass'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: '账号列表',
    meta: {
      requireAuth: true
    },
    component: Users
  },
  {
    path:'/invite',
    name: '推广邀请',
    meta: {
      requireAuth: true
    },
    component: Invite,
  },
  {
    path: '/invite/detail',
    name: '推广详情',
    meta: {
      requireAuth: true
    },
    component: inviteDetail
  },
  {
    path: '/record',
    name: '任务记录',
    meta: {
      requireAuth: true
    },
    component: Record
  },
  {
    path: '/center',
    name: '个人中心',
    meta: {
      requireAuth: true
    },
    component: Center
  },
  {
    path: '/center/bill',
    name: '明细',
    meta: {
      requireAuth: true
    },
    component: Bill
  },
  {
    path: '/center/withdraw',
    name: '提现',
    meta: {
      requireAuth: true
    },
    component: Withdraw
  },
  {
    path:'/login',
    name: '登录',
    component: Login
  },
  {
    path:'/regist',
    name: '注册',
    component: Regist
  },
  {
    path:'/repass',
    name: '重置密码',
    component: Repass
  }
];

const router = new Router({
  routes
})

router.beforeEach(function (to, from, next) {
  if(to.meta.requireAuth){
    if(store.state.token||JSON.parse(localStorage.getItem('token'))){
      store.state.token=JSON.parse(localStorage.getItem('token'));
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
      store.commit('updateLoadingStatus', false)
      Vue.$vux.toast.show({
        text: '请登录先',
        type: 'warn'
      })
    }
  }else{
    store.commit('updateLoadingStatus',  true);
    next()
  }
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', false)
})

export default router;
