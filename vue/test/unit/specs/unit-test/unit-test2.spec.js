import Vue from 'vue';
import test2 from '@/components/app/unit-test/test2/index.vue';

describe('test2.vue', () => {
    const Constructor = Vue.extend(test2);
    let vm = null;
    // 全局前置函数
    beforeAll(() => {
        vm = new Constructor().$mount();
    });
    // 全局后置函数
    afterAll(() => {
        vm = null;
    });

    // 应该渲染正确的内容 （默认渲染内容测试）
    it('should render correct contents', () => {
        expect(vm.$el.querySelector('h1').textContent).toEqual('test2');
    });

    // 点击按钮，改变内容，应该正确渲染 （改变数据后，页面渲染内容测试）
    it('click button change message', () => {
        // 调用方法
        vm.clickChange('张三');
        // 页面渲染结束
        vm.$nextTick(() => {
            // 获取内容再次比较
            expect(vm.$el.querySelector('h1').textContent).toEqual('张三');
        });
    });
});
