/**
 * @version  1.0.1
 * @author wuwg
 * @createTime  20190816
 * @updateTime  20190816
 */

/**
 * @function
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @name  adjustScrollBarPosition
 * @memberof FdGlobal
 * @param {object} element 目标元素
 * @param {object} scrollContain 滚动条所在的容器元素（出现滚动条的元素）
 * @param {number} distance  滚动条偏移位置
 * @description  调整滚动条位置，如果目标(element)不在滚动条容器(scrollContain)的可视区域内，那么将设置滚动条到目标位置，并返回true， 否则返回false
 * @returns {boolean}  返回一个boolean值，如果滚动条发生变动，那么将返回true, 否则返回false
 * @example
 *  <style>
 *       ul {
 *          width:200px;
 *          height: 300px;
 *          overflow: auto;
 *      }
 *       li {
 *           padding:5px;
 *           line-height:200px;
 *           text-align: center;
 *           border: 1px solid #000;
 *        }
 *       li:nth-child(5) {
 *           background-color: red;
 *       }
 *       li:nth-child(2) {
 *          background-color: blue
 *      }
 *  </style>
 *  <ul class="js-scrollContain">
 *      <li>1</li>
 *      <li>2</li>
 *      <li>3</li>
 *      <li>4</li>
 *      <li>5</li>
 *      <li>6</li>
 *  </ul>
 *  <button onclick="gotoTarget(5)">到达5目标位置</button>
 *  <button onclick="gotoTarget(2)">到达2目标位置</button>
 * <script>
 *       function gotoTarget(num) {
 *          // 设置滚动条位置
 *          FdGlobal.adjustScrollBarPosition(document.querySelector('.js-scrollContain li:nth-child('+ num +')'), document.querySelector('.js-scrollContain'))
 *       }
 * </script>
 */
export default (element, scrollContain, distance) => {
    const _element = element;
    const _scrollContain = scrollContain;
    const _distance = distance || 0;
    //  获取矩形容器
    const rectTarget = _element.getBoundingClientRect();
    const rectContain = _scrollContain.getBoundingClientRect();
    // debugger
    const bottomOverflowDistance = rectContain.bottom - rectTarget.bottom;
    // bottomOverflowDistance小于0，说明目标元素不在可视范围之内
    if (bottomOverflowDistance < 0) {
        _scrollContain.scrollTop += Math.abs(bottomOverflowDistance) + _distance;
        return true;
    }
    const topOverflowDistance = rectContain.top - rectTarget.top;
    // topOverflowDistance 大于0，说明目标元素不在可视范围之内
    if (topOverflowDistance > 0) {
        _scrollContain.scrollTop -= Math.abs(topOverflowDistance) + _distance;
        return true;
    }
    return false;
};
