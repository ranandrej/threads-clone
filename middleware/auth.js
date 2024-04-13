export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()
  
    if (!useSupabaseUser().value) {
      return navigateTo('/login')
    }
  })