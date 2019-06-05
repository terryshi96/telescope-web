import Vue from 'vue'
import Vuex from 'vuex'
import domain from './store/domain'
import global from './store/global'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    global,
    domain
  },
  strict: process.env.NODE_ENV !== 'production'

  // 类似react 中的state，对应计算属性
  // root state object.
  // each Vuex instance is just a single state tree.
  // state: {

  // },
  // getters are functions
  // getters中的函数不改变state, 而是根据state计算相应的值，对应计算属性
  // getters : {
  // cartProducts: (state, getters, rootState) => {
  //   return state.items.map(({ id, quantity }) => {
  //     const product = rootState.products.all.find(product => product.id === id)
  //     return {
  //       title: product.title,
  //       price: product.price,
  //       quantity
  //     }
  //   })
  // },

  // cartTotalPrice: (state, getters) => {
  //   return getters.cartProducts.reduce((total, product) => {
  //     return total + product.price * product.quantity
  //   }, 0)
  // }
  // }

  // 通过mutation 改变state的状态 这一点与react不同。通常不直接使用而是由action调用
  // 通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更
  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  // mutations: {

  // },
  // Action 类似于 mutation，不同在于：
  // Action 提交的是 mutation，而不是直接变更状态。 即可以在action中调用mutation
  // Action 可以包含任意异步操作。 对应侦听属性或方法属性
  // 通过 store.dispatch 方法触发
  // 实践中，我们会经常用到 ES2015 的 参数解构 来简化代码, 提取object中对应的键值对作为参数传入
  // actions are functions that cause side effects and can involve
  // asynchronous operations.
  // actions: {
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit('setProducts', products)
  //   })
  // }
  // }

})
