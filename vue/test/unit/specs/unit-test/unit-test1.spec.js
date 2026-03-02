import Vue from 'vue';
import test1 from '@/components/app/unit-test/test1/index.vue';

describe('test1.vue', () => {
    // 应该渲染正确的内容
    it('should render correct contents', () => {
        const Constructor = Vue.extend(test1);
        // 挂载页面
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('h1').textContent).toEqual('test1');
    });
});
