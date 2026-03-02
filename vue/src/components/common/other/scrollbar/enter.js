/**
 *@file index
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/9/10 - 15:59
 *@updateTime 2019/9/10 - 15:59
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description 上传组件
 */
// 引入组件
import scrollbar from './index.vue';

const install = function (Vue) {
    window.console.log('全局【vcc-scrollbar】组件注册成功， 可以使用！');
    // 全局注册
    Vue.component('vcc-scrollbar', scrollbar);
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
const API = {
    install,
    scrollBar: scrollbar
};

window.vccScrollBar = API;
// vue es6模块写法
// export default API;
// CommonJS模块规范
// module.exports.default = module.exports = API;
