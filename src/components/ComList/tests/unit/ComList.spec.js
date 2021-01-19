import { shallowMount } from '@vue/test-utils';//导入 测试工具的 mount方法
import ComList from '../../ComList.vue'
import { log } from 'util';

describe('测试 ComList 组件初始化 是否正常',()=>{
    //挂载组件，被挂载的组件会返回到 包裹器内，包裹器会暴露很多封装，遍历和查询其
    //内部Vue组件示例的 便捷方法

    it('测试初始化无数据是否显示了暂无数据',()=>{
        const wrapper = shallowMount(ComList,{
            propsData: {
                list: []
            },
        });
        let lis = wrapper.findAll('.list-item');
        let noDataEle = wrapper.find('.no-data');
        expect(lis.length).toBe(0);
        expect(noDataEle.isVisible()).toBeTruthy();
    })

    it('测试传入数据是否正常展示数据',()=>{
        const wrapper = shallowMount(ComList,{
            propsData: {
                list: [
                    {
                        name:'ebo',
                        age: 25
                    },
                    {
                        name:'yy',
                        age: 24
                    },
                ]
            },
            //为组件提供作用域插槽，函数将 prop 作为参数带入
            scopedSlots: {
                listItem(props){ // props:{ itemMsg: { name: 'ebo', age: 25 } }
                    console.log(props)
                    return this.$createElement('p', props.itemMsg.name + '---' + props.itemMsg.age)
                }
            },
        });
        let lis = wrapper.findAll('.list-item');
        let noDataEle = wrapper.find('.no-data');
        expect(lis.length).toBe(2);
        expect(noDataEle.isVisible()).toBeFalsy();
        expect(wrapper.text()).toContain('ebo')
        expect(wrapper.text()).toContain('25')
    })

})