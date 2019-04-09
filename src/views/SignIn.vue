<template>
  <div>
    <div class="background"></div>
    <div class="login_form">
        <!-- v-model用户数据双向绑定, ref用来给元素或子组件注册引用信息 -->
        <!-- 1、ref 加在普通的元素上，用this.ref.name 获取到的是dom元素 -->
        <!-- 2、ref 加在子组件上，用this.ref.name 获取到的是组件实例，可以使用组件的所有方法。 -->
      <p id="title">Telescope</p>
      <hr>
      <br>
      <div class="blank"></div>
      <a-input placeholder="Username" v-model="userName" ref="userName" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emitEmpty('userName')" />
      </a-input>
      <div class="blank"></div>
      <a-input placeholder="Password" v-model="password" ref="password" size="large" :type="pwdType">
        <a-icon v-if="visible" slot="prefix" type="eye-invisible" @click="showPassword" />
        <a-icon v-else slot="prefix" type="eye" @click="showPassword" />
        <a-icon v-if="password" slot="suffix" type="close-circle" @click="emitEmpty('password')" />
      </a-input>
      <div class="blank"></div>
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
      if (this.isBtnLoading) return 'Logining...'
      return 'Login'
    }
  },
  methods: {
    login () {
      if (!this.userName) {
        this.$message.error('Please enter username!')
        return
      }
      if (!this.password) {
        this.$message.error('Please enter password!')
        return
      }
      this.isBtnLoading = true
      const type = 'post'
      const url = '/api/v1/users/sign_in.json'
      const params = {
        account: this.userName,
        password: this.password
      }
      // httpHelper.REQUEST(url, params, type).then((res) => {
      //   const status = res.data.status
      //   if (status.code === '20000') {
      //     const user = res.data.data.user
      //     this.$cookies.set('user_session_key', user.authentication_token)
      //     this.$cookies.set('name', Base64.encode(user.account), { expires: 30 })
      //     this.$cookies.set('pass', Base64.encode(user.password), { expires: 30 })
          window.setTimeout(function () { window.location.href = '/opr' }, 1000)
      //   } else {
      //     this.$message.error(status.message)
      //     this.isBtnLoading = false
      //   }
      // }).catch((e) => {
      //   console.log(e)
      // })
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
.background {
  background-image: url(../assets/pexels-photo.jpg);
  background-size: 90%;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
.login_form {
  width: 400px;
  margin: 0 auto;
  padding-top: 200px;
}
#title {
  font-size: 50px;
  margin: 0;
  text-align: center;
}
.blank {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
