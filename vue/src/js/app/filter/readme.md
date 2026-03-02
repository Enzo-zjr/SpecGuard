# 全局过滤器

## fdFilter.js
该文件会引入所有全局指令，该文件被main.js引入


// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})