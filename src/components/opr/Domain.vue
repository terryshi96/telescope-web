<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          this is domain list
        </div>
      </a-layout-content>
</template>

<script>
import { Layout, Breadcrumb } from 'ant-design-vue'
export default {
  components: {
    'a-layout-content': Layout.Content,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item
  }
}
</script>
