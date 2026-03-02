/**
 *@file request
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/12/09 - 11:03
 *@updateTime 2019/12/09 - 11:03
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description  阅卷目录request （请求）相关
 @namespace  request   请求相关，后面加模块名
 名字解释：
 _name ： 用 【模块名】 => 【子模块名】
 _method ： 请求的方法
 _showLog：  是否显示日志
 _url : 请求的url
 _data : 请求所需要的数据， 需要的参数名，全部在这里写好， 可以通过传参给对象赋值！
 _serverData : 服务器返回的数据

 请求：
 1. fd工程结构中自带此全局方法
 window.fdGlobal.ajax
 2.可以单独使用
 axios

 请求必须输出日志：
 1. 请求日志
 window.fdGlobal.consoleLogRequest(_showLog, _name, _method, _url, _data);
 2. 响应日志
 window.fdGlobal.consoleLogResponse(_showLog, _name, _serverData);

 ！important
 请求函数返回一个promise,
 为了性能需要，咱们需要内置性能日志！
 按照以下结构编写即可！
 以下是一个实际案例， 【请求模块】可以通过混入的方式，引入到组件的index.js 中

 request ：为命名空间
 TreeData：  为模块名
 showLog ： 在组件的 index.js  的data中写好，  如：{showLog: window.fdConfig.showLog}, 全局控制日志！


 */
export default {
    methods: {
        // 请求【模块test3】=> 【获取用户数据】
        requestUserData(queryData) {
            // 设置开始时间
            const _startTime = window.fdGlobal.performance.getCurrentTime();
            return new Promise((resolve, reject) => {
                const _showLog = this.showLog;
                const _name = '【模块test3】=> 【获取用户数据】';
                const _method = window.fdConfig.methodGet;
                const _url = this.serverUrl;
                const _data = {
                    module: 'test3',
                    query: queryData.query,
                    age: queryData.age
                };
                // 输出日志
                window.fdGlobal.consoleLogRequest(_showLog, _name, _method, _url, _data);
                //  返回shuju
                window.fdGlobal.ajax({
                    method: _method,
                    url: _url,
                    // URL参数
                    // 必须是一个纯对象或者 URL参数对象
                    params: _data,
                    // 默认值是json
                    responseType: 'json'
                }).then((data) => {
                    const _serverData = data.data;
                    window.fdGlobal.performance.execute(`${_name}ajax 结束时间，拿到数据的时间 :`, _startTime);
                    // 后端输出日志
                    window.fdGlobal.consoleLogResponse(_showLog, _name, _serverData);
                    resolve(_serverData);
                }, (data) => {
                    window.fdGlobal.performance.execute(`${_name}ajax 结束时间，拿到数据报错 :`, _startTime);
                    const _serverData = data.data;
                    // 后端输出日志
                    window.fdGlobal.consoleLogResponse(_showLog, _name, _serverData);
                    reject(data);
                });
            });
        }
    }
};
