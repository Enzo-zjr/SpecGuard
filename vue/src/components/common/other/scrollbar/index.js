/**
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/9/07 - 10:57
 *@updateTime 2019/9/09 - 10:57
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description  滚动条组件
 */
import config from './extend/component-config.js';
import eventObject from './extend/event.js';
import getScrollBarSize from './extend/getScrollBarSize.js';
import './extend/requestAnimationFrame.js';
//   components
import verticalScrollbar from './vertical-scrollbar/index.vue';
import horizontalScrollbar from './horizontal-scrollbar/index.vue';
// prefix
const prefixCls = `${config.classPrefix}scroll`;
const NUM_16 = 16;
const {
    on, off
} = eventObject;
// module
export default {
    name: `${config.componentCcPrefix}scrollbar`,
    // components
    components: {
        verticalScrollbar,
        horizontalScrollbar
    },
    props: {

        /**
         * @description 滚动条默认是否显示
         */
        show: {
            type: Boolean,
            default: true
        },

        /**
         * @description 是否启动响应式， 默认启动
         */
        responseType: {
            type: Boolean,
            default: true
        },

        /**
         * @description 响应式监听的属性值
         */
        attributeFilter: {
            type: Array,
            default() {
                return ['style', 'class'];
            }
        },

        /**
         * @description 动画的缓动时间，单位毫秒, 如调用update()方法，点击滚动条得滑倒，滚动条滚动，耗时都是用得这个数值
         */
        tweenTime: {
            type: Number,
            default: 200
        },

        /**
         * @description 上拉刷新|下拉加载间隔时间，单位毫秒，主要为了提升性能，默认为500
         */
        delay: {
            type: Number,
            default: 200
        },

        /**
         * @description  滚动条最小的尺寸
         */
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
            // 是否显示滚动条
            showScrollbar: this.isMobile() ? true : this.show,

            // has vertical  scroll bar
            hasVerticalScrollBar: false,
            // has horizontal  scroll bar
            hasHorizontalScrollBar: false,

            // 纵向滚动条的 scrollTop
            scrollTop: 0,
            // 横线滚动条的 scrollLeft
            scrollLeft: 0,

            // 滚动区域内容的宽高
            scrollAreaWidth: 0,
            scrollAreaHeight: 0,

            // 滚动区域外围容器的宽高
            scrollWrapperHeight: 0,
            scrollWrapperWidth: 0,

            // 判断浏览器为非webkit内核的浏览器
            isNotWebkit: !((navigator.userAgent.toLowerCase().indexOf('applewebkit/') > -1)),
            // 浏览器默认滚动条的大小
            scrollBarSize: 17,
            // 是否正在拖动
            dragging: false

        };
    },
    watch: {},
    computed: {
        // 真实有效的scrollTop滚动值
        validRealScrollTopDistance() {
            return this.scrollAreaHeight - this.scrollWrapperHeight;
        },
        // 真实有效的scrollLeft滚动值
        validRealScrollLeftDistance() {
            return this.scrollAreaWidth - this.scrollWrapperWidth;
        },
        // 滚动容器的样式
        style() {
            // eslint-disable-next-line
            return this.isNotWebkit ? {
                // 滚动容器的高，隐藏横向滚动条
                height: `${this.scrollWrapperHeight + this.scrollBarSize}px`,
                //  滚动容器的margin-right 隐藏纵向滚动条
                'margin-right': `-${this.scrollBarSize}px`
            } : {};
        },
        // 滚动条组件容器的class
        wrapClasses() {
            return [
                prefixCls,
                this.isNotWebkit ? 'not-webkit' : '',
                this.showScrollbar ? 'show' : ''
            ];
        },
        // 滚动容器的class
        scrollbarAreaClasses() {
            return [
                `${config.classPrefix}scroll-area`
            ];
        },
        // 滚动内容容器的class
        scrollbarContentClasses() {
            return [
                `${config.classPrefix}scroll-content`
            ];
        }
    },
    mounted() {
        // 初始化的方法
        this.init();
        // 响应式，监听
        this.bindResponseTypeObserve();
        // ready事件
        this.$emit('ready', this);
    },
    beforeDestroy() {
        // 取消事件绑定
        this.unbindEvent();
        //  响应式，取消监听
        this.unbindResponseTypeObserve();
        // 先取消动画
        cancelAnimationFrame(this.requestAnimationFrameTimerPositionTop);
        // 先取消动画
        cancelAnimationFrame(this.requestAnimationFrameTimerPositionLeft);
        // 先取消动画定时器
        cancelAnimationFrame(this.requestAnimationFrameTimer);
    },
    methods: {

        /**
         * @function
         * @memberof module:scrollbar
         * @description  初始化的方法
         * @returns {undefined} 无返回值
         */
        init() {
            // 滚动条的大小
            this.scrollBarSize = this.getScrollBarSize();
            // 初始化参数
            this.initParams();
            // 绑定事件
            this.bindEvent();
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  初始化参数的方法
         * @returns {undefined} 无返回值
         */
        initParams() {
            // 1.滚动条外围的宽
            this.scrollWrapperWidth = this.$el.clientWidth;
            // 2.滚动条外围的高
            this.scrollWrapperHeight = this.$el.clientHeight;
            // 3.滚动区域【内容的宽】
            this.scrollAreaWidth = this.$refs.scrollArea.scrollWidth;
            // 4.滚动区域【内容的高】
            this.scrollAreaHeight = this.$refs.scrollArea.scrollHeight;
            // 5.有纵向滚动条
            this.hasVerticalScrollBar = this.scrollAreaHeight > this.scrollWrapperHeight;
            // 6.有横向滚动条
            this.hasHorizontalScrollBar = this.scrollAreaWidth > this.scrollWrapperWidth;
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  响应式，取消监听的方法
         * @returns {undefined} 无返回值
         */
        unbindResponseTypeObserve() {
            // 启用了响应式，并且已经有监听对象
            if (this.responseType && this.mutationObserver) {
                this.mutationObserver.disconnect();
            }
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  响应式，绑定监听的方法
         * @returns {undefined} 无返回值
         */
        bindResponseTypeObserve() {
            //  MutationEvent在IE浏览器中最低支持到IE9
            // 在webkit内核的浏览器中，不支持 DOMAttrModified
            // IE，Edge以及Firefox浏览器下不支持，不支持 DOMNodeInsertedIntoDocument 和 DOMNodeRemovedFromDocument
            if (this.responseType && typeof window.MutationObserver === 'function') {
                // 所有配置文件
                const observerConfig = {
                    // 子节点的变动
                    attributes: true,
                    // 属性的变动
                    childList: true,
                    // 节点内容或节点文本的变动
                    characterData: true,
                    // 所有后代节点的变动
                    subtree: true,
                    // 表示观察attributes变动时，是否需要记录变动前的属性
                    attributeOldValue: false,
                    // 表示观察characterData变动时，是否需要记录变动前的值
                    characterDataOldValue: false,
                    // 如果不是所有的属性改变都需要被观察，并且attributes设置为true或者被忽略，
                    // 那么设置一个需要观察的属性本地名称（不需要命名空间）的列表
                    // 默认只监听了两个值 ['style', 'class']
                    attributeFilter: this.attributeFilter
                };

                // 停止对target的观察。
                this.mutationObserver = new MutationObserver((mutationsList, observer) => { // eslint-disable-line

                    /**
                     * {object} mutation 下的属性
                     * type: 如果是属性变化，返回"attributes"，如果是一个CharacterData节点（Text节点、Comment节点）变化，返回"characterData"，节点树变化返回"childList"
                     * target 返回影响改变的节点
                     * addedNodes 返回添加的节点列表
                     * removedNodes 返回删除的节点列表
                     * previousSibling:  返回分别添加或删除的节点的上一个兄弟节点，否则返回null
                     * nextSibling 返回分别添加或删除的节点的下一个兄弟节点，否则返回null
                     * attributeName 返回已更改属性的本地名称，否则返回null
                     * attributeNamespace: 返回已更改属性的名称空间，否则返回null
                     * oldValue: 返回值取决于type。对于"attributes"，它是更改之前的属性的值。对于"characterData"，它是改变之前节点的数据。对于"childList"，它是null
                     */
                    this.$nextTick(() => {
                        // 刷新滚动条
                        this.refresh(false, (top, left) => {
                            // 触发事件【滚动条因内部内容高度发生变化触发的事件】
                            this.$emit('mutationObserver', top, left);
                        });
                    });
                });
                // 设置观察目标，接受两个参数，target：观察目标，options：通过对象成员来设置观察选项
                this.mutationObserver.observe(this.$el, observerConfig);
                // console.log(this.mutationObserver)
            }
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 获取浏览器滚动条的大小
         * @returns {number} 返回浏览器滚动条的大小
         */
        getScrollBarSize() {
            return getScrollBarSize();
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 设置拖拽状态
         * @param  {boolean} flag 拖拽的状态
         * @returns  {undefined} 无返回值
         */
        setDragStatus(flag) {
            this.dragging = flag;
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description refresh 刷新方法，先初始化参数initParams()，再设置滚动条样式scrollHandle()
         * @param {boolean} emitScroll 是否触发滚动事件，默认不触发
         * @param {function} callback 刷新后的回调函数
         * @returns  {undefined} 无返回值
         */
        refresh(emitScroll = false, callback) {
            // 保
            this.$nextTick(() => {
                // 初始化参数
                this.initParams();
                // 触发一次滚轮事件
                this.scrollHandle(emitScroll);
                // 回调函数
                if (typeof callback === 'function') {
                    // 触发回调函数
                    callback(this.scrollTop, this.scrollLeft);
                }
            });
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 绑定事件,此函数只是绑定了 resize事件
         * @returns {undefined} 无返回值
         */
        bindEvent() {
            // 浏览器窗口改变，重新设置参数
            on(window, 'resize', this.refresh);
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 取消绑定的事件
         * @returns {undefined} 无返回值
         */
        unbindEvent() {
            // 解除resize事件
            off(window, 'resize', this.refresh);
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 获取兼容ie和非ie的event对象
         * @param {object} event  当前的event对象
         * @returns {*|Event} 返回兼容ie和非ie的event对象
         */
        getEvent(event) {
            return event || window.event;
        },

        /**
         * @function
         * @memberof module:scrollbar
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
         * @memberof module:scrollbar
         * @description  滚动到顶部||最左侧触发的处理函数
         * @return {undefined} 无返回值
         */
        scrollToUpper() {
            // 清除延迟定时器
            if (this.delayTimer) {
                return false;
            }
            // 设置延迟定时器
            this.delayTimer = setTimeout(() => {
                // 触发事件【滚动条触顶事件】
                this.$emit('scrollToUpper', this.scrollTop, this.scrollLeft);
                this.delayTimer = null;
            }, this.delay);
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  滚动到底部||最右侧触发的处理函数
         * @return {undefined} 无返回值
         */
        scrollToLower() {
            // 清除延迟定时器
            if (this.delayTimer) {
                return false;
            }
            // 设置延迟定时器
            this.delayTimer = setTimeout(() => {
                // 触发事件【滚动条触底事件】
                this.$emit('scrollToLower', this.scrollTop, this.scrollLeft);
                this.delayTimer = null;
            }, this.delay);
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 处理滚轮事件的处理函数
         * @return {undefined} 无返回值
         */
        operateWheelHandle() {
            // 如果是下滚， 且纵滚动条的值达到最下面或者横滚到达最右边
            if (this.wheelDirection === 'lower' && (this.scrollLeft === this.validRealScrollLeftDistance || this.scrollTop === this.validRealScrollTopDistance)) {
                this.scrollToLower();
            }
            // 如果是上滚，且纵滚动条的值达到最上面（0）或者横滚到达最左边（0）
            if (this.wheelDirection === 'upper' && (this.scrollLeft === 0 || this.scrollTop === 0)) {
                this.scrollToUpper();
            }
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 单独处理safari处理滚轮事件
         * @return {undefined} 无返回值
         */
        mousewheelHandle() {
            // 不是拖动
            this.setDragStatus(false);
            // 是否按住了shift
            this.shiftKey = (event.shiftKey);
            // 滚轮的方向
            this.wheelDirection = event.wheelDeltaY < 0 ? 'lower' : 'upper';
            // console.log('mousewheelHandle');
            // console.log(event);
            // 处理滚轮事件
            this.operateWheelHandle();
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 处理非safari处理滚轮事件
         * @return {undefined} 无返回值
         */
        wheelHandle() {
            // 不是拖动
            this.setDragStatus(false);
            // 是否按住了shift
            this.shiftKey = (event.shiftKey);
            // 滚轮的方向
            this.wheelDirection = event.deltaY > 0 ? 'lower' : 'upper';
            // 处理滚轮事件
            this.operateWheelHandle();
            // console.log('wheelHandle');
            // console.log(event);
            // 经过测试， ie 每次滚动，默认会滚动144px，而其他浏览器会滚动 100
            // 滚动触发次数ie 一般为3次，而chrome 会触发 5- 6次
            /**
             *****************************************************************************
             safari  不支持wheel 事件
             mousewheel事件 type:mousewheel,   wheelDeltaY , 往下是  -, 往上 + ；
             wheel事件不触发，  mousewheel 触发
             *****************************************************************************
             chrome  wheel事件，type: "wheel"，  deltaY，  往下是  +, 往上 -；（100）
             mousewheel事件， wheelDeltaY 属性 ,     往下是  -, 往上 + ； （120）
             wheel事件触发，  mousewheel 不触发
             * *****************************************************************************
             opera  wheel事件，type: "wheel"，  deltaY，  往下是  +, 往上 -；（100）
             mousewheel事件， wheelDeltaY 属性 ,  往下是  -, 往上 + ； （120）
             wheel事件触发，  mousewheel 不触发
             *****************************************************************************
             ie    wheel事件， type: "wheel"，  deltaY，  往下是  +, 往上 -；（144）
             mousewheel 事件， wheelDeltaY 属性 ,  往下是  -, 往上 + ； （120）
             wheel，  mousewheel 都触发
             *****************************************************************************
             firefox  wheel事件，type: "wheel"，  deltaY，  往下是  +, 往上 -；（3）
             mousewheel事件不支持，
             DOMMouseScroll 事件 ，支持， 属性为detail 往下是  +, 往上 -；（3）（唯独火狐支持）
             wheel事件触发，  mousewheel 不触发
             *****************************************************************************
             */
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  滚动条事件处理函数
         * @param {boolean} emitScroll=true  是否触发滚动条事件
         * @return {undefined} 无返回值
         */
        scrollHandle(emitScroll = true) {
            // 滚动后的值
            // 纵向滚动条的 scrollTop
            this.scrollTop = this.$refs.scrollArea.scrollTop;
            // 横线滚动条的 scrollLeft
            this.scrollLeft = this.$refs.scrollArea.scrollLeft;
            // 如果触发滚动
            if (emitScroll) {
                // 触发滚动事件,
                this.$emit('scroll', this.scrollTop, this.scrollLeft);
            }
            //  非拖拽，说明是原生滚动，需要移动滚动条的位置
            if (!this.dragging) {
                // 移动模拟的滚动条
                this.moveTheScrollbar();
            }
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  移动模拟的滚动条处理函数
         * @return {undefined} 无返回值
         */
        moveTheScrollbar() {
            // 如果有纵向滚动条
            if (this.hasVerticalScrollBar && typeof this.$refs.verticalScrollbar === 'object' && typeof this.$refs.verticalScrollbar.setScrollPostion === 'function') {
                // 设置纵向滚动条位置
                this.$refs.verticalScrollbar.setScrollPostion(this.scrollAreaHeight, this.scrollWrapperHeight, this.scrollTop);
            }
            // 如果有水平滚动条
            if (this.hasHorizontalScrollBar && typeof this.$refs.horizontalScrollbar === 'object' && typeof this.$refs.horizontalScrollbar.setScrollPostion === 'function') {
                // 设置水平滚动条位置
                this.$refs.horizontalScrollbar.setScrollPostion(this.scrollAreaWidth, this.scrollWrapperWidth, this.scrollLeft);
            }
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  改变纵向滚动条位置的处理函数
         * @param {number} currentPercent   当前纵向滚动条的进度条（小数）
         * @param {boolean} dragging   是否正在拖动
         * @return {undefined} 无返回值
         */
        handleChangeScrollTop(currentPercent, dragging) {
            // 先取消动画
            cancelAnimationFrame(this.requestAnimationFrameTimerPositionTop);
            this.requestAnimationFrameTimerPositionTop = requestAnimationFrame(() => {
                // 拖动
                this.setDragStatus(dragging);
                // 改变纵向滚动条位置改变
                this.$refs.scrollArea.scrollTop = this.validRealScrollTopDistance * currentPercent;
            });
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  改变横向滚动条位置的处理函数
         * @param {number} currentPercent   当前横向滚动条的进度条（小数）
         * @param {boolean} dragging   是否正在拖动
         * @return {undefined} 无返回值
         */
        handleChangeScrollLeft(currentPercent, dragging) {
            // 先取消动画
            cancelAnimationFrame(this.requestAnimationFrameTimerPositionLeft);
            this.requestAnimationFrameTimerPositionLeft = requestAnimationFrame(() => {
                // 拖动
                this.setDragStatus(dragging);
                // 改变水平滚动条位置改变
                this.$refs.scrollArea.scrollLeft = this.validRealScrollLeftDistance * currentPercent;
            });
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  更新纵向滚动条位置的处理函数
         * @param {number} top   纵向滚动条位置
         * @param {function} callback   更新完滚动条后的回调函数
         * @param {boolean} animateFlag = true  是否有动画
         * @return {undefined} 无返回值
         */
        updateTop(top, callback, animateFlag = true) {
            this.update(top, this.scrollLeft, callback, animateFlag);
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  更新横向滚动条位置的处理函数
         * @param {number} left   横向滚动条位置
         * @param {function} callback   更新完滚动条后的回调函数
         * @param {boolean} animateFlag = true  是否有动画
         * @return {undefined} 无返回值
         */
        updateLeft(left, callback, animateFlag = true) {
            this.update(this.scrollTop, left, callback, animateFlag);
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  更新滚动条的处理函数，纵向和横向都更新
         * @param {number} top   纵向滚动条位置
         * @param {number} left   横向滚动条位置
         * @param {function} callback   更新完滚动条后的回调函数
         * @param {boolean} animateFlag = true  是否有动画
         * @return {undefined} 无返回值
         */
        update(top, left, callback, animateFlag = true) {
            let _top = top;
            let _left = left;
            if (typeof _top === 'undefined') {
                _top = this.scrollTop;
            }
            if (typeof _left === 'undefined') {
                _left = this.scrollLeft;
            }
            // 初始化参数
            this.initParams();
            // 纵向滚动条的 scrollTop
            const _moveDistanceTop = _top - this.scrollTop;
            // 横向滚动条的 scrollLeft
            const _moveDistanceLeft = _top - this.scrollLeft;
            // 滚动次数
            const _times = animateFlag ? Math.ceil(this.tweenTime / NUM_16) : 1;
            // 纵向滚动条每次滚动的距离
            const _distanceTop = _moveDistanceTop / _times;
            // 横向滚动条每次滚动的距离
            const _distanceLeft = _moveDistanceLeft / _times;
            // 移动滚动条
            this.moveScrollbar(_distanceTop, _distanceLeft, _times, callback, _top, _left);
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  移动滚动条的处理函数， 有动画
         * @param {number} distanceTop   纵向滚动条每次滚动的距离
         * @param {number} distanceLeft   横向滚动条每次滚动的距离
         * @param {number} times   滚动次数
         * @param {function} callback   更新完滚动条后的回调函数
         * @param {number} top   纵向滚动条最终的位置
         * @param {number} left   横向滚动条最终的位置
         * @return {undefined} 无返回值
         */
        moveScrollbar(distanceTop, distanceLeft, times, callback, top, left) {
            // 先取消动画定时器
            cancelAnimationFrame(this.requestAnimationFrameTimer);
            // 次数为0
            if (times === 0) {
                //  设置滚动条位置
                this.$refs.scrollArea.scrollTop = top;
                this.$refs.scrollArea.scrollLeft = left;
                // 当前滚动条赋值
                this.scrollTop = top;
                this.scrollLeft = left;
                // 浏览器渲染进程
                this.requestAnimationFrameTimer = requestAnimationFrame(() => {
                    // 执行回调函数
                    this.excuteCallback(callback, this.scrollTop, this.scrollLeft);
                });
                return false;
            }
            // 执行动画，设置动画定时器
            this.requestAnimationFrameTimer = requestAnimationFrame(() => {
                //  设置滚动条位置
                this.$refs.scrollArea.scrollTop = this.scrollTop + distanceTop;
                this.$refs.scrollArea.scrollLeft = this.scrollLeft + distanceLeft;
                // 递归调用
                this.moveScrollbar(distanceTop, distanceLeft, times - 1, callback, top, left);
            });
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description 执行回调函数
         * @param {function} callback  需要执行的回调函数
         * @param {object} param  扩展的参数
         * @returns {undefined}  无返回值
         */
        excuteCallback(callback, ...param) {
            if (typeof callback === 'function') {
                // 执行回调函数
                callback.apply(null, param);
            }
        },

        /**
         * @function
         * @memberof module:scrollbar
         * @description  检测当前浏览器是否为移动端的方法
         * @return  {boolean} 返回一个boolean值
         */
        isMobile: () => {
            const agent = navigator.userAgent.toLowerCase();
            const isIphone = agent.indexOf('iphone') !== -1;
            const isAndroid = agent.indexOf('android') !== -1;
            const isIPad = agent.indexOf('ipad') !== -1;
            const isIPod = agent.indexOf('ipod') !== -1;
            const isIEMobile = agent.indexOf('iemobile') !== -1;
            const isWebOS = agent.indexOf('webos') !== -1;
            const isBlackBerry = agent.indexOf('blackberry') !== -1;
            const isOperaMini = agent.indexOf('opera mini') !== -1;
            return (isIphone || isAndroid || isIPad || isIPod || isIEMobile || isWebOS || isBlackBerry || isOperaMini);
        }
    }
};
