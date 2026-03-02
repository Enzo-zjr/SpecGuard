/**
 *@author   wuwg
 *@createTime   2018/10/25 0012
 *@updateTime   2018/10/25 0012
 *@description  module  alert component
 */
import config from '@/components/config/component-config.js';
// prefix
const prefixCls = 'fd-alert';
// alert弹出层模块
const module = {
    name: `${config.componentCcPrefix}alert`,
    props: {
    // 自己的独特的class
        className: String,
        // 动画名字
        animateName: {
            type: String,
            default: 'modal'
        },
        // 弹出层宽
        width: [Number, String],
        // 弹出层高
        height: [Number, String],
        // 弹出层z-index
        zIndex: [Number],
        // 是否需要遮罩层
        modal: Boolean,
        // 弹出层类型
        type: {
            default: 'confirm',
            validator(value) {
                // 类型
                return ['alert', 'confirm', 'prompt'].indexOf(value) !== -1;
            }
        },
        // 弹出层标题
        title: {
            type: String,
            default: '提示'
        },
        // 弹出层标题
        content: {
            type: String,
            default: '您确定删除吗？'
        },
        // 弹出层标题
        value: {
            type: String,
            default: '替换值'
        },
        // 显示确认
        confirm: {
            type: Object,
            default: function () {
                return {
                    show: true,
                    text: '确认',
                    callback() {
                        window.console.log('点击了确定');
                    }
                };
            }
        },
        // 显示取消
        cancel: {
            type: Object,
            default: function () {
                return {
                    show: true,
                    text: '取消',
                    callback() {
                        window.console.log('点击了取消');
                    }
                };
            }
        }
    },
    watch: { },
    data() {
        return {
            // 当前数据
            currentValue: this.value
        };
    },
    computed: {
    // 外部class
        wrapClasses() {
            return [
                prefixCls,
                this.type,
                this.className,
                {opacity0: this.modal}
            ];
        },
        // 弹出层容器class
        popupClasses() {
            return [
                `${prefixCls}-popup`
            ];
        },
        // 弹出层头部class
        popupHeaderClasses() {
            return [
                `${prefixCls}-popup-header`
            ];
        },
        // 弹出层body class
        popupBodyClasses() {
            return [
                `${prefixCls}-popup-body`
            ];
        },
        // 弹出层底部class
        popupFooterClasses() {
            return [
                `${prefixCls}-popup-footer`
            ];
        },
        // 当前的样式
        currentStyle() {
            const _style = {};
            // 宽
            if (this.width) {
                _style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
            }
            // 高
            if (this.height) {
                _style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
            }
            // z-index
            if (this.zIndex) {
                _style.zIndex = this.zIndex;
            }
            return _style;
        }
    },
    methods: {
    // 销毁实例
        destory() {
            // 找到父元素，进行移除
            document.body.removeChild(this.$parent.$el);
        },
        // 点击取消
        clickCancel: function () {
            // 执行回调函数
            Object.prototype.toString.call(this.cancel.callback) === '[object Function]' && this.cancel.callback();
            // 销毁实例
            this.destory();
        },
        // 点击确认
        clickConfirm() {
            // 执行回调函数
            Object.prototype.toString.call(this.confirm.callback) === '[object Function]' && this.confirm.callback(this.type === 'prompt' ? this.currentValue : '');
            // 销毁实例
            this.destory();
        }
    }
};
export default module;
