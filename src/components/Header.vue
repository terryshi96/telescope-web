<template>
  <a-layout-header :style="{padding: 0, background: '#077CBC', 'line-height': '55px', height: '55px', position: 'fixed', width: '100%' }">
      <div class="logo">
        <p>Telescope</p>
      </div>
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

<style lang="scss">
.logo {
  p {
      width: 200px;
      color: white;
      // text-align: center;
      font-size: 25px;
      margin: 0;
      padding-left: 24px;
  }
}
</style>
