/**
 *@file stopEvent
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/9/7 - 21:16
 *@updateTime 2019/9/7 - 21:16
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description stopEvent 的描述
 */
/**
 *
 * @function
 * @name stopEvent
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @memberOf   FdGlobal
 * @description  阻止默认事件
 * @param {object} event  当前的event对象
 * @return {undefined} 无返回值
 * @example  FdGlobal.stopEvent(event)
 */
export default (event) => {
    const _event = event || window.event;
    if (_event.preventDefault) {
        _event.preventDefault();
    } else {
        _event.returnValue = false;
    }
};
