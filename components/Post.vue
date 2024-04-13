<script setup>
import {useUserStore} from '~/stores/user'
import axios from 'axios'
const userStore=useUserStore()
const supabase=useSupabaseClient()
const runtimeConfig = useRuntimeConfig()
let isMenu=ref(false)
let isLike=ref(false)
let isDeleting=ref(false)
let show=ref(false)

const emit=defineEmits(['isDeleted'])
const props=defineProps(['post'])
const post=props.post
console.log(props)
onMounted(()=>{
      if(useSupabaseUser().value){

      
      if(useSupabaseUser().value.id==post.user.id){
        show.value=true
      }else{
        show.value=false
      }
    }
})
const deletePost=async(id)=>{
  isDeleting.value=true
   await axios.get(`/api/delete?id=${id}`).then((res)=>{
    emit('isDeleted')
    alert('Successfuly deleted post!')
    isDeleting.value=false
   })
}
const likePost=async(id)=>{

  const { data, error } = await supabase
  .from('Posts')
  .update({ likes: post.likes+1 })
  .eq('id', id)
  .select()
  isLike.value=true
  post.likes=post.likes+1

  setTimeout(()=>{
    isLike.value=false
  },5000)
}


</script>

<template>
<div class="z-50 bottom-0 h-full w-full">
    <div class="py-2 w-full">
        <div class="flex items-center justify-between">
            <div class="flex items-center text-white">
             <img alt="" class="rounded-full h-[35px]" :src="`https://htgwagioeyowtusrvool.supabase.co/storage/v1/object/public/threads-clone/${post.user.id}.png`">
             <div class="ml-2 font-semibold text-[18px]">{{ post.user.email }}</div>
            </div>
            <div @click="isMenu=!isMenu" class="relative">
              <button v-if="show" :disabled="isDeleting"
              class="flex items-center text-white p-1 h-[24px] hover:bg-gray-800 rounded-full cursor-pointer"
              :class="isMenu ? 'bg-gray-800':''">
              <svg v-if="isDeleting" aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-red-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <i v-if="!isDeleting" class="bi bi-three-dots text-2xl text-white"></i>
              </button>
              <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded">
                <button @click="deletePost(post.id)" class="flex items-center rounded gap-2 text-red-500 text-sm justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900">
                <div>Delete</div>
                <i class="bi bi-trash-fill"></i>
                </button>
              </div>
              
            </div>
        </div>
        <div class="relative flex items-center w-full">
            <div class="w-[42px] mx-auto">
                <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full"></div>
            </div>
            <div class="bg-black rounded-lg w-[calc(100%-50px)] text-sm w-full font-light">
              <div class="py-2 text-gray-300">
                {{ post.text }}
              </div>
              <img v-if="post && post.image" :src="`https://htgwagioeyowtusrvool.supabase.co/storage/v1/object/public/threads-clone/${post.image}`" alt="" class="mx-auto w-full mt-2 pr-2 rounded">
              <div class="absolute mt-2 w-full ml-2">
                  <button @click="likePost(post.id)" :disabled="isLike" class="flex items-center gap-1">
                    <i class="bi bi-heart-fill p-1 hover:bg-gray-800 rounded-full cursor-pointer" :class="isLike ? `text-red-500`:`text-white`"></i>
                  </button>
                  <div class="relative text-sm text-gray-500">
                    <div>
                        <span>{{ post.likes }}</span>
                        likes
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
    <div class="relative inline-block text-gray-500 pt-1 pb-1.5">
        <div class="flex items-center">
            <div class="flex items-center flex-wrap text-white gap-1 w-[42px]">
                <div class="flex gap-0.5">
                    <img src="https://picsum.photos/id/202/50" alt="" class="rounded-full h-[14px] mt-2">
                    <img src="https://picsum.photos/id/223/50" alt="" class="rounded-full h-[17px]">
                </div>
                <div class="flex items-center">
                    <img src="https://picsum.photos/id/99/50" alt="" class="rounded-full h-[11px] ml-4">

                </div>
            </div>
        </div>

    </div>
  <div class="h-[1px] bg-gray-800 w-full mt-3"></div>
</div>

</template>