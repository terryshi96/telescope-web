<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Monitoring</a-breadcrumb-item>
          <a-breadcrumb-item>SSL Expiration</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="content">
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
