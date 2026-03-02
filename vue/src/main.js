// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// index.js
// 注意babel-polyfill会影响打包大小，非常影响性能， 20200228-wuwg，
// 解决方案可以参考doc>问题处理文档>babel-polyfill太大问题.md
// import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
// 全局组件
import './components/common/index.js';
// 全局指令
import './js/app/directive/fdDirective.js';
// 全局过滤器
import './js/app/filter/fdFilter.js';
// 全局消息
import './js/app/message/fdMessage.js';
// 全局配置
import './js/config.js';
// 全局方法类
import FdGlobal from './js/app/common/fdGlobal.js';
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 开始时间
const startTime = new Date().getTime();
// 全局对象
window.fdGlobal = new FdGlobal();
Vue.config.productionTip = false;
window.fdGlobal.performance.start(startTime);
window.fdGlobal.performance.execute('【app start】:');
Vue.use(ElementUI);
// 设置html font  size 的方法， 用rem计算的项目可以打开这项目
// window.fdGlobal.setHtmlFontSize();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    beforeCreate() {
        // 开始时间
        this.beforeCreateTime = window.fdGlobal.performance.getCurrentTime();
    },
    created() {
        window.fdGlobal.performance.execute('【app created】:', this.beforeCreateTime);
        window.fdGlobal.performance.execute('【app created】:');
    },
    mounted() {
        window.fdGlobal.performance.execute('【app mounted】:', this.beforeCreateTime);
        window.fdGlobal.performance.execute('【app mounted】:');
    }
});
