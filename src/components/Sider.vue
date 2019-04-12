<template>
    <a-layout-sider
      collapsible
      v-model="collapsed"
      theme="light"
      :style="{ overflow: 'auto', position: 'fixed', left: 0, top: '55px', bottom: '48px' }"
    >

      <a-menu theme="light" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="compass" />
          <span>Speed Dial</span>
        </a-menu-item>
        <a-sub-menu
          key="sub1"
        >
          <span slot="title"><a-icon type="hdd" /><span>Monitoring</span></span>
          <a-menu-item key="2">SSL Expiration</a-menu-item>
          <a-menu-item key="3">Sites</a-menu-item>
        </a-sub-menu>
        <a-sub-menu
          key="sub2"
        >
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
      collapsed: false
    }
  }
}
</script>

