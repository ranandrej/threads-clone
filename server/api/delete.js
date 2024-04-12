import { serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async(event) => {
    const supabase = await serverSupabaseClient(event)

    const query=getQuery(event)
    const { error } = await supabase
    .from('Posts')
    .delete()
    .eq('id', query.id)
})