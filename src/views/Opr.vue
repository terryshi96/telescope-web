<template>
    <a-layout id="opr-layout" style="min-height: 100vh">
        <Header></Header>
        <a-layout>
          <Sider></Sider>
          <a-layout :style="{ marginLeft: '80px', marginTop: '55px'}">
            <router-view/>
            <Footer></Footer>
          </a-layout>
        </a-layout>
    </a-layout>
</template>

<script>
import Header from '@/components/Header.vue'
import Sider from '@/components/Sider.vue'
import Footer from '@/components/Footer.vue'
import { Layout } from 'ant-design-vue'

export default {
  components: {
    Header,
    Footer,
    Sider,
    'a-layout': Layout
  },
  beforeCreate () {
    // 判断是否已经登陆
    let userSessionKey = this.$cookies.get('user_session_key')
    if (userSessionKey === 'undefined') {
      this.$cookies.remove('user_session_key')
      userSessionKey = null
    }
    if (userSessionKey === null) {
      this.$message.error('Please login first!')
      window.setTimeout(function () { window.location.href = '/' }, 1500)
    }
  }
}
</script>
