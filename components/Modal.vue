<template>
    <div id="Modal" class="fixed grid place-items-center h-screen z-50 bottom-0 bg-black bg-opacity-50 backdrop-blur-md h-screen w-full">
        <div class="bg-black w-full max-w-[300px] rounded-lg text-white border border-gray-600 p-2">
            <button @click="userStore.isLogoutOverlay=false" class="flex items-center justify-between bg-black w-full p-3">
            <div>Close Modal</div>
            <i class="bi bi-x-lg text-white"></i>
            </button>
            <div class="border-b border-b-gray-700 my-1"></div>
            <button @click="logout" class="flex items-center justify-between bg-black w-full p-3">
                <div>Log Out</div>
                <i class="bi bi-box-arrow-right text-xl"></i>
            </button>
        </div>
    </div>
</template>
<script setup>
import {useUserStore} from '~/stores/user'
const userStore=useUserStore()
const user=useSupabaseUser()
const client=useSupabaseClient()

const logout=async()=>{
    const {error}=await client.auth.signOut()
    if(error) throw error
    else {
       await navigateTo('/login')
    }
}
</script>