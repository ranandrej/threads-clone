<template>
    <div id="AuthPage" class="w-full h-[100vh] h-screen pt-32">
        <div class="w-full">
            <div class="w-full flex items-center justify-center gap-2.5 p-2">
              <img src="/threads-logo.png" alt="" class="w-[35px]">
              <span class="font-bold text-2xl text-white">Threads</span>
            </div>
            <div class="max-w-[350px] mx-auto px-2 text-white">
                <div class="text-center mb-6 mt-4">Login / Register</div>
                <button @click="signInWithOAuth" class="flex items-center justify-center gap-3 p-1.5 w-full border rounded-full text-lg font-semibold">
                    <div class="flex items-center gap-2 justify-center">
                        <img src="/github-logo.png" alt="" class="w-full max-w-[30px] rounded-full">
                        Github
                    </div>
                </button>
                <div class="w-full flex flex-wrap justify-start p-3">
                   <input type="email" placeholder="E-mail..." class="w-full p-2 rounded-full my-2 border-gray-500 border-2 bg-black" v-model="email">
                   <input type="password" placeholder="Password" class="w-full p-2 rounded-full my-2 border-gray-500 border-2 bg-black" v-model="password">

                </div>
                <button @click="signInWithMail" class="flex mt-3 items-center justify-center gap-3 p-1.5 w-full border rounded-full text-lg font-semibold">
                    <div class="flex items-center gap-2 justify-center">
                        
                        Login with E-mail
                    </div>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
const user=useSupabaseUser()


const supabase = useSupabaseClient()
const email=ref('')
const password=ref('')

  
 

const signInWithMail=async()=>{
    let { data, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value
})
if (error) throw error
console.log(data)
navigateTo('/')
}

</script>