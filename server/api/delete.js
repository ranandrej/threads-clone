// import { serverSupabaseClient } from '#supabase/server'

// export default defineEventHandler(async (event) => {
//     const supabase = await serverSupabaseClient(event)
    
//     try {
//         const query = getQuery(event)
//         const { error } = await supabase
//             .from('Posts')
//             .delete()
//             .eq('id', query.id)

//         if (error) {
//             console.error('Error deleting post:', error.message)
//             return {
//                 statusCode: 500,
//                 body: JSON.stringify({ error: 'Internal Server Error' })
//             }
//         }

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: 'Post deleted successfully' })
//         }
//     } catch (error) {
//         console.error('Error handling request:', error)
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Internal Server Error' })
//         }
//     }
// })