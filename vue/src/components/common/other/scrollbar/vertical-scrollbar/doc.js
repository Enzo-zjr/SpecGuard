/**
 *@file
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/9/07 - 10:57
 *@updateTime 2019/9/10 - 10:57
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html} -
 @description vertical-scrollbar 滚动条组件
 */
/**
 * @module vertical-scrollbar
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @createTime:2019-09-07,
 * @updateTime:2019-09-10
 * @copyright thunisoft fd
 * @description ##这是vertical-scrollbar的模块,
 * @see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}  -
 *  [jsdoc-vuejs]{@link  http://npm.taobao.org/package/jsdoc-vuejs}  -
 *  [个人博客]{@link  http://www.wuweigang.com}
 * @vue-prop {number} [cscrollAreaHeight=0] -  当前滚动区域的scrollHeight值
 * @vue-prop {number} [cscrollWrapperHeight=0] - 当前滚动区域的clientHeight值
 * @vue-prop {number} [cscrollTop=0] -  当前滚动区域的scrollTop滚动值
 * @vue-prop {number} [tweenTime = 200] -  动画的缓动时间，单位毫秒, 如调用update()方法，点击滚动条得滑倒，滚动条滚动，耗时都是用得这个数值
 * @vue-prop {number} [scrollbarMinSize = 30] - 滚动条最小的尺寸，为了提升用户体验
 *
 * @vue-data {number} [clientHeight = 1] -  vertical-scrollbar 组件可视的高度
 * @vue-data {boolean} [dragging = false]  - 是否正在拖动
 * @vue-data {number} [startY = 0]  - 开始拖动的坐标点 pageX
 * @vue-data {number} [endY = 0]  - 结束拖动的坐标点 pageY
 * @vue-data {number} [scrollBarPostion = 0]  - 滚动条的位置
 * @vue-data {number} [scrollAreaHeight = 0]  -  当前滚动区域的scrollHeight值
 * @vue-data {number} [scrollWrapperHeight = 0]  - 当前滚动区域的clientHeight值
 *
 * @vue-computed {number} validScrollDistance  有效的模拟滚动条滚动值
 * @vue-computed {number} validRealScrollDistance  有效的真实滚动条滚动值
 * @vue-computed {object} scrollbarHeight  滚动条的高
 * @vue-computed {string} style   滚动条位置的样式
 * @vue-computed {string} style.height  垂直滚动条的高
 * @vue-computed {string} style.top    垂直滚动条的top值（滚动条是绝对定位的）
 * @vue-computed {Array.string} wrapClasses   垂直滚动条组件容器的class
 * @vue-computed {Array.string} scrollbarClass 垂直滚动条的class
 *
 * @vue-event {number} changeScrollTop - 滚动条被拖动或者滑道被点击都会触发，传递 _currentPercent（当前百分比），dragging（当前拖拽状态）
 */
