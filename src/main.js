import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { message } from 'ant-design-vue'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.use(VueCookies)

new Vue({
  // 挂载路由
  // 通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
  router,
  // // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件 子组件能通过 this.$store 访问到
  store,
  render: h => h(App)
}).$mount('#app')
// 单页应用，只挂载一个app
