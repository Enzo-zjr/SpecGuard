/**
 *@file
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/9/07 - 10:57
 *@updateTime 2019/9/10 - 10:57
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html} -
 @description horizontal-scrollbar 滚动条组件
 */
/**
 * @module horizontal-scrollbar
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @createTime:2019-09-07,
 * @updateTime:2019-09-07
 * @copyright thunisoft fd
 * @description ##这是horizontal-scrollbar的模块,
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}  -
 *  [jsdoc-vuejs]{@link  http://npm.taobao.org/package/jsdoc-vuejs}  -
 *  [个人博客]{@link  http://www.wuweigang.com}
 * @vue-prop {number} [cscrollAreaWidth=0] -  当前滚动区域的scrollWidth值
 * @vue-prop {number} [cscrollWrapperWidth=0] - 当前滚动区域的clientWidth值
 * @vue-prop {number} [cscrollLeft=0] -  当前滚动区域的scrollLeft滚动值
 * @vue-prop {number} [tweenTime = 200] -  动画的缓动时间，单位毫秒, 如调用update()方法，点击滚动条得滑倒，滚动条滚动，耗时都是用得这个数值
 * @vue-prop {number} [scrollbarMinSize = 30] - 滚动条最小的尺寸，为了提升用户体验
 *
 * @vue-data {number} [clientWidth = 1] -  horizontal-scrollbar 组件可视的宽度
 * @vue-data {boolean} [dragging = false]  - 是否正在拖动
 * @vue-data {number} [startX = 0]  - 开始拖动的坐标点 pageX
 * @vue-data {number} [endX = 0]  - 结束拖动的坐标点 pageX
 * @vue-data {number} [scrollBarPostion = 0]  - 滚动条的位置
 * @vue-data {number} [scrollAreaWidth = 0]  -  当前滚动区域的scrollWidth值
 * @vue-data {number} [scrollWrapperWidth = 0]  - 当前滚动区域的 clientWidth 值
 *
 * @vue-computed {number} validScrollDistance  有效的模拟滚动条滚动值
 * @vue-computed {number} validRealScrollDistance  有效的真实滚动条滚动值
 * @vue-computed {object} scrollbarWidth  滚动条的宽
 * @vue-computed {string} style   滚动条位置的样式
 * @vue-computed {string} style.width  水平滚动条的宽
 * @vue-computed {string} style.left    水平滚动条的left值（滚动条是绝对定位的）
 * @vue-computed {Array.string} wrapClasses   水平滚动条组件容器的class
 * @vue-computed {Array.string} scrollbarClass  水平滚动的class
 *
 * @vue-event {number} changeScrollLeft - 滚动条被拖动或者点击滑道都会触发，传递 _currentPercent（当前百分比），dragging（当前拖拽状态）

 */
