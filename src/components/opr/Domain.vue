<template>

    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Monitoring</a-breadcrumb-item>
          <a-breadcrumb-item>SSL Expiration</a-breadcrumb-item>
          <a-breadcrumb-item>Loading state：<a-switch v-model="spinning"></a-switch></a-breadcrumb-item>
        </a-breadcrumb>
        <a-spin :spinning="spinning" :delay="delayTime">
          <div class="content">
              可以点击‘切换’按钮，延迟显示 loading 效果。当 spinning 状态在 `delay` 时间内结束，则不显示 loading 状态   
          </div>
        </a-spin>
      </a-layout-content>
</template>

<script>
import { Layout, Breadcrumb, Spin, Switch } from 'ant-design-vue'
export default {
  components: {
    'a-layout-content': Layout.Content,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-spin': Spin,
    'a-switch': Switch
  },
  data () {
      return {
        spinning: false,
        delayTime: 500,
      }
    },
  methods: {
    changeSpinning(){
      this.spinning = !this.spinning
    }
  },
}
</script>
