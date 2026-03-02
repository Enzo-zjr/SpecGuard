/**
 * version:                2015.01.01
 * creatTime:             2015.11.11
 * updateTime:            2020.11.03
 * author:                wuwg
 * name:                setHtmlFontSize
 */
// 事件对象
import eventObject from './event.js';

/**
 *
 * @param {object} options  需要配置的参数
 * @param {Number} options.minWidth  页面最小宽度
 * @param {Number} options.minHeight  页面最小高度
 * @param {Number} options.fontSize  页面参照的换算单位（视觉图的字体大小按照这个进行换算成rem）
 * @param {Number} options.visualWidth  视觉图的宽
 * @param {Number} options.visualHeight  视觉图的高
 * @constructor
 * @description 构造函数
 * @returns  {void} 无返回值
 */
function SetHtmlSize(options) {
    // html 元素
    this.htmlElement = document.querySelector('html');
    // 初始化参数
    this.init(options);
}

// 构造函数的原型
SetHtmlSize.prototype = {
    // 合并参数
    mergeOptions: function (options) {
        this.author = 'wuwg';
        this.updateTime = '20201103';
        //  默认参数
        const defaultOptions = {
            //  最小宽
            minWidth: 1440,
            //  最小高
            minHeight: 800,
            //  页面参照的换算单位（视觉图的字体大小按照这个进行换算成rem）
            fontSize: 36,
            // 视觉图的宽
            visualWidth: 1920,
            // 视觉图的高
            visualHeight: 980
        };
        // 判断是否是对象
        if (Object.prototype.toString.call(options, null) === '[object Object]') {
            // 合并参数
            for (const _name in options) {
                defaultOptions[_name] = options[_name];
            }
        }
        // 重新赋值
        this.options = defaultOptions;
    },
    // 设置字体大小
    setHtmlSize: function () {
        // 字体大小
        let htmlSize = 18;
        //  client  width
        let clientWidth = Math.max(window.innerWidth, this.options.minWidth);
        //  client  height
        let clientHeight = Math.max(window.innerHeight, this.options.minHeight);
        try {
            //  client  width
            clientWidth = Math.max(window.top.innerWidth, this.options.minWidth);
            //  client  height
            clientHeight = Math.max(window.top.innerHeight, this.options.minHeight);
        } catch (e) {
            window.console.error('跨域了,动态设置html字体大小，可能不精准，请自己注意！');
        }
        // 最终的字体大小
        htmlSize = Math.min(clientWidth * this.options.fontSize / this.options.visualWidth, clientHeight * this.options.fontSize / this.options.visualHeight);
        // 设置html 字体大小
        this.htmlElement.style.fontSize = `${htmlSize}px`;
    },
    // 重置函数
    resizeHandle: function () {
        // 清除定时器
        if (this.timer) {
            clearTimeout(this.timer);
        }
        // 设置定时器
        this.timer = setTimeout(() => {
            // 设置大小
            setHtmlObject.setHtmlSize();
        }, 50);  // eslint-disable-line
    },
    //  绑定事件
    bindEvent: function () {
        // 解除事件绑定
        this.unbindEvent();
        // 绑定事件
        eventObject.on(window, 'resize', this.resizeHandle);
    },
    //  解除绑定
    unbindEvent: function () {
        // 绑定事件
        eventObject.off(window, 'resize', this.resizeHandle);
    },
    // 初始化函数
    init: function (options) {
        // 合并参数
        this.mergeOptions(options);
        // 首次调用方法
        this.setHtmlSize();
        // 绑定事件
        this.bindEvent();
    }
};
//  设置html  size 的对象
let setHtmlObject = null;
// 导出模块
export default (options) => {
    // 判断是否存在
    if (!setHtmlObject) {
        setHtmlObject = new SetHtmlSize(options);
    } else {
        // 重新初始化
        setHtmlObject.init(options);
    }
    // 返回对象
    return setHtmlObject;
};


// set  html  size
/* (function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('setHtmlFontSize', [], factory);
    } else if (typeof define === 'function' && define.cmd) {
        define(function (require, exports, module) {
            module.exports = factory();
        });
    } else {
        window.setHtmlFontSize = factory();
    }
})(function () {
    return function (options) {
        // 判断是否存在
        if (!setHtmlObject) {
            setHtmlObject = new SetHtmlSize(options);
        } else {
            // 重新初始化
            setHtmlObject.init(options);
        }
        // 返回对象
        return setHtmlObject;
    };
});*/
