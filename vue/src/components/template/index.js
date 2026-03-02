/**
 *@version 1.0.0
 *@author wuwg
 *@createTime 2019/8/28 - 10:57
 *@updateTime 2019/8/28 - 10:57
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 *@description template 模板组件的描述，这是一个组件编写的模板，大家写组件之前可以直接复制此模板，修改文件夹名、author、时间、description，删掉没用到的周期或文件，如extend、doc.js、readme.md即可
 */

// 模板扩展文件
import templateExtend from './extend/template-extend.js';
// 调用接口的请求文件
import request from './request/request.js';
export default {
    name: 'vccTemplate',
    components: {},
    directives: {},
    filters: {},
    mixins: [templateExtend, request],
    template: '<div></div>',
    render() {
        // render 方法
    },
    props: {
        // 组件传值——属性1
        property1: {
            type: String,
            default: '1'
        },
        // 组件传值——属性2
        property2: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            user: '张三',
            age: 25
        };
    },
    computed: {
        userInfo() {
            return `用户名：${this.user}；年龄：${this.age}`;
        }
    },
    watch: {
        // watch
    },
    activated() {
        // activated
    },
    deactivated() {
        // deactivated
    },
    beforeCreate() {
        // beforeCreate
    },
    created() {
        // created
    },
    beforeMount() {
        // beforeMount
    },
    mounted() {
        // mounted
    },
    beforeUpdate() {
        // beforeUpdate
    },
    updated() {
        // updated
    },
    beforeDestroy() {
        // beforeDestroy
    },
    destroyed() {
        // destroyed
    },
    methods: {

        /**
         * @function
         * @description 一个实例方法,触发【getUserInfo】事件
         * @return {undefined} 无返回值
         */
        method1() {
            this.counter += 1;
            this.$emit('getUserInfo', this.userInfo);
        }
    }
};

