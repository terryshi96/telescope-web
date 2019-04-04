<template>
  <div class="home">
  <img src="../assets/logo.png">
    <div>
      <p>
        If Ant-Design-Vue is successfully added to this project, you'll see an
        <code v-text="'<a-button>'"></code>
        below
      </p>
      <a-button type="primary">Primary</a-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
// 所有.vue结尾的文件都是vue实例组件，有类似React的props的概念
// 引入组件
import HelloWorld from '@/components/HelloWorld.vue'
import { Button } from 'ant-design-vue'

export default {
  name: 'Home',
  // 子组件注册
  components: {
    HelloWorld,
    'a-button': Button
  }
  // 引入store中的函数, 使用map辅助方法，避免重复写this.$store, 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
  // computed: {
  // ...mapGetters([
  //   'evenOrOdd'
  // ]),
  // ...mapState([
  // //映射 this.count 为 store.state.count
  //   'count'
  // ])
  // },
  // 你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
  // methods: mapActions([
  //   'increment',
  //   'decrement',
  //   'incrementIfOdd',
  //   'incrementAsync'
  // ])
  // 生命周期钩子 created mounted updated destroyed
  // 创建时调用api获取数据
  // created () {
  //   this.$store.dispatch('products/getAllProducts')
  // }
  // 不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。
  // 因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到位置
  // 经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
