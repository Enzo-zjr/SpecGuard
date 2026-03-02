/**
 * @author  wuwg
 * @createTime  2019-08-01
 * @updateTime  2019-08-01
 * @description 反向代理配置
 * 目的： 很简单，两个字，跨域。
 * 'http://localhost:8080/api' ===> 'http://www.abc.com/api'
 * https://github.com/chimurai/http-proxy-middleware#options
 *
 * @update  
 * 1.2020-02-10:  将  export  default  修改为node模块 module.exports
 * 1.2020-12-07:  反向代理配置，增加如何修改cookie的配置示例
 */
module.exports = {
    '/api': {
        // 目标接口域名
        target: 'http://172.18.72.40:1234',
        // 如果是https接口，需要配置这个参数
        // secure: false,
        // proxy websockets
        // ws: true,
        // 是否跨域
        changeOrigin: true,
        // 重写接口
        // pathRewrite: function (path, request) { return path.replace('/api', '/base/api') }
        pathRewrite: {
            '^/api': '/'
        },
        // 重写路由
      /*  router: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            'dev.localhost:3000': 'http://localhost:8000'
        }*/
		// proxyTable支持onProxyRes回调函数来自定义响应，
		// 流程是通过替换后端服务器设置的 cookie-path 来进行处理，代码如下：
		//@example 
		// 使用场景：启动项目之后进行登录，此时API请求成功但是获取登录用户信息时发现cookie没有带过去。
		// 查看请求发现登录请求的 Set-Cookie 响应头中的 Path是 /admin2。
		// 但是咱们请求的路径是/admin，cookie当然不会生效。
		// 20201207
		/***	
		onProxyRes: function (proxyResponse, request, response) {
			// 先获取cookie
          const cookies = proxyResponse.headers['set-cookie']
		  
          if (cookies) {
			  // 获取新的cookie
            const newCookies = cookies.map(cookie => {
              return cookie.replace(/Path=\/admin2/, 'Path=/')
            })
			// 删除原来的cookie
            delete proxyResponse.headers['set-cookie']
			// 设置新的cookie
            proxyResponse.headers['set-cookie'] = newCookies
          }
		}
		*/
    },
    //   代理多个target地址,
    '/ips': {
        target: 'http://pv.sohu.com',
        changeOrigin: true,
        pathRewrite: {
            '^/ips': ''
        }
    }
}
