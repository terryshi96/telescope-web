<template>
  <a-layout-header style="background: #fff; padding: 0">
    this is header
  </a-layout-header>
</template>

<script>
import { Layout } from 'ant-design-vue'

export default {
  name: 'Header',
  components: {
    'a-layout-header': Layout.Header
  }
}
</script>
