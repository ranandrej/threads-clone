import { serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async(event) => {
  const client = await serverSupabaseClient(event)
 let { data, error } = await client
  .from('Posts')
  .select('*')
  .order('id', { ascending: false })
  if(error) throw error

  return data
})