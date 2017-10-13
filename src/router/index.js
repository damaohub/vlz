import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import TaskList from '@/components/TaskList'
import Invite from '@/components/Invite'
import Center from '@/components/Center'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Pawdfg from '@/components/Pawdfg'
import Wallet from '@/components/Wallet'
import getCash from '@/components/getCash'
import detail from '@/components/detail'

Vue.use(Router)
 var routes =  [
   {
     path: '/',
    redirect: '/users',
     meta: {
       requireAuth: true,
     }

   },
    {
      path: '/users',
      name: '账号列表',
      meta: {
        requireAuth: true,
      },
      component: Users
    },
    {
      path: '/tasklist',
      name: '任务记录',
      meta: {
        requireAuth: true,
      },
      component: TaskList
    },
     {
      path: '/invite',
      name: '推广邀请',
       meta: {
         requireAuth: true,
       },
      component: Invite
    },
    {
      path: '/center',
      name: '个人中心',
      meta: {
        requireAuth: true,
      },
      component: Center
    },
     {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/pawdfg',
      name: '修改密码',
      component: Pawdfg
    },
   {
     path: '/wallet',
     name: '钱包明细',
      meta: {
        requireAuth: true,
      },
     component: Wallet
   },
    {
     path: '/getcash',
     name: '提现',
      meta: {
        requireAuth: true,
      },
     component: getCash
   },
   {
     path: '/detail',
     name: '推广详情',
     meta: {
       requireAuth: true,
     },
     component: detail
   }
  ];



// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('Token')) {
//   store.commit('login', window.localStorage.getItem('Token'))
// }

const router = new Router({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.localStorage.getItem('Token')) {
      next();
    }
    else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router;


// export default new Router({
//   linkActiveClass: 'is-selected',
//   routes: routes ,
//
// })

