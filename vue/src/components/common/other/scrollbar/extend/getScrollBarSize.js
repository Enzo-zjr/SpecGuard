/**
 *@file getScrollsize
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/9/6 - 16:03
 *@updateTime 2019/9/6 - 16:03
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description getScrollsize 获取浏览器滚动条的大小
 */

// 滚动条宽
let barSize;

/**
 * @description 计算浏览器滚动条大小的内置方法
 * @return {boolean}  返回浏览器滚动条的大小
 */
function countScrollBarSize() {
    // 一、创建一个外部的div
    const element = document.createElement('div');
    const elementStyle = element.style;
    elementStyle.position = 'absolute';
    elementStyle.top = '-9999em';
    elementStyle.left = '-9999em';
    // 无事件响应
    elementStyle.pointerEvents = 'none';
    // 隐藏div
    elementStyle.visibility = 'hidden';
    // 设置宽高
    elementStyle.width = '200px';
    elementStyle.height = '200px';
    // 强制出现滚动条
    elementStyle.overflow = 'scroll';
    // 添加到页面
    document.body.appendChild(element);
    // 设置大小
    barSize = element.offsetWidth - element.clientWidth;
    // 移除元素
    document.body.removeChild(element);
}

/**
 * @function
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @alias FdGlobal.getScrollBarSize
 * @description  获取浏览器滚动条的大小
 * @param {boolean} fresh  是否强制重新获取滚动条的大小
 * @returns {number} 返回浏览器滚动条的大小
 * @example
    let  barSize = FdGlobal.getScrollBarSize()
    console.log(barSize)
 */
export default (fresh) => {
    if (fresh || typeof barSize === 'undefined') {
        // 计算滚动条的宽
        countScrollBarSize();
    }
    return barSize;
};
