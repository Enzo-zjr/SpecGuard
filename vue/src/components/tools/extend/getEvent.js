/**
 * @version 20190301
 * @author wuwg
 * @createTime  20190412
 * @updateTime  20190412
 */
/**
 *
 * @function
 * @name getEvent
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @memberOf   FdGlobal
 * @description  获取兼容ie和非ie的event对象
 * @param {object} event  当前的event对象
 * @return {event} 返回兼容ie和非ie的event对象
 * @example  FdGlobal.getEvent(event)
 */
export default (event) => event || window.event;
