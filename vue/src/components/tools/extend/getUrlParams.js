/**
 * @function
 * @name getUrlParams
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @memberOf   FdGlobal
 * @createTime 2019.08.13
 * @description 获取url中的参数，可以
 * @param {String} [url] 可选参数，一个url地址，可以不传，默认会取window.location.href
 * @returns {object|null} 如果匹配到参数，那么就会返回一个目标对象，否则返回null
 * @update  
 * 1.2020-02-10:  
 *   1.1 部分url会出现=后无值， 所以将  const _urlParams = _url.match(/[?&](.+?=[^&]+)/igm);  
 *       修改为   const _urlParams = _url.match(/[?&](.+?=[^&]*)/igm); 
 *   1.2 url中文字一般都会编码，所以将 a[value[0]] = value[1]; 修改为  a[decodeURIComponent(value[0])] = decodeURIComponent(value[1]); 
 *
 */
function getUrlParams(url) {
    const _url = url || window.location.href;
    const _urlParams = _url.match(/[?&](.+?=[^&]*)/igm);
    // 默认参数对象
    const _defaultParmas = {};
    return _urlParams ? _urlParams.reduce((a, b) => {
        const value = b.slice(1).split('=');
       a[decodeURIComponent(value[0])] = decodeURIComponent(value[1]); 
        return a;
    }, _defaultParmas) : null;
}
export default getUrlParams;
