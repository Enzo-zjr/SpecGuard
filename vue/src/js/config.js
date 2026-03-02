/**
 *@file config.js
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/10/17 - 20:37
 *@updateTime 2019/10/17 - 20:37
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 *@description    config.js ,所有的配置文件
 *                      详细说明看注释  !important
 */
// 服务器配置
import serverUrl from './server-config.js';
// let production = process.env.NODE_ENV !== 'production'
// 默认开发环境
const develop = true;
//
const config = {
    //  是否是调试模式，true 为json数据，false 为服务器数据
    isDebug: develop,
    // ajax查询方式   GET
    methodGet: 'GET',
    // ajax查询方式  POST
    methodPost: develop ? 'GET' : 'POST',
    // ajax查询方式  PUT
    methodPut: develop ? 'GET' : 'PUT',
    // ajax查询方式  DELETEsocketio
    methodDelete: develop ? 'GET' : 'DELETE',
    // ajax查询方式  PATCH
    methodPatch: develop ? 'GET' : 'PATCH',
    //  url链接,也就是数据的地址
    url: {},
    // 是否显示日志
    showLog: true,
    // 服务器地址
    dirServicePath: window.serverConfig.dirServicePath
};
// 本地数据
const localUrl = {
    // 测试模块
    test:{
        // 测试模块首页数据
        index:  '/static/json/test/index.json'
    }
};
config.url = config.isDebug ? localUrl : serverUrl;
//  注册全局变量，fdConfig
window.fdConfig = config;
