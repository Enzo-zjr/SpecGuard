/**
 *@author   wuwg
 *@createTime   2018/10/25 0012
 *@updateTime   2018/10/25 0012
 *@description  module  alert component
 */
// prefix
const prefixCls = 'fd-ajax-loading';
// alert弹出层模块
const module = {
    props: {
        show: {
            type: Boolean,
            default: true
        },
        text: {
            type: String,
            default: ''
        }
    },
    computed: {
        warpClass() {
            return [
                prefixCls,
                {show: this.show}
            ];
        }
    }
};
export default module;
