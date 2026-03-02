/**
 * @version 1.0.1
 * @author wuwg
 * @createTime  20190815
 * @updateTime  20190815
 */

/**
 *
 * @function
 * @name  FdGlobal.type
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @alias   FdGlobal.type
 * @description  获取对象的数据类型或者判断当前对象是否是某种数据类型
 * @param {object} target -需要检测的对象
 * @param {string} [type]  -可以选参数，数据类型，
 * 可以取值为[ boolean，number，string，function，array，date，regExp，undefined，null，object] 中的一个
 * @return {String|Boolean} -如果不传type,那么就返回该数据的类型，传了的话，会判断当前的对象是否等于type，返回一个boolean值
 * @example
 * // 返回object
 * FdGlobal.type({name:'张三'})
 * // 返回true
 * FdGlobal.type([5,6],'array')
 * // 返回false
 * FdGlobal.type([5,6],'string')
 */
export default (target, type) => {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (map[toString.call(type)] === 'undefined') {
        return map[toString.call(target)];
    }
    return map[toString.call(target)] === type;
};

