/**
 * @description 注册全局组件
 */
// vue框架
import Vue from 'vue';
// 配置文件
import config from '@/components/config/component-config.js';
// 全局注册

// notice start
import message from '@/components/common/notice/message/message.js';
import ajaxLoading from '@/components/common/notice/ajax-loading/ajax-loading.js';
import $alert from '@/components/common/notice/alert/alert.js';
// notice end

// other start
import scrollbar from './other/scrollbar/index.vue';
// other end

// 全局注册
Vue.component(`${config.componentCcPrefix}-scrollbar`, scrollbar);
const components = {scrollbar};

// 安装
const install = function () {
    if (install.installed) {
        return false;
    }
    let i = 0;
    // 注册组件
    Object.keys(components).forEach(key => {
        i++;
        const pattern = /([A-Z])|^(\$)/gm;
        let _key = key;
        // 大写转-小写
        _key = _key.replace(pattern, function (a) {
            // ==$ 表示是因为组件是关键词，所以多加了标识符$
            return a === '$' ? '' : `-${a.toLowerCase()}`;
        });
        Vue.component(`component-${_key}`, components[key]);
        window.console.log(`全局组件【component-${_key}】已注册，可以使用！`);
    });
    // 全局方法
    Vue.prototype.$Message = message;
    Vue.prototype.$AjaxLoading = ajaxLoading;
    Vue.prototype.$Alert = $alert;
    window.console.log(`组件总数${i}`);
};
const API = {install};
Vue.use(API);
