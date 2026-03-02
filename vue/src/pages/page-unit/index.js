/**
 * @version 1.0.1
 * @author wuwg  <wuwg@thunisoft.com>
 * @createTime:2019-08-13,
 * @updateTime:2019-08-13
 * @copyright thunisoft fd
 * @description  *  [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 *  [jsdoc-vuejs]{@link  http://npm.taobao.org/package/jsdoc-vuejs}  -
 *  [个人博客]{@link  http://www.wuweigang.com}
 */
import unitTest1 from '@/components/app/unit-test/test1/index.vue';
import unitTest2 from '@/components/app/unit-test/test2/index.vue';
import unitTest3 from '@/components/app/unit-test/test3/index.vue';
export default {
    name: 'page-unit',
    components:{
        unitTest1,
        unitTest2,
        unitTest3
    },
    data() {
        return {name: '【页面】> 【unit】'};
    },
    methods: {}
};

