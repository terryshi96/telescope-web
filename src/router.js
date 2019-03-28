import Vue from 'vue'
import Router from 'vue-router'
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
import Home from '@/views/Home.vue'
import Login from '@/views/SignIn.vue'
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(Router)

// 模块化机制编程 将该组件export
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 2. 定义路由
  // 每个路由应该映射一个组件。 其中"component" 可以是
  // 通过 Vue.extend() 创建的组件构造器，
  // 或者，只是一个组件配置对象。
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/helloworld',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'default',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Default.vue')
    }
    // 嵌套路由写法
    // { path: '/user/:id', component: User,
    //   children: [
    //     {
    //       // 当 /user/:id/profile 匹配成功，
    //       // UserProfile 会被渲染在 User 的 <router-view> 中
    //       path: 'profile',
    //       component: UserProfile
    //     },
    //     {
    //       // 当 /user/:id/posts 匹配成功
    //       // UserPosts 会被渲染在 User 的 <router-view> 中
    //       path: 'posts',
    //       component: UserPosts
    //     }
    //   ]
    // }
  ]
})
