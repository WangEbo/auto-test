import App from '../App.vue'
import SearchBar from '../components/SearchBar.vue'
import { mount } from '@vue/test-utils'
import { request } from '../utils/request'
import Vue from 'vue'

Vue.prototype.$request = request;

describe('测试嵌套组件相关功能',()=>{
    const wrapper = mount(App);
    const searchBar = wrapper.findComponent(SearchBar);

    it('测试子组件 搜索栏触发搜索后，父组件内容是否发生变化',async ()=>{
        //通过  setData 模拟输入搜索关键字
        await wrapper.vm.getData();
        
        console.log(wrapper.vm.showList.length);
        await searchBar.setData({
            value:'s'
        });
        const btn = searchBar.find('.search-btn');
        await btn.trigger('click');
        
        // 使用 $emit 触发事件  ，可通过 wrapper.emitted() 方法 取回事件记录  ，并验证是否有调用过
        // await searchBar.vm.$emit('search','s');
        // expect(searchBar.emitted().search).toBeTruthy()
        
        expect(wrapper.vm.showList.length).toBe(2)
    })
})

