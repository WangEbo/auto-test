<template>
    <div class="com-list">
        <ul>
            <li class="list-item" v-for="(item,i) in list" :key="i">
                <slot name="listItem" :itemMsg="item"></slot>
               <!-- <span class="clear-icon" @click="delItem">x</span> -->
            </li>
            <li class="no-data" v-show="!list.length">暂无数据</li>
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
                position: relative;
                .clear-icon{
                    position: absolute;
                    right: 55px;
                    top: 8px;
                    width: 16px;
                    height: 16px;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    background-color: #ccc;
                    color: #f7f7f7;
                    border-radius: 50%;
                }
            }
        }
    }
</style>