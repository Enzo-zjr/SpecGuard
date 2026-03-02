/**
 *@file index
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/10/18 - 15:14
 *@updateTime 2019/10/18 - 15:14
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description index 的描述
 */
import request from './request/request.js';
const NUM_25 = 25;
// 导出模块
export default {
    name: 'test3',
    // 混入
    mixins:[request],
    props: {test: {type: null}},
    data() {
        return {
            message: 'test3',
            showLog: window.fdConfig.showLog,
            serverUrl: window.fdConfig.url.test.index,
            data: []
        };
    },
    methods: {
        // 获取数据
        clickGetData() {
            return new Promise((resolve) => {
                // 请求数据
                const queryData = {
                    query: '张三',
                    age: NUM_25
                };
                // 获取用户数据
                this.requestUserData(queryData).then((data) => {
                    this.data = data;
                    resolve();
                });
            });
        }
    },
    mounted() {
        //  console.log(this)
    }
};
