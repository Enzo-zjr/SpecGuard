/**
 *@file index
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/10/18 - 14:22
 *@updateTime 2019/10/18 - 14:22
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description capitalize 首字母转换成大写
 */
/**
 *
 * @param {string} value 需要转换字符串
 * @returns {*} 返回首字母被转换成大写的值
 */
export default (value) => {
    if (!value) {
        return '';
    }
    const _value = value.toString();
    return _value.charAt(0).toUpperCase() + _value.slice(1);
};
