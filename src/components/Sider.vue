<template>
    <a-layout-sider
      theme="light"
      collapsible
      v-model="collapsed"
      :style="{ overflow: 'auto', position: 'fixed', left: 0, top: '111px', bottom: 0, 'z-index': 2 }"
      @mouseleave="mouseleave"
    >

      <a-menu theme="light" :defaultSelectedKeys="['1']" mode="inline">

        <a-menu-item key="1">
            <router-link to="/opr" tag="span">
              <a-icon type="compass" />
              <span>Speed Dial</span>
            </router-link>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="hdd" /><span>Monitoring</span></span>

          <a-menu-item key="2">
            <router-link to="/opr/domain">SSL Expiration</router-link>
          </a-menu-item>

          <a-menu-item key="3">Sites</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="setting" /><span>Settings</span></span>

          <a-menu-item key="5">User</a-menu-item>

          <a-menu-item key="6">Notification</a-menu-item>
        </a-sub-menu>

      </a-menu>
    </a-layout-sider>
</template>

<script>
import { Layout, Menu, Icon } from 'ant-design-vue'

export default {
  name: 'Sider',
  components: {
    'a-layout-sider': Layout.Sider,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-sub-menu': Menu.SubMenu,
    'a-icon': Icon
  },
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    mouseleave () {
      this.collapsed = true
    }
    // mouseenter() {
    //   this.collapsed = false
    // }
  }
}
</script>

<style lang="scss">
  .ant-layout-sider-trigger {
    top: 63px;
    border-right: 1px solid #e8e8e8;
  }
</style>
