// initial state
const state = {
  loading: false,
  delayTime: 500
}

// getters
// 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来
const getters = {
}

// actions
// 局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
const actions = {
  startLoading ({ commit }) {
    commit('startLoading')
  },
  stopLoading ({ commit }) {
    commit('stopLoading')
  },
  changeLoading ({ commit }) {
    commit('changeLoading')
  }
}

// mutations
const mutations = {
// state 为模块的局部状态对象
  startLoading (state) {
    state.loading = true
  },
  stopLoading (state) {
    state.loading = false
  },
  changeLoading (state) {
    state.loading = !state.loading
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
