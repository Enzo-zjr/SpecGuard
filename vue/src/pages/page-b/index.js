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
const NUM_2000 = 2000;
export default {
    name: 'page-b',
    data() {
        return {name: '【页面】> 【B】'};
    },
    methods: {
        clickAlertSimple() {
            this.$Alert.alert('您确定删除吗');
        },
        clickAlert() {
            this.$Alert.alert({
                width: 300,
                height: 180,
                zIndex: 90,
                modal: true,
                title: '删除提示框',
                content: '您确定删除吗',
                confirm:{
                    show: true,
                    text: '确认',
                    callback() {
                        window.console.log('点击了确定');
                    }
                }
            });
        },
        clickPrompt() {
            this.$Alert.prompt({
                width: 300,
                height: 200,
                zIndex: 90,
                modal: true,
                title: '修改值',
                content: '请输入修改值',
                value: '默认值',
                confirm:{
                    show: true,
                    text: '确认',
                    callback(value) {
                        window.console.log('点击了确定');
                        window.console.log(`值是${value}`);
                    }
                },
                cancle:{
                    show: true,
                    text: '取消',
                    callback() {
                        window.console.log('点击了取消');
                    }
                }
            });
        },
        clickConfirm() {
            this.$Alert.confirm({
                width: 300,
                height: 180,
                zIndex: 90,
                modal: true,
                title: 'confirm',
                content: '您想好了么？',
                confirm:{
                    show: true,
                    text: '确认',
                    callback() {
                        window.console.log('点击了确定');
                    }
                },
                cancle:{
                    show: true,
                    text: '取消',
                    callback() {
                        window.console.log('点击了取消');
                    }
                }
            });
        },
        clickInfo() {
            this.$Message.info('information');
        },
        clickSuccess() {
            this.$Message.success('success');
        },
        clickWarning() {
            this.$Message.warning('warning');
        },
        clickError() {
            this.$Message.error('error');
        },
        clickLoading() {
            this.$Message.loading('loading...');
        },

        clickAjaxStart() {
            this.$AjaxLoading.start();
            // 2秒后结束
            setTimeout(() => {
                this.clickAjaxFinish();
            }, NUM_2000);
        },
        clickAjaxFinish() {
            this.$AjaxLoading.finish();
        }
    }
};

