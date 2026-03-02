/**
 *@file console
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/8/25 - 16:47
 *@updateTime 2019/8/25 - 16:47
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description console 日志模块。包含四个方法consoleLogRequest，consoleLogResponse， consoleLogError， consoleLog
 */
export default {

    /**
     * 注意不能加@name属性，否则显示jsdoc无法准确的生成文档
     * @function
     * @version 1.0.1
     * @author wuwg  <wuwg@thunisoft.com>
     * @alias FdGlobal.consoleLogRequest
     * @description  为了统一管理request(请求)日志
     * @time 2018-08-25
     * @param {boolean} showLog 是否输出日志
     * @param {string} name  模块名称
     * @param {string} method  请求方式  post,get，delete，.etc,
     * @param {string} url 请求的url
     * @param {object} requestData 请求的数据
     * @returns {undefined} 无返回值
     */
    consoleLogRequest(showLog, name, method, url, requestData) {
        if (showLog) {
            window.console.log(`[[模块名称]]==>${name}`);
            window.console.log('[[前台]]==>请求方式是');
            window.console.log(method);
            window.console.log('[[前台]]==>请求的url是');
            window.console.log(url);
            window.console.log('[[前台]]==>请求的数据是');
            window.console.log(requestData);
            window.console.log('\n');
        }
    },

    /**
     * 注意不能加@name属性，否则显示jsdoc无法准确的生成文档
     * @function
     * @version 1.0.1
     * @author wuwg  <wuwg@thunisoft.com>
     * @alias FdGlobal.consoleLogResponse
     * @description  为了统一管理response(响应)日志，
     * @time   2018-08-25
     * @param {boolean} showLog 是否输出日志
     * @param {string} name 模块名称
     * @param {object} responseData  后台返回的数据
     * @returns {undefined} 无返回值
     */
    consoleLogResponse(showLog, name, responseData) {
        if (showLog) {
            window.console.log(`%c【模块名称】==>${name}`, 'color:#00cc66');
            window.console.log('%c【后台】==>返回的数据是', 'color:#00cc66');
            window.console.dir(responseData);
            window.console.log('\n');
            window.console.log('\n');
        }
    },

    /**
     * 注意不能加@name属性，否则显示jsdoc无法准确的生成文档
     * @function
     * @version 1.0.1
     * @author wuwg  <wuwg@thunisoft.com>
     * @alias FdGlobal.requestError
     * @description  为了统一管理error(错误)日志，
     * @time   2018-08-25
     * @param {object} name  模块名称
     * @param {object} data  报错的数据对象
     * @param  {number} textStatus 错误的状态码
     * @param  {object} errorThrown 全量的异常
     * @returns {undefined} 无返回值
     */
    consoleLogError(name, data, textStatus, errorThrown) {
        // 2018-03-21 ，ie会直接弹窗报错，所用 try{}catch(e){}
        try {
            window.console.log(`[[模块名称]]==>${name}`);
            window.console.error('请求数据发生了错误，错误数据为：');
            window.console.error(data);
            if (textStatus) {
                window.console.error(textStatus);
            }
            if (errorThrown) {
                window.console.error(errorThrown);
            }
        } catch (e) {
            // console.log(e)
        }
    },

    /**
     * 注意不能加@name属性，否则显示jsdoc无法准确的生成文档
     * @function
     * @version 1.0.1
     * @author wuwg  <wuwg@thunisoft.com>
     * @alias FdGlobal.consoleLog
     * @description  为了统一管理log日志，
     * @time 2018-03-21
     * @param {boolean} showLog   是否输出日志
     * @param {*}  logInfo  要输出的日志信息,任意数据类型皆可
     *  @returns {undefined} 无返回值
     */
    consoleLog(showLog, logInfo) {
        if (showLog) {
            window.console.log(logInfo);
        }
    }
};
