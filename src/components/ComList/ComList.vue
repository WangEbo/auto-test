<template>
    <div class="com-list">
        <ul>
            <li v-for="(item,i) in list" :key="i">
                <slot name="listItem" :itemMsg="item"></slot>
            </li>
            <li v-if="!list.length">暂无数据</li>
        </ul>
    </div>
</template>

<script>

export default {
    name:'com-list',
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style lang="less">
    .com-list{
        ul,li{
            list-style: none;
        }
        ul{
            padding: 5px 10px;
            li{
                padding: 0;
            }
        }
    }
</style>