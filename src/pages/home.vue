<template>
    <div id="app">
        <search-bar @search="search"></search-bar>
        <com-list :list="showList">
            <template v-slot:listItem="{itemMsg}">
                <em>{{itemMsg.name}}</em> <span>{{itemMsg.age}}</span>
            </template>
        </com-list>
    </div>
</template>

<script>

import SearchBar from '../components/SearchBar/SearchBar'
import ComList from '../components/ComList/ComList'
import { mapState, mapMutations } from 'vuex'


export default {
    name: 'App',
    components: {
        SearchBar, ComList
    },
    computed: {
        ...mapState(['list'])
    },
    data(){
        return {
            list: [],
            showList: []
        }
    },
    created(){
        window.vm = this;
        this.getData()
    },
    methods:{
        search(str){
            this.showList = this.list.filter( item => {
                return item.name.indexOf(str) > -1 
            })
        },
        getData(){
            return this.$request({
                type:'get',
                url:'/example.json'
            }).then( res => {
                if(res.success){
                    this.list = res.data;
                    this.showList = this.list
                }
            })
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
