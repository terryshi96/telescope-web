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
