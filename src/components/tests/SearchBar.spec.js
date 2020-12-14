import { mount } from '@vue/test-utils';//导入 测试工具的 mount方法
import SearchBar from '../SearchBar.vue'

describe('测试searchBar组件初始化 是否正常',()=>{
    //挂载组件，被挂载的组件会返回到 包裹器内，包裹器会暴露很多封装，遍历和查询其
    //内部Vue组件示例的 便捷方法
    const warpper = mount(SearchBar);
    //可以通过  wrapper.vm   来访问Vue示例
    let searchBtn = warpper.find('.search-btn');

    it('测试初始化之后搜索框值是否为空',()=>{
        expect(warpper.vm.value).toEqual('');
    })
    
    it('测试初始化后 isFocus是否为false', ()=>{
        expect(warpper.vm.isFocus).toBe(false)
    })

    it('测试初始化后 dom元素中是否生成搜索按钮但未显示', ()=>{
        expect(searchBtn.element.style.display).toBe('none');
    })

    //focus事件貌似触发不了
    // it('测试聚焦搜索框后 搜索按钮显示',(done)=>{
    //     let input = warpper.find('.search-input');
    //     input.element.foucs();
        
    //     return Vue.nextTick().then(()=>{
    //         expect(input.classes()).toContain('focus');
    //         expect(searchBtn.element.style.display).toBe('block')
    //     })
    // })

    // it('测试点击增加 是否生效',async ()=>{
    //     let btn = warpper.find('.add');
    //     //trigger 模拟触发事件会返回一个 promise 对象，该Promise对象在 resolve 后会保证 组件已更新
    //     await btn.trigger('click');
    //     expect(warpper.vm.count).toBe(1)
    // })
})