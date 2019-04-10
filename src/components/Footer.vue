<template>
    <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
</template>

<script>
import { Layout } from 'ant-design-vue'

export default {
  name: 'Footer',
  components: {
      'a-layout-footer': Layout.Footer
  }
}
</script>
