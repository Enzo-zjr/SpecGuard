export default{
    methods:{
        upload(targetUrl, requestBody, httpMethod){
            const _startTime = window.fdGlobal.performance.getCurrentTime();
            return new Promise((resolve, reject) => {
                const _showLog = this.showLog;
                const _name = 'batch_search';
                const _method = httpMethod || window.fdConfig.methodPost;
                const _url = targetUrl;
                const _data = requestBody || {};
                // 输出日志
                window.fdGlobal.consoleLogRequest(_showLog, _name, _method, _url, _data);
                //  返回数据
                window.fdGlobal.ajax({
                    method: _method,
                    url: _url,
                    data: _data,
                    
                    // 默认值是json
                    responseType: 'json',
                    // 请求头
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    
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
        },   
    }
}