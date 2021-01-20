import { shallowMount } from '@vue/test-utils';//导入 测试工具的 mount方法
import ComList from '../../ComList.vue'

describe('测试ComList组件初始化 是否正常',()=>{
    //挂载组件，被挂载的组件会返回到 包裹器内，包裹器会暴露很多封装，遍历和查询其
    //内部Vue组件示例的 便捷方法

    it('测试初始化之后搜索框值是否为空',()=>{
        const wrapper = shallowMount(ComList,{
            propsData:{
                list:[]
            }
        })
        const lis = wrapper.findAll('.list-item');
        expect(lis.length).toBe(0);
        const noDataEle = wrapper.find('.no-data');
        expect(noDataEle.isVisible()).toBeTruthy();
    })

    it('测试有数据的时候是否正常渲染',async()=>{
        const wrapper = shallowMount(ComList,{
            propsData:{
                list:[
                    {
                        name: 'ebo',
                        age: 25
                    },
                    {
                        name: 'qb',
                        age: 24
                    }
                ]
            },
            scopedSlots:{
                listItem(props){
                    let itemMsg = props.itemMsg;
                    return this.$createElement('p',`${itemMsg.name}----${itemMsg.age}`)
                }
            }
        })
        await wrapper.vm.$nextTick()
        const lis = wrapper.findAll('.list-item');
        expect(lis.length).toBe(2)
        expect(wrapper.text()).toContain('ebo')
        expect(wrapper.text()).toContain('24')
    })
})