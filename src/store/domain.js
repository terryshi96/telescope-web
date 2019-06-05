// initial state
import { httpHelper, dataHelper } from '@/utils/Utils-helper'
import Cookies from 'js-cookie'

const state = {
  items: [],
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
    'showSizeChanger': true,
    'showQuickJumper': true
  }
}

// getters
const getters = {
  params: (state) => {
    return {
      user_session_key: Cookies.get('user_session_key'),
      page: state.pagination.current,
      per: state.pagination.pageSize
    }
  }
}

// actions
const actions = {
  getDomains ({ commit, getters }) {
    const url = '/api/v1/domains/get_domains.json'
    // commit global模块中的startLoading 改变loading状态
    commit('global/startLoading', null, { root: true })
    httpHelper.REQUEST(url, getters.params, 'get').then((res) => {
      const status = res.data.status
      if (status.code === '20000') {
        let items = res.data.data.domains
        items.map((item) => {
          item.expire_date = dataHelper.dateCommonFormat(item.expire_date)
          item.updated_at = dataHelper.dateCommonFormat(item.updated_at)
        })
        commit('setDomainItems', items)
        commit('setTotal', res.data.data.count)
      } else {
        this.$message.error(status.message)
      }
      commit('global/stopLoading', null, { root: true })
    }).catch((e) => {
      console.log(e)
    })
  },

  handleParams ({ commit }) {

  },

  handleTableChange ({ commit, state, dispatch }, changes) {
    // console.log(changes)
    commit('setPagination', changes)
    dispatch('getDomains')
  }

}

// mutations
// 你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
// 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
const mutations = {
  setDomainItems (state, items) {
    state.items = items
  },
  setPagination (state, pagination) {
    state.pagination = pagination
  },
  setTotal (state, total) {
    state.pagination.total = total
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
