<script>
    import {ref} from 'vue'
    export default {
        name:'App',
        // 组合api的写法
        setup(){
            //定义state
            const count=ref(0)
            // 定义methods
            const btn=(num)=>{
                count.value+=num            
            }
            return {count,btn}        
        }    
    }
</script>

<template>
    <h1>{{count}}</h1>
    <h1>6666666666666666</h1>
    <button @click="btn(1)">+1</button>
</template>

