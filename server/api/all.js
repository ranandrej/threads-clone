import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabaseClient = await serverSupabaseClient(event)

    try {
        const { data, error } = await supabaseClient
            .from('Posts')
            .select('*')
            .order('id', { ascending: false })

        if (error) {
            throw error
        }

        return data
    } catch (error) {
        console.error('Error fetching posts:', error.message)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        }
    }
})
