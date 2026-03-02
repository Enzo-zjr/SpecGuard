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
import moduleA from '@/components/app/module/a/index.vue';
const NUM_50 = 50;
export default {
    name: 'page-a',
    components: {moduleA},
    data() {
        return {
            name: '【页面】-【A】',
            dataList: new Array(NUM_50)
        };
    },
    methods: {}
};

