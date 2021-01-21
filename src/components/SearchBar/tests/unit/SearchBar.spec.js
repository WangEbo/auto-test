import { mount } from '@vue/test-utils';//导入 测试工具的 mount方法
import SearchBar from '../../SearchBar.vue'

describe('测试searchBar组件初始化 是否正常',()=>{
    //挂载组件，被挂载的组件会返回到 包裹器内，包裹器会暴露很多封装，遍历和查询其
    //内部Vue组件示例的 便捷方法
    const wrapper = mount(SearchBar);

    //可以通过  wrapper.vm   来访问Vue示例
    let searchBtn = wrapper.find('.search-btn');
    let input = wrapper.find('.search-input');
    let clearIcon = wrapper.find('.clear-icon');

    it('测试初始化之后搜索框值是否为空',()=>{
        expect(wrapper.vm.value).toEqual('');
        expect(input.text()).toBe('');
    })

    it('测试没有值的时候清除按钮是否为非展示状态',()=>{
        let clearIcon = wrapper.find('.clear-icon');
        expect(clearIcon.element.style.display).toBe('none');
    })

    it('测试输入值后,searchBar的value 变为输入值，clearIcon 显示，并在点击之后值清空,clearnIcon恢复隐藏',async()=>{
        await input.setValue('s');//setValue 返回一个 promise 对象，该Promise对象在 resolve 后会保证 组件已更新

        expect(wrapper.vm.hasVal).toBeTruthy();
        expect(clearIcon.isVisible()).toBeTruthy();
        expect(wrapper.vm.value).toBe('s');
        //trigger 模拟触发事件会返回一个 promise 对象，该Promise对象在 resolve 后会保证 组件已更新
        await clearIcon.trigger('click');

        expect(wrapper.vm.hasVal).toBeFalsy();
        expect(clearIcon.isVisible()).toBeFalsy(); 
    })

})