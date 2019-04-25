<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Monitoring</a-breadcrumb-item>
          <a-breadcrumb-item>SSL Expiration</a-breadcrumb-item>
        </a-breadcrumb>
        <a-spin :spinning="loading" :delay="delayTime">
          <div class="content">
              可以点击‘切换’按钮，延迟显示 loading 效果。当 spinning 状态在 `delay` 时间内结束，则不显示 loading 状态
          </div>
        </a-spin>
      </a-layout-content>
</template>

<script>
import { Layout, Breadcrumb, Spin } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    'a-layout-content': Layout.Content,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-spin': Spin
  },

  // data () {
  //   return {
  //     delayTime: 500
  //   }
  // },

  computed: {
    ...mapState('global', [
      'loading',
      'delayTime'
    ]),
    ...mapState('domain', [
      'items'
    ])
  },

  methods: {
    ...mapActions('global', [
      'startLoading',
      'stopLoading'
    ]),
    ...mapActions('domain', [
      'getDomains'
    ])
  },

  created () {
    this.getDomains()
  }
}
</script>
