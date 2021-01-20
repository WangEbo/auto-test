import { mount } from '@vue/test-utils';//导入 测试工具的 mount方法
import SearchBar from '../../SearchBar.vue'

describe('测试searchBar组件初始化 是否正常',()=>{
    //挂载组件，被挂载的组件会返回到 包裹器内，包裹器会暴露很多封装，遍历和查询其
    //内部Vue组件示例的 便捷方法
    const warpper = mount(SearchBar);
    //可以通过  wrapper.vm   来访问Vue示例
    let searchBtn = warpper.find('.search-btn');

    it('测试初始化之后搜索框值是否为空',()=>{
        expect(warpper.vm.value).toEqual('');
    })


})