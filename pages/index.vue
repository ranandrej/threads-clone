<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import {useUserStore} from '~/stores/user'
import axios from "axios"
const userStore = useUserStore()
let posts=ref([])
let isPosts=ref(true)
let isLoading=ref(false)
definePageMeta({
  middleware: 'auth'
})
  // posts.value=[
  //   {
  //     name:'John Weeks Dev',
  //     image:'https://placehold.co/100',
  //     text:'This is the title',
  //     picture:'https://placehold.co/500'
  //   }
  // ]
  onMounted(async()=>{
    axios.get('/api/all').then((res)=>{
      posts.value=res.data
    })

  })
  const removePost=(id)=>{
    const index=posts.value.findIndex(p=>p.id==id)
    posts.value.splice(index,1)
  }

</script>

<template>
    
    <MainLayout>
      
      <div id="IndexPage" class="w-full overflow-auto py-6">
        
       <div class="mx-auto max-w-[500px] overflow-hidden">
        <div id="Posts" class="px-4 max-w-[600px] mx-auto">
          <div class="text-white text-3xl" v-if="isPosts" v-for="post in posts" :key="post">
            
          <Post :post="post" @isDeleted="removePost(post.id)"/>
          </div>
         
        </div>
       </div>
      </div>
    </MainLayout>
    
</template>