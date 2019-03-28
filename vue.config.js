
module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:3000' // 代理接口
      },
      '/oauth': {
        target: 'http://localhost:3000' // 代理接口
      }
    }
  }
}
