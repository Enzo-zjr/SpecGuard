/**
 *@author   wuwg
 *@createTime   2018/10/23
 *@updateTime   2018/10/23
 *@description  ajax-loading  component   全局ajax加载组件
 */
import Vue from 'vue';
// ajaxLoading 组件
import ajaxLoading from './index.vue';
// module
const module = {
    // 实例
    instance: null,
    // 开始
    start() {
        if (this.instance) {
            // 显示实例
            this.instance.show();
        } else {
            // 创建实例
            this.createdInstance();
        }
    },
    // 完成
    finish() {
        if (this.instance) {
            // 隐藏实例
            this.instance.hide();
        }
    },
    // 创建实例
    createdInstance() {
        this.instance = new Vue({
            components: {ajaxLoading},
            // 渲染组件
            render(h) {
                return h(
                    'ajaxLoading',
                    // {Object}
                    // 一个包含模板相关属性的数据对象
                    // 你可以在 template 中使用这些特性。可选参数。
                    {
                        // 组件 props
                        props: {show: this.currentShow}
                    },
                    []
                );
            },
            // 数据项
            data: {currentShow: true},
            methods: {
                // 显示组件
                show() {
                    this.currentShow = true;
                },
                // 隐藏组件
                hide() {
                    this.currentShow = false;
                }
            }
        }).$mount();
        // 添加到body
        document.body.appendChild(this.instance.$el);
    }
};
export default module;
