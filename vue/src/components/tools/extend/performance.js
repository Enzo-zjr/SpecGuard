/**
 * @file  performance.js
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @description  performance 属于FdLobal对象。fdGlobal.performance. 执行时间
 * @createTime  2019-08-13
 * @copyright thunisoft fd
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 * @updateTime  2019-08-13
 * @update  1.将css集成到此文件，另外将方法进行模块化封装 2019-06-04
 */

/**
 * @namespace performance
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @description  performance 属于FdLobal对象。fdGlobal.performance. 执行时间
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
        fdPerformance = factory();
    }
})(function () {*/
/* eslint-enable */
const fdPerformance = {

    /**
         *
         * @function
         * @name start
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof performance
         * @description   开启【时间消耗工具】
         * @param  {date} time 开始时间
         * @return {undefined} 无返回值
         * @example  performance.start()
         */
    start(time) {
        this.create(true, time);
    },

    /**
         *
         * @function
         * @name  stop
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof performance
         * @description   终止【时间消耗工具】
         * @return {undefined} 无返回值
         * @example  performance.stop()
         */
    stop() {
        this._recodeTime = false;
        // 移除元素
        this._body.removeChild(this._recodeTimePanel);
        // 清除事件
        this._button.onclick = null;
        // 清空引用
        this._button = null;
        this._body = null;
        this._recodeTimePanel = null;
    },

    /**
         *
         * @function
         * @name create
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof performance
         * @description   创建记录【时间消耗的面板】
         * @param  {boolean} flag flag为true代表创建时间记录面板，为false不创建时间记录面板
         * @param  {date} time 开始时间
         * @return {undefined} 无返回值
         * @example  performance.create()
         */
    create(flag = false, time) {
        // 如果存在，那么就先移除
        if (this._recodeTimePanel) {
            this.stop();
        }
        // 是否记录时间
        this._recodeTime = flag;
        if (this._recodeTime) {
            this._body = document.querySelector('body');
            // 创建面板
            this._recodeTimePanel = document.createElement('div');
            this._recodeTimePanel.setAttribute('class', 'fd-record-panel');
            const _style = [
                'position: fixed',
                'bottom: 10px',
                'right: 10px',
                'z-index: 99',
                'padding: 10px',
                'width: 500px',
                'height: 600px',
                'overflow: auto',
                'border-radius: 5px',
                'box-shadow: 0 0 5px rgba(0,0,0,0.5)',
                'background-color: #fff'
            ];
                // 添加样式
            this._recodeTimePanel.setAttribute('style', _style.join(';'));
            this._button = document.createElement('button');
            // 添加样式
            this._button.setAttribute('style', 'cursor:pointer;width:60px;height:30px;');
            this._button.innerText = '清空';
            this._button.onclick = () => {
                this.performancePanel.innerHTML = '';
            };
            this.performancePanel = document.createElement('div');
            // 添加样式
            this.performancePanel.setAttribute('style', 'color: #999;font:14px/24px "Microsoft YaHei";');
            this._recodeTimePanel.appendChild(this._button);
            this._recodeTimePanel.appendChild(this.performancePanel);
            this._body.appendChild(this._recodeTimePanel);
            // 开始时间
            this.setStartTime(time || new Date().getTime());
        }
        this.stop();
    },

    /**
         *
         * @function
         * @name  setStartTime
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof performance
         * @description   重新设置【时间消耗工具】的开始时间
         * @param  {Date.getTime} startTime 开始时间，必须为毫秒数
         * @return {undefined} 无返回值
         * @example  performance.setStartTime(new Date().getTime())
         */
    setStartTime(startTime) {
        this.startTime = startTime;
    },

    /**
         *
         * @function
         * @name  getCurrentTime
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof performance
         * @description   获取当前时间，毫秒时间
         * @return {Date} 返回当前时间
         * @example  performance.getCurrentTime()
         */
    getCurrentTime() {
        return new Date().getTime();
    },

    /**
         *
         * @function
         * @name  execute
         * @version 1.0.1
         * @author wuwg  <wuwg@thunisoft.com>
         * @memberof performance
         * @description   记录代码运行到这里，消耗的时间日志
         * @param {string} methodName 方法名
         * @param {Date} startTime 可选参数，传递了第二个参数，说明是【测试方法】耗时，不传，那么是记录页面运行到这里的整体耗时。
         * @return {undefined} 无返回值
         * @example
         * // 1.不带第二个参数
         * performance.execute('页面加载到此处消耗的时间')
         * // 2.带第二个参数
         * performance.execute('页面加载到此处消耗的时间', startTime)
         */
    execute(methodName = '页面加载到此处消耗的时间：', startTime) {
        if (this._recodeTime) {
            // 传递了第二个参数，说明是【测试方法】耗时
            const _isTestMethod = Boolean(startTime);
            let _color = 'green';
            const _startTime = _isTestMethod ? startTime : this.startTime;
            const _endTime = new Date().getTime();
            const _expenseTime = _endTime - _startTime;
            const _maxExpenseTime = 100;
            const _item = document.createElement('div');
            // 如果是【测试方法】耗时
            if (_isTestMethod) {
                if (_expenseTime > _maxExpenseTime) {
                    _color = 'red';
                }
                _item.setAttribute('style', `color:${_color}`);
            }
            _item.innerHTML = `${methodName}${_expenseTime}ms`;
            this.performancePanel.appendChild(_item);
        }
    }
};
// });
// 如果是非模块化的，请注释下面的这行代码
// 2019-06-04 todo
export default fdPerformance;
