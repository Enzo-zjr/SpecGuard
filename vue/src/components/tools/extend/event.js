/**
 * @version 1.0.1
 * @author wuwg
 * @createTime  20190815
 * @updateTime  20190815
 * @decription  绑定|取消事件函数
 */
export default {

    /**
     * @function
     * @name  on
     * @version 1.0.1
     * @author wuwg  <wuwg@thunisoft.com>
     * @memberof  FdGlobal
     * @description  为元素或对象绑定事件
     * @time 2019-08-15
     * @param {object} element 需要解除事件的对象或者元素
     * @param {string}  event  需要解除的事件名
     * @param {function} handler  解除事件的回调函数
     * @param {boolean} capture  是否采用捕获，默认为false
     * @return {undefined} 无返回值
     * @example  FdGlobal.on(window, 'resize', function(){})
     */
    on: (() => {
        // 如果是非ie
        if (document.addEventListener) {
            return (element, event, handler, capture) => {
                if (element && event && handler) {
                    element.addEventListener(event, handler, Object.prototype.toString.call(capture) === '[object Boolean]' ? capture : false);
                }
            };
        }
        // 如果是ie
        return (element, event, handler) => {
            if (element && event && handler) {
                element.attachEvent(`on${event}`, handler);
            }
        };
    })(),

    /**
     *
     * @function
     * @name  FdGlobal.off
     * @version 1.0.1
     * @author wuwg  <wuwg@thunisoft.com>
     * @alias   FdGlobal.off
     * @description      解除为元素或对象的事件
     * @param {object} element    需要解除事件的对象或者元素
     * @param {string}  event  需要解除的事件名
     * @param {function} handler  解除事件的回调函数
     * @param {boolean} capture  是否采用捕获，默认为false
     * @return {undefined} 无返回值
     * @example  FdGlobal.off(window, 'resize', function(){})
     */
    off: (() => {
        // 如果是非ie
        if (document.removeEventListener) {
            return (element, event, handler, capture) => {
                if (element && event) {
                    element.removeEventListener(event, handler, Object.prototype.toString.call(capture) === '[object Boolean]' ? capture : false);
                }
            };
        }
        // 如果是ie
        return (element, event, handler) => {
            if (element && event) {
                element.detachEvent(`on${event}`, handler);
            }
        };
    })()
};
