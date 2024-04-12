
<script setup>
import {useUserStore} from '~/stores/user'
const userStore=useUserStore()
const user=useSupabaseUser()
</script>
<template>
    <div id="MainLayout" class="h-screen">
        <div class="w-full max-w-[500px] mx-auto">

            <p class="text-white p-2 md:text-lg text-sm m-3">Hi,{{ user.email }}</p>
        <div id="TopMenu" class="w-full flex items-center justify-center px-2 h-10 my-2">
            
           <img class="w-[35px]" src="/threads-logo.png" alt="">
        </div>
        

    </div>
    <div class="flex w-full max-w-[500px] mx-auto h-[calc(100%-150px)] overflow-auto">
    <slot/>
    </div>
    <div id="BottomNav" class="fixed z-50 bottom-0 flex w-full h-[70px] border-t border-t-gray-700 bg-black">
        <div class="flex w-full max-w-[500px] mx-auto flex items-center justify-around">
            <button @click="navigateTo('/')" class="w-full h-full text-white">
                <i class="bi bi-house-door-fill text-3xl"></i>
            </button>
            <button @click="userStore.isMenuOverlay=true" class="w-full h-full text-white">
                <i class="bi bi-pencil-square text-3xl mb-1"></i>
            </button>
            <button @click="userStore.isLogoutOverlay=true" class="w-full h-full text-white">
                <i class="bi bi-box-arrow-right text-3xl mb-1"></i>
            </button>
        </div>

    </div>
    </div>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css")
</style>