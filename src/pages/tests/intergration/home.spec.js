import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Home from '../../home.vue'
import SearchBar from '../../../components/SearchBar/SearchBar.vue'
import ComList from '../../../components/ComList/ComList.vue'
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue()//createLocalVue 返回一个 Vue 的类供你添加组件、混入和安装插件而不会污染全局的 Vue 类。
localVue.use(Vuex)
let store, mutations

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

describe('主页渲染及功能', () => {
    it('检查是否有 searchBar 和 comlist 组件是否正常渲染', () => {
        const wrapper = shallowMount(Home, { store, localVue })

        const searchBar = wrapper.find(SearchBar)
        const comlist = wrapper.find(ComList)

        // 判断组件是否存在
        expect(searchBar.exists()).toBeTruthy()
        expect(comlist.exists()).toBeTruthy()
    })

    it(`
    1. 用户进入界面请求数据
    2. 将数据存储在vuex中
    3. 页面展示数据
  `, (done) => {
        const wrapper = mount(Home, { store, localVue })
        wrapper.vm.$nextTick(() => {
            let items = wrapper.findAll('.list-item')
            expect(items.length).toBe(3)

            
            done()
        })
    })
})

