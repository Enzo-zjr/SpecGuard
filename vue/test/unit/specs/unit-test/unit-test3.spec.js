import Vue from 'vue';
import test3 from '@/components/app/unit-test/test3/index.vue';

describe('test3.vue', () => {
    const Constructor = Vue.extend(test3);
    let vm = null;
    // 全局前置函数，创建vm对象
    beforeAll(() => {
        vm = new Constructor().$mount();
    });
    // 全局后置函数，销毁vm对象
    afterAll(() => {
        vm = null;
    });
    // 应该渲染正确的内容 （【1】默认渲染内容测试）
    it('should render correct contents', () => {
        expect(vm.$el.querySelector('h1').textContent).toEqual('异步获取数据');
    });

    // props 对象传参，改变默认值测试 （【2】props传参，默认渲染内容测试）
    it('props test  = "王五"， p 王五', () => {
        vm._props.test = '王五';
        vm.$nextTick(() => {
            expect(vm.$el.querySelector('#jsP').textContent).toEqual('王五');
        });
    });


    // 原始数据长度为0 （【3】原始数据，数据检测测试）
    it('原始数据长度为0', () => {
        expect(vm.data.length).toBe(0);
    });

    // requestData （【4】原始数据，数据检测测试）
    it('async request  data', async (done) => {
        const _data = await vm.requestData();
        expect(_data.length).toEqual(2);
        done();
    });

    // clickGetData （【5】异步获取数据，数据检测测试）
    it('clickGetData  method', async (done) => {
        await vm.clickGetData();
        expect(vm.data.length).toEqual(2);
        done();
    });
});
