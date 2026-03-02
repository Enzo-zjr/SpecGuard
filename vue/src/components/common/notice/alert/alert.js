/**
 * Created by wuwg on 2018/10/25.
 */
/**
 *@author   wuwg
 *@createTime  2018/10/15
 *@updateTime   2018/10/15
 *@description  message  component   全局提示组件
 */
import Vue from 'vue';
import alertTemplate from './index.vue';
// module
const module = {
    alert(options) {
        this.createInstance('alert', options);
    },
    confirm(options) {
        this.createInstance('confirm', options);
    },
    prompt(options) {
        this.createInstance('prompt', options);
    },
    createInstance(type, options) {
        let _options = options;
        if (typeof _options === 'string') {
            _options = {content: _options};
        }
        _options.type = type;
        if (type === 'alert') {
            // 隐藏取消按钮
            _options.cancel = {
                show: false,
                text: '取消',
                callback() {
                    // 取消的回调函数
                }
            };
        }
        const _props = _options || {};
        const instance = new Vue({
            render(h) {
                return h(alertTemplate, {props: _props});
            }
        }).$mount();
        // 添加到body下面
        document.body.appendChild(instance.$el);
    }
};
export default module;
