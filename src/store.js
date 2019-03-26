import Vue from 'vue'
import Vuex from 'vuex'
import domain from './store/domains'
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)

export default new Vuex.Store({
  // 类似react 中的state
  // state: {

  // },
  // 通过mutation 改变state的状态 这一点与react不同
  // 通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更
  // mutations: {

  // },
  // Action 类似于 mutation，不同在于：
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  // actions: {

  // }
  modules: {
    domain
  }
})
