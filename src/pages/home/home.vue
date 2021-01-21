<template>
    <div class="home">
        <search-bar @search="search" @input="searchInput" @clear="inputClear"></search-bar>
        <com-list :list="showList">
            <template v-slot:listItem="{itemMsg}">
                <span>{{itemMsg.name}}</span> <span>{{itemMsg.age}}</span>
            </template>
        </com-list>
        <div class="footer"><button @click="add">添加</button></div>
    </div>
</template>

<script>

import SearchBar from '../../components/SearchBar/SearchBar'
import ComList from '../../components/ComList/ComList'
import { mapState, mapMutations } from 'vuex'
import { getList } from '../../api/getList'

export default {
    name: 'Home',
    components: {
        SearchBar, ComList
    },
    computed:{
        ...mapState(['list']),
    },
    data(){
        return {
            keyword: '',
            showList:[]
        }
    },
    created(){
        this.getData()
    },
    methods:{
        ...mapMutations(['addListItem', 'minusListItem']),
        search(str){
            this.computedShowList();
        },
        computedShowList(){
            this.showList = this.list.filter( item => {
                return item.name && item.name.indexOf(this.keyword) > -1 
            })
        },
        getData(){
            getList().then(res=>{
                let data = res.data;
                if(data.success){
                    this.addListItem(data.data.rows)
                    this.computedShowList()
                }
            })
        },
        searchInput(val){
            this.keyword = val
        },
        inputClear(val){
            this.computedShowList();
        },
        add(){
            let obj = {
                name: 'name' + (this.list.length+1),
                age: 20 + this.list.length
            }
            this.addListItem([obj]);
            this.computedShowList();
        }
    }
}
</script>

<style lang="less">
    .home{
        .com-list{
            li{
                display: flex;
                justify-content: start;
                border-bottom: 1px solid #f5f5f5;
                padding: 10px;
                span{
                    text-align: left;
                    display: inline-block;
                    width: 100px;
                    &:nth-child(1){
                        font-weight: 600;
                    }
                }
            }
        }
        .footer{
            margin-top: 10px;
            button{
                width: 100%;
                line-height: 32px;
            }
        }
    }
</style>
