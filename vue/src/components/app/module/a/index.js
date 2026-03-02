// 配置文件
import config from '@/components/config/component-config.js';
export default {
    // 组件名， module 下的a组件， config.componentAcPrefix = ac 为 公用的业务组件
    name: `${config.componentAcPrefix}-module-a`,
    props: {
        user: {
            type: String,
            default: '张三'
        }
    },
    data() {
        return {currentUser: this.user};
    },
    methods: {

        /**
         * @function
         * @memberof module:module-a
         * @description 一个实例方法,触发【getUser】事件
         * @return {undefined} 无返回值
         */
        clickGetUser() {
            this.$emit('getUser', this.currentUser);
        }
    }
};

