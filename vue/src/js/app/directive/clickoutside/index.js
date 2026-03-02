/**
 *@file index
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/10/18 - 11:33
 *@updateTime 2019/10/18 - 11:33
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description clickoutside 的描述
 */

export default {
    // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    bind(el, binding) {
        //
        /**
         * 会执行binding.value() 函数，并且把 event对象传出去
         * @param {object} e  event对象
         * @returns {boolean} 布尔值
         */
        function documentHandler(e) {
            // IE有许多好用的方法，后来都被其他浏览器抄袭了，比如这个contains方法。
            // 如果A元素包含B元素，则返回true，否则false。
            // 唯一不支持这个方法的是IE的死对头firefox。
            // https://www.cnblogs.com/rubylouvre/archive/2009/10/14/1583523.html
            // 支持compareDocumentPosition()
            // 如果在 firefox中报错了，再来做兼容,以下是兼容方法。 2018-03-28 wuwg
            /**
             * if(!!window.find){
                    HTMLElement.prototype.contains = function(B){
                     return this.compareDocumentPosition(B) - 19 > 0
                    }
                 }
             //PPK给出如下解决方法。
             if (window.Node && Node.prototype && !Node.prototype.contains){
                   Node.prototype.contains = function (arg) {
                     return !!(this.compareDocumentPosition(arg) & 16)
                   }
                }
             */

            //  如果包含直接返回
            if (el.contains(e.target)) {
                return false;
            }
            // 执行方法
            if (binding.expression) {
                binding.value(e);
            }
        }
        // 将documentHandler函数，赋值给el 对象
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {
        // update 组件
    },
    // 只调用一次，指令与元素解绑时调用。
    unbind(el) {
        // 接触事件绑定
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
};
