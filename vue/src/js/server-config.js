/**
 *@file config.js
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/10/17 - 20:37
 *@updateTime 2019/10/17 - 20:37
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 * @description    server-config.js.js ,所有服务器的url配置
 */
const dirServicePath = window.serverConfig.dirServicePath;
// 服务数据
const serverUrl = {
    // 测试模块
    test:{
        // 测试模块首页数据
        index: `${dirServicePath}/rest/index`,
        uploadFile: `${dirServicePath}/api/v1/demo/upload`
    }

};
export default serverUrl;
