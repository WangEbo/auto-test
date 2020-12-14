<template>
    <div class="search-bar">
        <input ref="input" :class="['search-input',isFocus ? 'focus' : '']" @mouseover="isFocus = true" @blur="isFocus = false" placeholder="输入搜索" type="text" v-model="value">
        <button v-show="isFocus" class="search-btn" @click="search">搜索</button>
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
    methods:{
        search(){
            this.$emit('search',this.value)
        },
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
        input.search-input{
            width: 100%;
            box-sizing: border-box;
            padding: 0 10px;
            &.focus{
                width: calc(100% - 60px);
            }
            border: 0;
            outline: 0;
        }
    }
</style>