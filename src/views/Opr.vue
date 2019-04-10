<template>
    <a-layout id="opr-layout" style="min-height: 100vh">
        <Sider></Sider>
        <a-layout>
          <Header></Header>
          <router-view/>
          <Footer></Footer>
        </a-layout>
    </a-layout>
</template>

<script>
import Header from '@/components/Header.vue'
import Sider from '@/components/Sider.vue'
import Footer from '@/components/Footer.vue'
import { Layout } from 'ant-design-vue'

export default {
  components: {
    Header,
    Footer,
    Sider,
    'a-layout': Layout
  }
}
</script>
