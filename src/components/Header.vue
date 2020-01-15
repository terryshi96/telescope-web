<template>
  <a-layout-header
      :style="{
        padding: 0,
        background: '#1890ff',
        'line-height': '55px',
        height: '55px',
        position: 'fixed',
        width: '100%',
        'box-shadow': '0 2px 8px #6699ff',
        'z-index': 2
      }"
  >
      <div class="main">
        <p>TeleScope</p>
        <!-- <a-dropdown :trigger="['click']"> -->
        <a-dropdown>
          <a class="ant-dropdown-link" href="#">
              <a-avatar size="large" icon="user" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item @click="handleSignOut">
              <a-icon class="logout" type="logout"/>Logout
            </a-menu-item>
          </a-menu>
        </a-dropdown>

      </div>

  </a-layout-header>
</template>

<script>
import { Layout, Avatar, Dropdown, Menu, Icon } from 'ant-design-vue'
import { httpHelper } from '@/utils/http-helper'

export default {
  name: 'Header',
  components: {
    'a-layout-header': Layout.Header,
    'a-avatar': Avatar,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon
  },
  methods: {
    handleSignOut () {
      const url = '/api/v1/users/sign_out.json'
      const params = {
        user_session_key: this.$cookies.get('user_session_key'), 
      }
      httpHelper.REQUEST(url, params, 'post').then((res) => {
        const status = res.data.status
        if (status.code === '20000') {
          this.$message.success('Logout successfully')
          this.$cookies.remove('user_session_key')
          window.setTimeout(function () { window.location.href = '/' }, 500)
        } else {
          this.$message.error(status.message)
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  p {
      width: 200px;
      color: white;
      // text-align: center;
      font-size: 25px;
      margin: 0;
      padding-left: 24px;
  }
  .ant-dropdown-link.ant-dropdown-trigger {
    margin: 0;
    margin-right: 24px;
  }
  .logout {
    display: inline-block;
  }
}
</style>
