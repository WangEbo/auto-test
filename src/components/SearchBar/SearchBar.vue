<template>
    <div :class="['search-bar',isFocus ? 'focus' : '']">
        <input ref="input" :class="['search-input',isFocus ? 'focus' : '']" @focus="isFocus=true" @blur="isFocus=false" 
            placeholder="输入搜索" type="text" v-model="value">
        <span v-show="hasVal" class="clear-icon" @click="clear">x</span>
        <button class="search-btn" @click="search">搜索</button>
    </div>
</template>

<script>

export default {
    name:'search-bar',
    data(){
        return {
            value:'',
            isFocus:false
        }
    },
    mounted() {
        
    },
    computed:{
        hasVal(){
            return this.value.length
        }
    },
    methods:{
        search(){
            this.$emit('search',this.value)
        },
        clear(){
            this.value = ''
        }
    }
}
</script>

<style lang="less">
    .search-bar{
        width: 100%;
        line-height: 32px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        position: relative;
        &.focus{
            border-color: darkgoldenrod;
        }
        input.search-input{
            width: calc(100% - 50px);
            box-sizing: border-box;
            padding: 0 10px;
            height: 100%;
            line-height: 32px;
            border: 0;
            outline: 0;
        }
        .search-btn{
            width: 50px;
            outline: 0;
            border: 0;
            background: cornflowerblue;
            height: 100%;
            line-height: 32px;
            &:focus{
                outline-color: #5c82c4;
                outline-width: 1px;
                outline-style: auto;
            }
        }
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
</style>