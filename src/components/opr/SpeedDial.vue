<template>
<a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Speed Dial</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="content">
          this is speed dial
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
