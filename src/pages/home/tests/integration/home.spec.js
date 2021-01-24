import { shallowMount, mount, createLocalVue } from '@vue/test-utils';//导入 测试工具的 mount方法
import SearchBar from '../../../../components/SearchBar/SearchBar.vue'
import ComList from '../../../../components/ComList/ComList.vue'
import Home from '../../home.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import { getList } from '../../../../api/getList'

const localVue = createLocalVue()//返回一个 Vue 的类供你添加组件、混入和安装插件而不会污染全局的 Vue 类。
localVue.use(Vuex)
let store, mutations;

//tips： 在实际项目中，通过会将 axios 封装 后使用，因此，如果直接使用 mock 整个 axios的方式，
//就无法使用axios 的 拦截等功能，所以这里采用 mock 对应的请求文件 在该文件下使用js.fn() 创建mock函数
//这种方式更为直观，且效果更好，还可以通过 mock 函数的 toHaveBeenCalled 匹配器

//使用方式为 在对应的 请求配置文件 下 创建 __mocks__文件夹
//并创建同名的文件，再使用jest.fn()创建的模拟函数 ，来返回需要mock的数据，能更直观的体现对应的mock请求

jest.mock('../../../../api/getList');

beforeEach(() => {
    jest.useFakeTimers()

    mutations = {
        addListItem(state, name) {
            state.list = state.list.concat(name)
        },
        delListItem(state, index) {
            state.list.splice(index, 1)
        }
    }

    store = new Vuex.Store({
        state: {
            list: []
        },
        mutations
    })
})

describe('测试主页功能', () => {

    it('检测searchbar 和 公共列表组件是否正常渲染', () => {
        const wrapper = shallowMount(Home, { store, localVue })
        const searchbar = wrapper.findComponent(SearchBar)
        const comlist = wrapper.findComponent(ComList)

        expect(searchbar.exists()).toBeTruthy();
        expect(comlist.exists()).toBeTruthy();
    })

    it(`测试初次请求之后数据是否正常显示，有数据时，list组件是否正常渲染，无数据元素未展示`, async () => {
        const wrapper = mount(Home, { store, localVue });
        await wrapper.vm.$nextTick();

        //测试 mock请求 方法是否实际调用了
        expect(getList).toHaveBeenCalled()

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

    it('测试进入界面后，搜索是否生效，清空后，数据是否恢复所有', async () => {
        const wrapper = mount(Home, { store, localVue });
        await wrapper.vm.$nextTick();
        let lis = wrapper.findAll('.list-item');
        expect(lis.length).toBe(3);

        const input = wrapper.find('.search-input');
        const searchBtn = wrapper.find('.search-btn');
        const clearIcon = wrapper.find('.clear-icon');

        await input.setValue('d');
        await searchBtn.trigger('click');

        let showLis = wrapper.findAll('.list-item');
        expect(showLis.length).toBe(1);

        await clearIcon.trigger('click');
        expect(lis.length).toBe(3);
    })
})

