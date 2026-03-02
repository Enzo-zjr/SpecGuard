/**
 *@file
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/9/07 - 10:57
 *@updateTime 2019/9/10 - 10:57
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html} -
 @description scrollbar 滚动条组件
 */
/**
 * @module scrollbar
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @createTime:2019-09-07,
 * @updateTime:2019-09-07
 * @copyright thunisoft fd
 * @description ##这是scrollbar（滚动条）模块,
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}  -
 *  [jsdoc-vuejs]{@link  http://npm.taobao.org/package/jsdoc-vuejs}  -
 *  [个人博客]{@link  http://www.wuweigang.com}
 * @vue-prop {boolean} [show=true] -  滚动条默认是否显示
 * @vue-prop {boolean} [responseType=true] -  是否启动响应式， 默认启动
 * @vue-prop {array}  [attributeFilter =  ['style', 'class']]  响应式监听的属性值
 * @vue-prop {number} [tweenTime = 200] -  动画的缓动时间，单位毫秒, 如调用update()方法，点击滚动条得滑倒，滚动条滚动，耗时都是用得这个数值
 * @vue-prop {number} [delay = 200] - 上拉刷新|下拉加载间隔时间，单位毫秒，主要为了提升性能，默认为500
 * @vue-prop {number} [scrollbarMinSize = 30] -   滚动条最小的尺寸，为了提升用户体验
 * @vue-data {boolean} showScrollbar - 是否显示滚动条
 * @vue-data {boolean} hasVerticalScrollBar - 是否有纵向滚动条
 * @vue-data {boolean} hasHorizontalScrollBar - 是否有横向滚动条
 * @vue-data {number} scrollTop - 当前滚动条的scrollTop值
 * @vue-data {number} scrollLeft - 当前滚动条的scrollLeft值
 * @vue-data {number} scrollAreaWidth - 当前滚动区域的 scrollWidth 值
 * @vue-data {number} scrollAreaHeight - 当前滚动区域的 scrollHeight 值
 * @vue-data {number} scrollWrapperHeight - 当前滚动区域的 clientHeight 值
 * @vue-data {number} scrollWrapperWidth - 当前滚动区域的 clientWidth 值
 * @vue-data {boolean} isNotWebkit - 判断浏览器为非webkit内核的浏览器
 * @vue-data {number} scrollBarSize - 浏览器默认滚动条的大小
 * @vue-data {boolean} dragging - 是否正在拖动
 * @vue-computed {number} validRealScrollTopDistance  真实有效的scrollTop滚动值
 * @vue-computed {number} validRealScrollLeftDistance  真实有效的scrollLeft滚动值
 * @vue-computed {object} style  滚动容器的样式
 * @vue-computed {string} style.height     -滚动容器的高，隐藏横向滚动条
 * @vue-computed {string} style.marginRight  -   滚动容器的margin-right 隐藏纵向滚动条
 * @vue-computed {Array.string} wrapClasses    滚动条组件容器的class
 * @vue-computed {Array.string} scrollbarAreaClasses    滚动容器的class
 * @vue-computed {Array.string} scrollbarContentClasses    滚动内容容器的class
 * @vue-event {number} scrollToUpper - 滚动条触顶事件，传递 this.scrollTop, this.scrollLeft的值
 * @vue-event {number} scrollToLower - 滚动条触底事件，传递 this.scrollTop, this.scrollLeft的值
 * @vue-event {number} scroll - 滚动条滚动事件，传递 this.scrollTop, this.scrollLeft的值
 * @vue-event {object} ready - 滚动条加载完成事件，传递 this对象
 * @example
<vcc-scrollbar class="fd-contain"
     :show="show"
     :responseType="responseType"
     :attributeFilter="attributeFilter"
     :tweenTime="tweenTime"
     :delay="delay"
     :scrollbarMinSize="scrollbarMinSize"
     v-on-ready="ready"
     v-on-scroll="scrollHandler"
     v-on-scrollToUpper="scrollToUpperHandler"
     v-on-scrollToLower="scrollToLowerHandler">
     <p :style="style"  v-for="(item, index) in test" :key="index">{{index + 1}}、杭州网博科技有限公司主营软件开发</p>
</vcc-scrollbar>
 *
 */
