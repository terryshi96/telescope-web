// initial state
import { httpHelper } from '@/utils/http-helper'
import Cookies from 'js-cookie'

const state = {
  items: []
}

// getters
const getters = {
}

// actions
const actions = {
  getDomains ({ commit }) {
    const url = '/api/v1/domains/get_domains.json'
    const params = {
      user_session_key: Cookies.get('user_session_key')
    }
    httpHelper.REQUEST(url, params, 'get').then((res) => {
      const status = res.data.status
      if (status.code === '20000') {
        commit('setDomainItems', res.data.data.domains)
      } else {
        this.$message.error(status.message)
      }
    }).catch((e) => {
      console.log(e)
    })
  }
}

// mutations
const mutations = {
  setDomainItems (state, items) {
    state.items = items
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
