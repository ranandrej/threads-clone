// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages:true,
  devtools: { enabled: false },
  modules:['@nuxtjs/tailwindcss','@pinia/nuxt','@nuxtjs/supabase'],
  runtimeConfig:{
    public:{
      bucketUrl:process.env.BUCKET_URL
    }
  },
  supabase: {
    // Options
    redirect:false
    
  }

})
