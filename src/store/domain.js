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
  },
  params: {
    domains: [],
    domain: '',
    receiver_group_id: ''
  }
}

// getters
const getters = {
  getParams: (state) => {
    let handledParams = {
      user_session_key: Cookies.get('user_session_key'),
      page: state.pagination.current,
      per: state.pagination.pageSize
    }
    return dataHelper.deleteEmptyQueryParams(handledParams)
  },

  postParams: (state) => {
    let handledParams = {
      user_session_key: Cookies.get('user_session_key'),
      url: state.params.domain,
      receiver_group_id: state.params.receiver_group_id

    }
    return dataHelper.deleteEmptyQueryParams(handledParams)
  }
}

// actions
const actions = {
  getDomains ({ commit, getters }, app) {
    const url = '/api/v1/domains/get_domains.json'
    // commit global模块中的startLoading 改变loading状态
    commit('global/startLoading', null, { root: true })
    httpHelper.REQUEST(url, getters.getParams, 'get').then((res) => {
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
        app.$message.error(status.error_message)
      }
      commit('global/stopLoading', null, { root: true })
    }).catch((e) => {
      console.log(e)
    })
  },

  newDomain ({ commit, getters }, { app, params }) {
    const url = '/api/v1/domains.json'
    // commit global模块中的startLoading 改变loading状态
    commit('global/startLoading', null, { root: true })
    commit('setParams', params)
    console.log(getters.postParams)
    httpHelper.REQUEST(url, getters.postParams, 'post').then((res) => {
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
        app.$message.error(status.error_message)
      }
      commit('global/stopLoading', null, { root: true })
    }).catch((e) => {
      console.log(e)
    })
  },

  deleteSelected ({ commit }) {

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
  },

  setParams (state, params) {
    state.params = params
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
