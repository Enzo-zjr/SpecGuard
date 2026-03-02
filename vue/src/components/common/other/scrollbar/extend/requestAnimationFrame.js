/**
 * @file  requestAnimationFrame.js
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @description  requestAnimationFrame 兼容性方法， 兼容所有浏览器， requestAnimationFrame属于window对象，只需要引入文件即可
 * @createTime  2019-09-09
 * @copyright thunisoft fd
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 * @updateTime  2019-09-09
 */
(function () {
    let lastTime = 0;
    const NUM_16 = 16;
    // 渲染内核
    const vendors = ['webkit', 'moz', 'ms', 'o'];
    const vendorsLen = vendors.length;
    for (let i = 0; i < vendorsLen && !window.requestAnimationFrame; i++) {
        window.requestAnimationFrame = window[`${vendors[i]}RequestAnimationFrame`];
        window.cancelAnimationFrame = window[`${vendors[i]}CancelAnimationFrame`] || window[`${vendors[i]}CancelRequestAnimationFrame`];
    }
    // 如果还不存在 requestAnimationFrame 就用setTimeout 替代
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            // 当前时间
            const currentTime = new Date().getTime();
            // 时间差
            const timeDifference = Math.max(0, NUM_16 - (currentTime - lastTime));
            // setTimeout 的实现方式
            const id = window.setTimeout(() => {
                callback();
            }, timeDifference);
            lastTime = currentTime + timeDifference;
            return id;
        };
    }
    // 取消定时器的方法
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();
