import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/MyLogin.vue'
import Home from '@/components/MyHome.vue'

import Users from '@/components/menus/MyUsers.vue'
import Rights from '@/components/menus/MyRights.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Settings from '@/components/menus/MySettings.vue'
import UserDetail from '@/components/user/MyUserDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      redirect: '/home/users',
      component: Home,
      children: [
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'settings', component: Settings },
        { path: 'details/:id', component: UserDetail, props: true }
      ]
    }
  ]
})

router.beforeEach(function(to, from, next) {
  const pathArr = ['/home']
  if (to.path === '/home') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      alert('请登录')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
