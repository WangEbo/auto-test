import { shallowMount, mount, createLocalVue } from '@vue/test-utils';//导入 测试工具的 mount方法
import Home from '../../home.vue'
import SearchBar from '../../../../components/SearchBar/SearchBar.vue'
import ComList from '../../../../components/ComList/ComList.vue'
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue()//返回一个 Vue 的类供你添加组件、混入和安装插件而不会污染全局的 Vue 类。
localVue.use(Vuex)
let store, mutations;

beforeEach(()=>{
    jest.useFakeTimers()

    mutations = {
        addListItem(state, name){
            state.list = state.list.concat(name)
        },
        delListItem(state, index){
            state.list.splice(index, 1)
        }
    }

    store = new Vuex.Store({
        state:{
            list: []
        },
        mutations
    })
})

describe('测试主页功能',()=>{

    it('检测searchbar 和 公共列表组件是否正常渲染',()=>{
        const wrapper = shallowMount(Home, {store, localVue})
        const searchbar = wrapper.findComponent(SearchBar)
        const comlist = wrapper.findComponent(ComList)

        expect(searchbar.exists()).toBeTruthy();
        expect(comlist.exists()).toBeTruthy();
    })

    it(`测试初次请求之后数据是否正常显示，有数据时，list组件是否正常渲染，无数据元素未展示`, async()=>{
        const wrapper = mount(Home, {store, localVue});
        await wrapper.vm.$nextTick();
        let lis = wrapper.findAll('.list-item');
        expect(lis.length).toBe(3);
        expect(wrapper.text()).toContain('dam');

        expect(wrapper.vm.showList.length).toBe(3);

        const searchbar = wrapper.findComponent(SearchBar)
        const comlist = wrapper.findComponent(ComList)
        expect(comlist.vm.list.length).toBe(3);

        // expect(wrapper.text()).not.toContain('暂无数据');
        const noDataEle = wrapper.findAll('.no-data');
        expect(noDataEle.isVisible()).toBeFalsy();

    })

    it('测试进入界面后，搜索是否生效，清空后，数据是否恢复所有',async ()=>{
        const wrapper = mount(Home, {store, localVue});
        await wrapper.vm.$nextTick();
        let lis = wrapper.findAll('.list-item');
        expect(lis.length).toBe(3);
        expect(wrapper.text()).toContain('dam');

        const input = wrapper.find('.search-input');
        
        input.setValue('d');
        await wrapper.vm.$nextTick();
        let showLis = wrapper.findAll('.list-item');
        expect(showLis.length).toBe(1);
        expect(showLis.at(0).text()).toContain('dam')
    })
})

