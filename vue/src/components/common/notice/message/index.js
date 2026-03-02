/**
 *@author   wuwg
 *@createTime  2018/10/15
 *@updateTime   2018/10/15
 *@description  message  component   全局提示组件
 */
// config
import config from '@/components/config/component-config.js';
const prefixCls = 'fd-message';
const componentName = `${config.componentCcPrefix}-message`;
const iconTypes = {
    default: 'default',
    info: 'information',
    success: 'success',
    warning: 'warning',
    error: 'error',
    loading: 'loading'
};
// module
const module = {
    name: componentName,
    components: {},
    props: {
        content: {
            type: String,
            default: 'message'
        },
        type: {
            type: String,
            default: 'default'
        },
        // 自己的独特的class
        className: String,
        duration: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {};
    },
    watch: {},
    computed: {
        wrapClasses() {
            return [
                `${prefixCls}`,
                iconTypes[this.type],
                this.className ? this.className : ''
            ];
        }
    },
    methods: {
        // 移入不关闭
        mouseenter() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        // 移除关闭
        mouseleave() {
            this.close();
        },
        // 关闭提示
        close() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            document.body.removeChild(this.$parent.$el);
        }
    },
    mounted() {
    // 移出dom
        this.timer = setTimeout(() => {
            this.close();
        }, this.duration);
    }
};
export default module;
