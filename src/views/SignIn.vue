<template>
  <div>
    <div class="login_form">
        <!-- v-model用户数据双向绑定, ref用来给元素或子组件注册引用信息 -->
        <!-- 1、ref 加在普通的元素上，用this.ref.name 获取到的是dom元素 -->
        <!-- 2、ref 加在子组件上，用this.ref.name 获取到的是组件实例，可以使用组件的所有方法。 -->
      <a-input placeholder="Username" v-model="userName" ref="userName" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emitEmpty('userName')" />
      </a-input>
      <a-input placeholder="Password" v-model="password" ref="password" size="large" :type="pwdType">
        <a-icon v-if="visible" slot="prefix" type="eye-invisible" @click="showPassword" />
        <a-icon v-else slot="prefix" type="eye" @click="showPassword" />
        <a-icon v-if="password" slot="suffix" type="close-circle" @click="emitEmpty('password')" />
      </a-input>
      <a-button class="login_btn" @click="login" type="primary" :disabled="isBtnLoading" :loading="isBtnLoading" block>{{ btnText }}</a-button>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Input } from 'ant-design-vue'
import { httpHelper } from '@/utils/http-helper'
import { Base64 } from 'js-base64'

export default {
  data () {
    return {
      userName: '',
      password: '',
      pwdType: 'password',
      visible: false,
      isBtnLoading: false
    }
  },
  components: {
    'a-button': Button,
    'a-icon': Icon,
    'a-input': Input
  },
  created () {
    // 记住用户后 从localstorage中获得用户信息
  },
  computed: {
    btnText () {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    }
  },
  methods: {
    login () {
      if (!this.userName) {
        this.$message.error('请输入用户名')
        return
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return
      }
      this.isBtnLoading = true
      const type = 'post'
      const url = '/api/v1/users/sign_in.json'
      const params = {
        account: this.userName,
        password: this.password
      }
      httpHelper.REQUEST(url, params, type).then((res) => {
        const status = res.data.status
        if (status.code === '20000') {
          const user = res.data.data.user
          this.$cookies.set('user_session_key', user.authentication_token)
          this.$cookies.set('name', Base64.encode(user.account), { expires: 30 })
          this.$cookies.set('pass', Base64.encode(user.password), { expires: 30 })
          window.setTimeout(function () { window.location.href = '/opr' }, 1000)
        } else {
          this.$message.error(status.message)
          this.isBtnLoading = false
        }
      }).catch((e) => {
        console.log(e)
      })
    },

    showPassword () {
      this.visible = !this.visible
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },

    emitEmpty (inputName) {
      this.$refs[inputName].focus()
      this[inputName] = ''
    }
  }
}
</script>

<style lang="scss">
.login_form .anticon-close-circle {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}
.login_form .anticon-close-circle:hover {
  color: #999;
}
.login_form .anticon-close-circle:active {
  color: #666;
}
</style>
