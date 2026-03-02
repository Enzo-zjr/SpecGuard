/**
 * #info
 *
 *@author   wuwg
 * @version 2018.01.01
 * @createTime  2018-09-06
 * @updateTime  2018-11-13
 * @description  module  fdMessage  消息
 * @updateTime  2019-1-12 wuwg
 * 1.删除多余引用
 * 2.增加消息处理 openPdf （用于庭审对接）
 */

window.onmessage = function (event) {
    if (event.data) {
        let _data = {};
        try {
            _data = Object.prototype.toString.call(event.data) === '[object String]' ? JSON.parse(event.data) : {};
        } catch (e) {
            _data = {cmd: 'error'};
            window.console.info('%c传入data不是对象形式？请马上修改', 'color:red;font-size:16px;');
            window.console.log(event.data);
        }
        switch (_data.cmd) {
            case 'loading-start':
                window.console.log('ajax-start');
                break;
            case 'loading-finish':
                window.console.log('ajax-finish');
                break;
            default :
                break;
        }
    }
};
