<template>
    <div class="default-list">
        <ul>
            <li v-for="(item,i) in list" :key="i">
                <slot name="listItem" :itemMsg="item"></slot>
            </li>
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

<style>

</style>