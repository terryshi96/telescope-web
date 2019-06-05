<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <TopNav></TopNav> -->
    <router-view/>
  </div>
</template>

// common css 全局样式
<style lang="scss">
.anticon-close-circle {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}
.anticon-close-circle:hover {
  color: red;
}
.anticon-close-circle:active {
  color: #666;
}
.content {
  padding: 24px;
  background: #fff;
}
</style>
