/**
 *@author   wuwg
 *@createTime   2018/03/20
 *@updateTime   2019/09/09
 *@description  horizontal-scrollbar  component
 */
import config from '../extend/component-config.js';
import eventObject from '../extend/event.js';
// 事件方法
const {
    on, off
} = eventObject;
// prefix
const prefixCls = `${config.classPrefix}scroll-track-h`;
const scrollbarCls = `${config.classPrefix}scroll-bar`;
const NUM_2 = 2;
const NUM_16 = 16;
// module
const module = {
    name: `${config.componentCcPrefix}horizontal-scrollbar`,
    props: {
        // 当前滚动区域的scrollWidth值
        cscrollAreaWidth: {
            type: Number,
            default: 0
        },
        // 当前滚动区域的clientWidth值
        cscrollWrapperWidth: {
            type: Number,
            default: 0
        },
        // 当前滚动区域的scrollLeft滚动值
        cscrollLeft: {
            type: Number,
            default: 0
        },

        // 动画的缓动时间，单位毫秒, 如调用update()方法，点击滚动条得滑倒，滚动条滚动，耗时都是用得这个数值
        tweenTime: {
            type: Number,
            default: 200
        },
        //  滚动条最小的尺寸，为了提升用户体验
        scrollbarMinSize: {
            type: Number,
            default: 30
        },
        //  拖拽滚动条时，扩展滚动条大小 ,此处通过css控制 ， 外围容器增加 pressed 类名
        pressExtendScrollbarSize: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // horizontal-scrollbar组件可视的宽度
            clientWidth: 1,
            // 是否正在拖拽
            dragging: false,
            // 开始拖动的坐标点 pageX
            startX: 0,
            // 结束拖动的坐标点 pageX
            endX: 0,
            // 滚动条的位置
            scrollBarPostion: 0,
            // 当前滚动区域的scrollWidth值
            scrollAreaWidth: 1,
            // 当前滚动区域的 clientWidth 值
            scrollWrapperWidth: 0
        };
    },
    computed: {
        // 有效的模拟滚动条滚动值
        validScrollDistance() {
            return this.clientWidth - this.scrollbarWidth;
        },
        // 有效的真实滚动条滚动值
        validRealScrollDistance() {
            return this.scrollAreaWidth - this.scrollWrapperWidth;
        },
        // 滚动条的宽
        scrollbarWidth() {
            return Math.max(this.scrollbarMinSize, this.scrollWrapperWidth / this.scrollAreaWidth * this.clientWidth);
        },
        // 滚动条位置的样式
        style() {
            return {
                // 滚动条的宽
                width: `${this.scrollbarWidth}px`,
                //  滚动条的left值（滚动条是绝对定位的）
                left: `${this.scrollBarPostion}px`
            };
        },
        // 滚动条外围class
        wrapClasses() {
            return [
                prefixCls,
                // 拖拽时的类名
                this.dragging && this.pressExtendScrollbarSize ? 'pressed' : ''
            ];
        },
        // 滚动条样式class
        scrollbarClass() {
            return [
                scrollbarCls,
                this.dragging ? 'pressed' : ''
            ];
        }
    },
    mounted() {
        // 初始化函数
        this.init();
    },
    beforeDestroy() {
        // 解除事件绑定
        this.unbindEvent();
        //  解除resize监听
        off(window, 'resize', this.initParams);
        // 先取消动画
        cancelAnimationFrame(this.requestAnimationFrameTimerPosition);
        // 先取消动画定时器
        cancelAnimationFrame(this.requestAnimationFrameTimer);
    },
    methods: {

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 初始化函数
         * @returns {undefined}  无返回值
         */
        init() {
            // 初始化参数
            this.initParams();
            // 默认设置一次滚动条配置
            this.setScrollPostion(this.cscrollAreaWidth, this.cscrollWrapperWidth, this.cscrollLeft);
            //  监听resize事件
            on(window, 'resize', this.initParams);
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 初始化参数
         * @returns {undefined}  无返回值
         */
        initParams() {
            // 纵向滚动条外围的高
            this.clientWidth = this.$el.clientWidth;
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 设置拖拽状态
         * @param  {boolean} flag 拖拽的状态
         * @returns  {undefined} 无返回值
         */
        setDragStatus(flag) {
            this.dragging = flag;
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 获取兼容ie和非ie的event对象
         * @param {object} event  当前的event对象
         * @returns {*|Event} 返回兼容ie和非ie的event对象
         */
        getEvent(event) {
            return event || window.event;
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description  阻止默认事件
         * @param {object} event  当前的event对象
         * @return {undefined} 无返回值
         */
        stopEvent(event) {
            const _event = event || window.event;
            if (_event.preventDefault) {
                _event.preventDefault();
            } else {
                _event.returnValue = false;
            }
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 设置开始点的坐标
         * @param {number} startX  开始拖拽的位置
         * @returns {undefined}  无返回值
         */
        setStartX(startX) {
            this.startX = startX;
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 设置结束点的坐标
         * @param {number} endX  节点拖拽的位置
         * @returns {undefined}  无返回值
         */
        setEndX(endX) {
            this.endX = endX;
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 设置滚动条的位置
         * @param {number} scrollBarPostion  当前滚动条的位置
         * @returns {undefined}  无返回值
         */
        setScrollBarPostion(scrollBarPostion) {
            // 先取消动画
            cancelAnimationFrame(this.requestAnimationFrameTimerPosition);
            // 如果不存在开始时间
            if (!this.requestAnimationFrameTimerPositionLastTime) {
                this.requestAnimationFrameTimerPositionLastTime = new Date().getTime();
            }
            // 如果是拖拽
            if (this.dragging) {
                this.scrollBarPostion = scrollBarPostion;
            } else {
                // 当前时间
                const _currentTime = new Date().getTime();
                // 当前时间超出，立即执行
                if (_currentTime - this.requestAnimationFrameTimerPositionLastTime > 16) { // eslint-disable-line
                    // 执行回调函数
                    this.scrollBarPostion = scrollBarPostion;
                    // 结束时间
                    this.requestAnimationFrameTimerPositionLastTime = _currentTime;
                } else {
                    this.requestAnimationFrameTimerPosition = requestAnimationFrame(() => {
                        this.scrollBarPostion = scrollBarPostion;
                    });
                }
            }
        },


        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 设置滚动位置，里面会设置scrollAreaWidth，scrollWrapperWidth 以及调用setScrollBarPostion（） 方法，设计滚动条的位置
         * @param {number} scrollAreaWidth   当前滚动区域的scrollWidth值
         * @param {number} scrollWrapperWidth   当前滚动区域的 clientWidth 值
         * @param {number} scrollLeft  当前滚动区域的scrollLeft滚动值
         * @returns {undefined}  无返回值
         */
        setScrollPostion(scrollAreaWidth, scrollWrapperWidth, scrollLeft) {
            // 滚动区域的宽
            this.scrollAreaWidth = scrollAreaWidth;
            // 滚动区域的外围的宽
            this.scrollWrapperWidth = scrollWrapperWidth;
            // 滚动条的位置
            const _scrollBarPostion = scrollLeft / this.validRealScrollDistance * this.validScrollDistance;
            // 初始化参数
            this.initParams();
            // 设置滚动条的位置
            this.setScrollBarPostion(_scrollBarPostion);
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 绑定所有事件， 绑定了mousemove，touchmove，mouseup 和touchend 事件
         * @returns  {undefined} 无返回值
         */
        bindEvent() {
            //  事件监听
            on(document, 'mousemove', this.onDrag, true);
            on(document, 'touchmove', this.onDrag, true);
            on(document, 'mouseup', this.stopDrag, true);
            on(document, 'touchend', this.stopDrag, true);
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 取消绑定的所有事件
         * @returns  {undefined} 无返回值
         */
        unbindEvent() {
            //  移除事件监听
            off(document, 'mousemove', this.onDrag, true);
            off(document, 'touchmove', this.onDrag, true);
            off(document, 'mouseup', this.stopDrag, true);
            off(document, 'touchend', this.stopDrag, true);
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 设置拖拽状态
         * @param  {object} event event 对象
         * @returns  {undefined} 无返回值
         */
        startDrag(event) {
            // 阻止默认事件
            this.stopEvent(event);
            // pc 的event对象
            let _event = this.getEvent(event);
            // 移动端的event对象
            _event = _event.changedTouches ? _event.changedTouches[0] : _event;
            // 正在拖动
            this.setDragStatus(true);
            // 设置开始位置
            this.setStartX(_event.pageX);
            // 绑定拖拽事件
            this.bindEvent();
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 拖拽移动事件处理函数
         * @param {object} event  event 对象
         * @returns {undefined}  无返回值
         */
        onDrag(event) {
            if (this.dragging) {
                // 阻止默认事件
                this.stopEvent(event);
                // pc 的event对象
                let _event = this.getEvent(event);
                // 移动端的event对象
                _event = _event.changedTouches ? _event.changedTouches[0] : _event;
                // 设置结束点的坐标
                this.setEndX(_event.pageX);
                // 处理 scrollLeft
                this.operateScrollLeft(true);
                // 重新设置开始点的坐标
                this.setStartX(_event.pageX);
            }
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 拖拽停止处理函数
         * @returns {undefined}  无返回值
         */
        stopDrag() {
            //  (2018-09-20 解决无限触发函数bug)
            if (this.dragging) {
                // 设置拖拽状态
                this.setDragStatus(false);
                // 处理函数
                this.operateScrollLeft(false);
            }
            // 取消绑定的所有事件
            this.unbindEvent();
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 处理scrollLeft值的函数
         * @param {boolean}  dragging 是否正在拖拽
         * @returns {undefined}  无返回值
         */
        operateScrollLeft(dragging) {
            //  滚动的值不能小于0， 不能大于  this.offsetHeight - this.scrollbarHeight
            const _scrollBarPostion = Math.max(0, Math.min(this.validScrollDistance, (this.endX - this.startX) + this.scrollBarPostion));
            // 触发事件
            this.emitChangeScrollLeft(_scrollBarPostion, dragging);
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 触发事件的处理函数， 里面会触发 changeScrollLeft 事件，传递出_currentPercent（当前滚动条的百分比）, dragging（当前的拖拽状态），这两个参数
         * @param {number}  scrollBarPostion 当前滚动条的位置值
         * @param {boolean}  dragging 当前滚动条的拖拽状态
         * @returns {undefined}  无返回值
         */
        emitChangeScrollLeft(scrollBarPostion, dragging) {
            // 设置滚动条的位置
            this.setScrollBarPostion(scrollBarPostion);
            // y移动的比值
            const _currentPercent = this.scrollBarPostion / this.validScrollDistance;
            //  事件分发
            this.$emit('changeScrollLeft', _currentPercent, dragging);
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 点击滑道的处理函数，滚动条会滑动到目标位置
         * @param {object}  event 当前的event对象
         * @returns {undefined}  无返回值
         */
        clickGoto(event) {
            // pc 的event对象
            let _event = this.getEvent(event);
            // 移动端的event对象
            _event = _event.changedTouches ? _event.changedTouches[0] : _event;
            const isContainer = _event.target === this.$el;
            if (isContainer) {
                // Get the Element Position
                const position = this.$refs.scrollbar.getBoundingClientRect();
                const _moveDistance = (_event.clientX - position.left - this.scrollbarWidth / NUM_2);
                const _times = Math.ceil(this.tweenTime / NUM_16);
                const _distance = _moveDistance / _times;
                // 移动滚动条
                this.moveScrollbar(_distance, _times);
            }
        },

        /**
         * @function
         * @memberof module:horizontal-scrollbar
         * @description 移动滚动条的处理函数，次函数会递归调用，直到times ===0 ，停止递归
         * @param {number}  moveDistance 需要移动的距离
         * @param {number}  times 需要递归的次数
         * @returns {undefined}  无返回值
         */
        moveScrollbar(moveDistance, times) {
            // 次数为0
            if (times === 0) {
                return false;
            }
            // 先取消动画
            cancelAnimationFrame(this.requestAnimationFrameTimer);
            // 执行动画
            this.requestAnimationFrameTimer = requestAnimationFrame(() => {
                //  滚动的值不能小于0， 不能大于  this.offsetHeight - this.scrollbarHeight
                const _scrollBarPostion = Math.max(0, Math.min(this.validScrollDistance, moveDistance + this.scrollBarPostion));
                // 触发事件
                this.emitChangeScrollLeft(_scrollBarPostion, true);
                // 递归调用
                this.moveScrollbar(moveDistance, times - 1);
            });
        }
    }
};
export default module;
