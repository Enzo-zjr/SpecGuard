/**
 * @file  log.js
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @description  log属于FdLobal对象。fdGlobal.log. 日志对象
 * @copyright thunisoft fd
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 */
// let fdLog;

/**
 * @namespace log
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @description  log属于FdLobal对象。fdGlobal.log. 日志对象
 * @copyright thunisoft fd
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 */
/* (function (factory) {
    /!* eslint-disable *!/
    if (typeof (define) === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('performance', [], factory)
    } else if (typeof(exports) === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory();
    } else {
        fdLog = factory();
    }
})(function () {*/
/* eslint-enable */
const fdLog = {

    /**
         *
         * @function
         * @name start
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof log
         * @description   开启【日志记录工具】
         * @return {undefined} 无返回值
         * @example  log.start()
         */
    start() {
        this.create(true);
    },

    /**
         *
         * @function
         * @name  stop
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof log
         * @description   终止【日志记录工具】
         * @return {undefined} 无返回值
         * @example  log.stop()
         */
    stop() {
        this._recodeLog = false;
        this.body.removeChild(this._logPanelWrap);
        this._logPanelWrap = null;
    },

    /**
         *
         * @function
         * @name create
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof log
         * @description   创建记录【日志的面板】
         * @param  {boolean} flag flag为true代表创建日志记录面板，为false不创建日志记录面板
         * @return {undefined} 无返回值
         * @example  log.create()
         */
    create(flag = false) {
        // 如果存在，那么就先移除
        if (this._logPanelWrap) {
            this.stop();
        }
        // 是否记录日志
        this._recodeLog = flag;
        if (this._recodeLog) {
            this._body = document.querySelector('body');
            // 创建面板
            this._logPanelWrap = document.createElement('div');
            const _style = [
                'position: fixed',
                'bottom: 10px',
                'left: 10px',
                'z-index: 99',
                'padding: 10px',
                'width: 500px',
                'height: 300px',
                'overflow: auto',
                'border-radius: 5px',
                'box-shadow: 0 0 5px rgba(0,0,0,0.5)',
                'background-color: #fff'
            ];
                // 添加样式
            this._logPanelWrap.setAttribute('style', _style.join(';'));
            const _button = document.createElement('button');
            // 添加样式
            _button.setAttribute('style', 'cursor:pointer;width:60px;height:30px;');
            _button.innerText = '清空';
            _button.onclick = () => {
                this._logPanel.innerHTML = '';
            };
            this._logPanel = document.createElement('div');
            // 添加样式
            this._logPanel.setAttribute('style', 'color: #333;font:14px/24px "Microsoft YaHei";');
            this._logPanelWrap.appendChild(_button);
            this._logPanelWrap.appendChild(this._logPanel);
            this.body.appendChild(this._logPanelWrap);
        }
    },

    /**
         *
         * @function
         * @name  setRecodeLog
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof log
         * @description  重新设置【日志记录工具】的记录状态
         * @param  {Boolean} recodeLogFlag 设置记录的状态， 为true， 开启日志记录， false， 终止日志记录
         * @return {undefined} 无返回值
         * @example  log.setRecodeLog(true)
         */
    setRecodeLog(recodeLogFlag) {
        this._recodeLog = recodeLogFlag;
    },


    /**
         *
         * @function
         * @name  execute
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof log
         * @description   生成日志的方法
         * @param {string} information 日志信息
         * @param {string=} [color=green]  可选参数，日志的颜色
         * @return {undefined} 无返回值
         * @example
         * // 1.不带第二个参数
         * // 单条日志
         * log.execute('日志记录')
         * // 多条日志
         * log.execute(['日志1','日志2'])
         * // 2.带第二个参数
         * log.execute('日志记录', 'red')
         */
    execute(information = '日志记录：', color = 'green') {
        let _information = information;
        if (this._recodeLog) {
            // 如果是非数组
            if (!Array.isArray(_information)) {
                _information = [_information];
            }
            _information.forEach((item) => {
                const _item = document.createElement('div');
                _item.innerHTML = `<p>【日志】：${item}</p>`;
                _item.setAttribute('style', `color:${color};`);
                this._logPanel.appendChild(_item);
            });
            // 换行
            const _itemBr = document.createElement('br');
            this._logPanel.appendChild(_itemBr);
        }
    }
};
// });
// 如果是模块化的，请注释下面的这行代码
// 2019-06-04 todo
export default fdLog;
