/**
 *@author   wuwg
 *@createTime  2018/10/15
 *@updateTime   2018/10/15
 *@description  message  component   全局提示组件
 */
import Vue from 'vue';
import messageTemplate from './index.vue';
// module
const module = {
    info(options) {
        return this.message('info', options);
    },
    success(options) {
        return this.message('success', options);
    },
    warning(options) {
        return this.message('warning', options);
    },
    error(options) {
        return this.message('error', options);
    },
    loading(options) {
        return this.message('loading', options);
    },
    message(type, options) {
        let _options = options;
        if (typeof _options === 'string') {
            _options = {content: _options};
        }
        _options.type = type;
        const _props = _options || {};
        const instance = new Vue({
            render(h) {
                return h(messageTemplate, {props: _props, ref: 'jsMessage'});
            }
        }).$mount();
        document.body.appendChild(instance.$el);
        return instance.$refs.jsMessage;
    }
};
export default module;
