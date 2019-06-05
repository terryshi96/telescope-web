import axios from 'axios'
import { Base64 } from 'js-base64'
import { notification } from 'ant-design-vue'
import Cookies from 'js-cookie'

let isRefreshing = false
const ApiConfig = {
  api_url: '',
  api_uid: 'b373bfd492df5845d525637240649a0f0d7f846945f1a4d6725b5057528494b4',
  api_secret: 'bcd6c52c1718311b6977a233af69c2ddcfc714e5e28ee8707454a46b6fa03375'
}

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
const instance = axios.create({
  baseURL: ApiConfig.api_url
})
let refreshSubscribers = []

class HttpHelper {
  constructor () {
    // 将interceptor绑定到httphelper实例
    this.axiosInterceptor(instance)
  }
  /**
     * axios interceptors
     */
  axiosInterceptor (axios) {
    // request token interceptor
    axios.interceptors.request.use(
      // 在发送请求之前做些什么
      (config) => this.requestInterceptor(config),
      // 对请求错误做些什么
      (error) => { return Promise.reject(error) }
    )

    // response interceptor
    axios.interceptors.response.use(
      // 对响应数据做点什么
      (response) => { return response },
      // 对响应错误做点什么
      (error) => { return Promise.reject(error) }
    )
  }
  /**
     * request interceptor
     * @param config
     */
  requestInterceptor (config) {
    // console.log('request!!!!!!!!!!!!!!!!!!!!!!!!!', config.url)
    const token = JSON.parse(localStorage.getItem('token'))
    // token request
    if (config.url === `/${ApiConfig.api_url}oauth/token.json?`) return config
    // token expired
    else if (token === null || !token.access_token || token.created_at + token.expires_in < new Date().getTime() / 1000) {
      // use isRefreshing adjust status
      if (!isRefreshing) {
        isRefreshing = true
        this.getToken()
          .then(res => {
            const tokenObj = {
              created_at: res.data.created_at,
              expires_in: res.data.expires_in,
              access_token: res.data.access_token
            }
            localStorage.setItem('token', JSON.stringify(tokenObj))
            // 更新token
            // console.log('3333333333333')
            this.onRefreshed(res.data.access_token)
          })
      }
      // 异步刷新token
      const retryOrigReq = new Promise((resolve, reject) => {
        // console.log('111111111111')
        // 将一个赋值函数push到数组中
        this.subscribeTokenRefresh((newToken) => {
          // console.log('444444444444444444')
          // replace the expired token and retry
          // todo check config
          config.method === 'post' ? config.data.access_token = newToken : config.params.access_token = newToken
          resolve(config)
        })
      })
      return retryOrigReq
    }
    return config
  }

  /**
   * 获取token
   */
  getToken () {
    const url = `/${ApiConfig.api_url}oauth/token.json?`
    const params = {
      client_id: ApiConfig.api_uid,
      client_secret: ApiConfig.api_secret,
      grant_type: 'client_credentials'
    }
    return instance.post(url, params)
  }

  /**
     * subscribe need refresh URL
     * @param {callback} cb
     */
  subscribeTokenRefresh (cb) {
    refreshSubscribers.push(cb)
    // console.log('222222222222222')
  }

  /**
   * refresh URLs
   * @param {} token
   */
  onRefreshed (token) {
    // 调用压入的赋值函数
    refreshSubscribers.map(cb => {
      cb(token)
    })
    // console.log('5555555555555555')
    refreshSubscribers = []
    isRefreshing = false
  }
  /**
   * 自定义封装请求
   * @param url
   * @param params
   * @param type
   * @returns {*}
   * @constructor
   */
  REQUEST (url, params, type) {
    return this.requestBody(url, params, type)
  }

  /**
     *
     * @param {*} url
     * @param {*} params
     * @param {*} type
     */
  requestBody (url, params, type) {
    const token = JSON.parse(localStorage.getItem('token'))
    params['access_token'] = token ? token.access_token : ''
    // console.log(params['access_token'])
    switch (type) {
      case 'get':
        // user_session_key失效时，取得cookie中的账户重新获取session_key,然后再次发请求
        return instance.get(url, { params }).then((res) => {
          if (res.data.status.code === '50001' && Cookies.get('name') && Cookies.get('pass')) {
            return this.signIn().then((status) => {
              return status && instance.get(url, { params })
            })
          }
          return res
        })
      case 'post':
        return instance.post(url, params).then((res) => {
          if (res.data.status.code === '50001' && Cookies.get('name') && Cookies.get('pass')) {
            return this.signIn().then((status) => {
              return status && instance.post(url, params)
            })
          }
          return res
        })
      case 'put':
        return instance.put(url, params).then((res) => {
          if (res.data.status.code === '50001' && Cookies.get('name') && Cookies.get('pass')) {
            return this.signIn().then((status) => {
              return status && instance.put(url, params)
            })
          }
          return res
        })
      case 'delete':
        return instance.delete(url, { params }).then((res) => {
          if (res.data.status.code === '50001' && Cookies.get('name') && Cookies.get('pass')) {
            return this.signIn().then((status) => {
              return status && instance.delete(url, { params })
            })
          }
          return res
        })
      case 'patch':
        return instance.patch(url, params).then((res) => {
          if (res.data.status.code === '50001' && Cookies.get('name') && Cookies.get('pass')) {
            return this.signIn().then((status) => {
              return status && instance.patch(url, params)
            })
          }
          return res
        })
    }
  }

  signIn () {
    const type = 'post'
    const url = '/api/v1/users/sign_in.json'
    const params = {
      account: Base64.decode(Cookies.get('name')),
      password: Base64.decode(Cookies.get('pass'))
    }

    return this.REQUEST(url, params, type).then((res) => {
      const status = res.data.status
      if (status.code === '20000') {
        const user = res.data.data.user
        Cookies.set('user_session_key', user.user_session_key)
        return true
      } else {
        notification.error({
          description: status.message
        })
        window.sessionStorage.clear()
        for (const o of ['user_session_key', 'user_id', 'user']) {
          if (Cookies.get(o)) {
            Cookies.remove(o)
          }
        }
        localStorage.removeItem('token')
        window.setTimeout(function () { window.location.href = '/' }, 2000)
        return false
      }
    }).catch((e) => {
      console.log(e)
    })
  }
}

let httpHelper = new HttpHelper()
export { httpHelper }
