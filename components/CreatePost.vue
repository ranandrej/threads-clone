<template>
    <div class="fixed z-50 bottom-0 h-full w-full overflow-hidden">
        <div class="bg-black h-full w-full text-white overflow-auto ">
            <div class="flex items-center justify-start py-4 max-w-[500px] flex-wrap mx-auto border-b border-b-gray-700 p-10">
                <button @click="userStore.isMenuOverlay=false" class="rounded-full px-2">
                    <i class="bi bi-x-lg text-white"></i> Close
                </button>
                <div class="font-semibold text-[16px] w-full mt-4">
                New Thread
                </div>
                <div id="Post" class="z-40 bottom-0 max-h-[100vh-200px] w-full px-3 max-w-[500px] mx-auto py-5">
                    <div class="py-2 w-full">
                        <div class="flex items-center text-white">
                            <img :src="user.id ? `https://htgwagioeyowtusrvool.supabase.co/storage/v1/object/public/threads-clone/${user.id}.png`:''" alt="" class="rounded-full h-[35px]">
                            <div class="ml-2 font-semibold text-[18px]">{{user.email}}</div>
                        </div>
                    </div>
                    <div class="relative flex items-center w-full">
                        <div class="w-[42px] mx-auto">
                            <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full"></div>
                        </div>
                        <div class="bg-black rounded-lg w-[calc(100%-50px)] text w-full font-light">
                            <div class="pt-2 text-gray-300 bg-black w-full">
                                <textarea v-model="text"
                                style="resize: none;"
                                placeholder="Write something..." 
                                id="textarea"
                                @input="adjustTextArea()"
                                class="w-full bg-black outlined-none"
                                />
                            </div>
                            <div class="w-full">
                                <div class="flex flex-col gap-2 py-1">
                                    <div v-if="fileDisplay">
                                        <img :src="fileDisplay" alt="" class="mx-auto w-full mt-2 mr-2 rounded-lg">

                                    </div>
                                    <label for="fileInput" class="text-white">
                                    <i class="bi bi-paperclip"></i>
                                    <input
                                    ref="file"
                                    type="file"
                                    id="fileInput"
                                    @input="onChange"
                                    hidden
                                    accept=".jpg,.jpeg,.png"
                                    />
                                    
                                    

                                    </label>
 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button v-if="text" @click="post" :disabled="isLoading" class="fixed bottom-0 font-bold text-lg w-full p-2 bg-black inline-block float-right p-4 border-t border-t-gray-700"
            :class="isLoading ? 'text-gray-600':'text-blue-600'"
            >
            <div v-if="!isLoading">Post</div>
            <div v-else class="flex items-center gap-2 justify-center">
                Please Wait...
            </div>
            </button>
        </div>

    </div>
</template>

<script setup>
import {v4 as uuidv4} from "uuid"
import {useUserStore} from '~/stores/user'

const userStore=useUserStore()
const supabase=useSupabaseClient()
const user=useSupabaseUser()
let text=ref(null)
let isLoading=ref(false)
const adjustTextArea=()=>{
    var textArea=document.getElementById("textarea")
    textArea.style.height="auto"
    textArea.style.height=textArea.scrollHeight + "px"

}
let file=ref(null)
let fileData=ref(null)
let fileDisplay=ref(null)
const clearData=()=>{
    text.value=null
    file.value=null
    fileDisplay.value=null
    fileData.value=null

}
const onChange=()=>{
    fileDisplay.value = URL.createObjectURL(file.value.files[0]) 
    fileData.value=file.value.files[0]
}
const post=async()=>{
    isLoading.value=true
  let{data,error}=await supabase.storage.from('threads-clone').upload(`${uuidv4()}.jpg`,fileData.value)
  const imagePath=data.path
   data  = await supabase
  .from('Posts')
  .insert([
    { user: useSupabaseUser().value, text: text.value,image:imagePath },
  ])
  .select()
  
  if (error) {
    console.log('Error', error)
  }else{
    isLoading.value=false
    clearData()
    alert('Successfully posted!')
    userStore.isMenuOverlay=false
  }

}
</script>
