import Vue from 'vue';
import Router from 'vue-router';
import pageA from '@/pages/page-a/index.vue';
import pageB from '@/pages/page-b/index.vue';
import pageUnit from '@/pages/page-unit/index.vue';
import pageDemo from '../pages/page-demo/index.vue';
// 测试界面
const pageTest = {template: '<h1>测试页面</h1>'};
// 使用路由
Vue.use(Router);
// 解决多次点击重复路由报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location)
        .catch(err => err);
};
// 导出路由模块
export default new Router({
    mode: 'history',
    base: '',
    routes: [
        {
            path: '/',
            redirect: '/a'
        },
        {
            path: '/a',
            name: 'pageA',
            component: pageA
        },
        {
            path: '/b',
            name: 'pageB',
            component: pageB
        },
        {
            path: '/unit',
            name: 'pageUnit',
            component: pageUnit
        },
        {
            path: '/test',
            name: 'pageTest',
            component: pageTest
        },
        {
            path: '/demo',
            name: 'demo',
            component: pageDemo
        }
    ]
});
