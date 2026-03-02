/**
 * @file  browser.js
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @description  log属于FdLobal对象。fdGlobal.browser. 浏览器对象
 * @copyright thunisoft fd
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 */

/**
 * @namespace browser
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @description  一个判断浏览器的对象
 * @copyright thunisoft fd
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 */
/* let fdBrowser;
(function (factory) {
    /!* eslint-disable *!/
    if (typeof (define) === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('performance', [], factory)
    } else if (typeof(exports) === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory();
    } else {
        fdBrowser = factory();
    }
})(function () {*/
const agent = navigator.userAgent.toLowerCase();
const opera = window.opera;
// 常量
const NUM_2 = 2;
const NUM_6 = 6;
const NUM_7 = 7;
const NUM_8 = 8;
const NUM_9 = 9;
const NUM_9_5 = 9.5;
const NUM_10 = 10;
const NUM_11 = 11;
const NUM_100 = 100;
const NUM_522 = 522;
const NUM_10000 = 10000;
const NUM_10801 = 10801;
// 对象
const browser = {

    /**
     * @memberof browser
     * @description  检测当前浏览器是否为移动端
     * @return  {boolean} 返回一个boolean值
     * @example
     * if (browser.isMobile()) {
         *     console.log('当前浏览器是isMobile');
         * }
     */
    isMobile:() => {
        const isIphone = agent.indexOf('iphone') !== -1;
        const isAndroid = agent.indexOf('android') !== -1;
        const isIPad = agent.indexOf('ipad') !== -1;
        const isIPod = agent.indexOf('ipod') !== -1;
        const isIEMobile = agent.indexOf('iemobile') !== -1;
        const isWebOS = agent.indexOf('webos') !== -1;
        const isBlackBerry = agent.indexOf('blackberry') !== -1;
        const isOperaMini = agent.indexOf('opera mini') !== -1;
        return (isIphone || isAndroid || isIPad || isIPod || isIEMobile || isWebOS || isBlackBerry || isOperaMini);
    },

    /**
         * @function
         * @name isIe
         * @memberof browser
         * @description  检测当前浏览器是否为IE
         * @param {Number} [version]  可选参数，如果传了，判断当前浏览器的ie什么版本，否则只判断当前浏览器是否属于ie
         * @return  {boolean} 返回一个boolean值
         * @property {boolean} ie 检测当前浏览器是否为IE
         * @example
         * if (browser.isIe()) {
         *   console.log('当前浏览器是IE');
         * }
         */
    isIe: (version) => {
        if (typeof version === 'number') {
            // 是ie浏览器，并且版本号相等
            return browser.isIe() && browser.getVersion() === version;
        }
        return (/(msie\s|trident.*rv:)([\w.]+)/).test(agent);
    },

    /**
         * @memberof browser
         * @description  检测当前浏览器是否为Opera
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isOpera()) {
         *     console.log('当前浏览器是Opera');
         * }
         */
    isOpera: () => (Boolean(opera) && opera.version),

    /**
         * @memberof browser
         * @description  检测当前浏览器是否为chrome
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isChrome()) {
         *     console.log('当前浏览器是chrome');
         * }
         */
    isChrome: () => (/chrome\/(\d+\.\d)/i).test(agent),

    /**
         * @memberof browser
         * @description  检测当前浏览器是否为Safari
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isSafari()) {
         *     console.log('当前浏览器是Safari');
         * }
         */
    isSafari: () => (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i).test(agent) && !(/chrome/i).test(agent),

    /**
         * @memberof browser
         * @description  检测当前浏览器是否是webkit内核的浏览器
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isWebkit()) {
         *     console.log('当前浏览器是webkit内核浏览器');
         * }
         */
    isWebkit: () => (agent.indexOf('applewebkit/') > -1),

    /**
         * @memberof browser
         * @description 检测当前浏览器是否是运行在mac平台下
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isMac()) {
         *     console.log('当前浏览器运行在mac平台下');
         * }
         */
    isMac: () => (agent.indexOf('macintosh') > -1),

    /**
         * @memberof browser
         * @description  检测当前浏览器是否处于quirks(“怪异模式”)下
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isQuirks()) {
         *    console.log('当前浏览器运行处于“怪异模式”');
         * }
         */
    isQuirks: () => (document.compatMode === 'BackCompat'),

    /**
         * @memberof browser
         * @description  检测当前浏览器内核是否是gecko内核
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isGecko()) {
        *     console.log('当前浏览器内核是gecko内核');
        * }
         */
    isGecko: () => (navigator.product === 'Gecko' && !browser.isWebkit() && !browser.isOpera() && !browser.isIe()),

    /**
         * @memberof browser
         * @description  获取当前浏览器的版本号
         *  <ul>
         *     <li>IE系列返回值为5,6,7,8,9,10等</li>
         *     <li>gecko系列会返回10900，158900等, </li>
         *     <li>webkit系列会返回其build号 (如 522等)</li>
         * </ul>
         * @return  {String} 返回当前浏览器的版本号
         * @example
         *     console.log('当前浏览器版本号是' + browser.getVersion());
         */
    getVersion: () => {
        let version = 0;
        // 【ie】Internet Explorer 6.0+
        if (browser.isIe()) {
            const v1 = agent.match(/(?:msie\s([\w.]+))/);
            const v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
            if (v1 && v2 && v1[1] && v2[1]) {
                version = Math.max(Number(v1[1]), Number(v2[1]));
            } else if (v1 && v1[1]) {
                version = Number(v1[1]);
            } else if (v2 && v2[1]) {
                version = Number(v2[1]);
            } else {
                version = 0;
            }
        }
        // WebKit 522+ (Safari 3+)
        if (browser.isWebkit()) {
            version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);
        }
        // 【Gecko】
        if (browser.isGecko()) {
            let geckoRelease = agent.match(/rv:([\d.]+)/);
            if (geckoRelease) {
                geckoRelease = geckoRelease[1].split('.');
                version = geckoRelease[0] * NUM_10000 + (Number(geckoRelease[1]) || 0) * NUM_100 + (Number(geckoRelease[NUM_2]) || 0);
            }
        }
        // 【chrome】 检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号
        if ((/chrome\/(\d+\.\d)/i).test(agent)) {
            // 八进制表示法中 X24 表示 $ 类似x23表示 #
            // 故+ RegExp['\x241'] 等同RegExp.$1`,用来捕获第一组括号内匹配的数据。
            version = Number(RegExp['\x241']);
        }
        // 【safari】 检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号
        if ((/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i).test(agent) && !(/chrome/i).test(agent)) {
            version = Number(RegExp['\x241'] || RegExp['\x242']);
        }

        // 【Opera】 9.50+
        if (browser.isOpera()) {
            version = parseFloat(opera.version());
        }

        return version;
    },

    /**
         * @memberof browser
         * @description   检测浏览器模式是否为 IE 兼容模式
         * @param {Number} [version]  可选参数，如果传了，判断当前ie浏览器是什么版本兼容模式，否则只判断当前浏览器是否属于IE 兼容模式
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isIeCompat()) {
        *     console.log('当前浏览器是IE兼容模式');
        * }
         *   if (browser.isIeCompat(11)) {
        *     console.log('当前浏览器是IE 11 兼容模式');
        * }
         */
    isIeCompat: function (version) {
        // 检测浏览器模式是否为 IE11 兼容模式
        const isIe11Compat = browser.isIe() && document.documentMode === NUM_11;
        //  检测浏览器模式是否为 IE10 兼容模式
        const isIe10Compat = browser.isIe() && document.documentMode === NUM_10;
        //  检测浏览器模式是否为 IE9 兼容模式
        const isIe9Compat = browser.isIe() && document.documentMode === NUM_9;
        // 检测浏览器模式是否为 IE8兼容模式
        const isIe8Compat = browser.isIe() && document.documentMode === NUM_8;
        // 检测浏览器模式是否为 IE7兼容模式
        const isIe7Compat = browser.isIe() && ((browser.getVersion() === NUM_7 && !document.documentMode) || document.documentMode === NUM_7);
        // 检测浏览器模式是否为 IE6兼容模式
        const isIe6Compat = browser.isIe() && (browser.getVersion() < NUM_7 || browser.isQuirks());
        // 结论
        let _flag = false;
        switch (version) {
            case NUM_11 :
                _flag = isIe11Compat;
                break;
            case NUM_10 :
                _flag = isIe10Compat;
                break;
            case NUM_9 :
                _flag = isIe9Compat;
                break;
            case NUM_8 :
                _flag = isIe8Compat;
                break;
            case NUM_7 :
                _flag = isIe7Compat;
                break;
            case NUM_6 :
                _flag = isIe6Compat;
                break;
            default :
                _flag = (isIe11Compat || isIe10Compat || isIe9Compat || isIe8Compat || isIe7Compat || isIe6Compat);
                break;
        }
        return _flag;
    },

    /**
         * @memberof browser
         * @description   检测当前浏览器是否能够与UEditor良好兼容
         * @return  {boolean} 返回一个boolean值
         * @example
         * if (browser.isCompatible()) {
         *     console.log('浏览器与UEditor能够良好兼容');
         * }
         */
    isCompatible: () => (!browser.mobile && ((browser.isIe() && browser.getVersion() >= NUM_6) ||
        (browser.isGecko() && browser.getVersion() >= NUM_10801) ||
        (browser.isOpera() && browser.getVersion() >= NUM_9_5) ||
        (browser.isWebkit() && browser.getVersion() >= NUM_522) || false))
};

/*    return browser;
});*/

export default browser;

