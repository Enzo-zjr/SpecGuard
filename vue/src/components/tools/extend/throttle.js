/**
 * @version 20190401
 * @author wuwg
 * @createTime  20190410
 * @updateTime  20190410
 */

/**
 * @function
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @alias FdGlobal.throttle
 * @description  函数节流，用于性能优化
 * @param {function} fn  需要节流的函数
 * @param {object} contentText 上下文，也就是对象本身
 * @param {number} delay 需要延迟的时间（毫秒数）
 * @returns {Function} 返回一个函数
 * @example
 * <h1>【实例1】addEventListener 方式</h1>
 *<input type="text" name="test"  id="jsInput"  >
 * <script>
 * function doThing() {
 *     console.log(this)
 *     console.log('需要做的事情 ')
 * }
 * //  addEventListener 方式
 * document.querySelector('#jsInput').addEventListener('input',throttle(doThing,document.querySelector('#jsInput'),1000),false);
 * </script>
 * <h1>【实例2】元素上直接绑定的方式</h1>
 *<input type="text" name="test" oninput="inputMethod()"   >
 * <script>
 * function doThing() {
 *     console.log(this)
 *     console.log('需要做的事情 ')
 * }
 * // 先声明方法
 * let inputMethod = throttle.(doThing,document.querySelector('#jsInput'), 1000);
 * </script>
 *【vue实例3】
 *<div id="jsApp">
 *   <button  @click="clickThrottle(5)" id="jsButton">click</button>
 *   <test  @change="changeHandler"></test>
 *</div>
 *<script>
 * function doThing(num) {
 *     console.log(num)
 *     console.log(this)
 *     console.log('需要做的事情 ')
 * }
 *   new Vue({
 *    el:'#jsApp',
 *    components:{
 *        test:{
 *          template: '<div><button @click="clickHandler">點擊我</button></div>',
 *          methods:{
 *             clickHandler:function () {
 *              this.$emit('change', 5)
 *             }
 *
 *          }
 *        }
 *
 *    },
 *    methods:{
 *      clickThrottle:throttle(doThing,document.querySelector('#jsButton'), 1000),
 *      changeHandler:throttle(doThing)
 *    }
 *  })
 * </script>
 */
export default (fn, contentText, delay) => {
    let waiting;
    let _lastTime = 0;
    let _delay = 50;
    _delay = typeof delay === 'number' ? delay : _delay;
    const later = (_arguments) => {
        waiting = false;
        fn.apply(contentText, _arguments);
    };
    // 注意，這裏不用使用箭頭函數， 否則獲取不到傳遞的參數
    return function () {
        const _arguments = arguments;
        // 当前时间
        const _currentTime = new Date().getTime();
        // 清楚定时器
        if (waiting) {
            clearTimeout(waiting);
        }
        // 当前时间超出，立即执行
        if (_currentTime - _lastTime > _delay) {
            // 执行回调函数
            later(_arguments);
            // 结束时间
            _lastTime = _currentTime;
        } else {
            // 执行回调函数
            waiting = setTimeout(() => {
                // 执行回调函数
                later(_arguments);
            }, _delay);
        }
    };
};
