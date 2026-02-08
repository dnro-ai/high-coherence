import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)

  if (!body.answers || typeof body.answers !== 'object') {
    throw createError({ statusCode: 400, message: 'Invalid answers payload' })
  }

  const supabase = await serverSupabaseClient(event)

  const { error } = await supabase
    .from('assessment_responses')
    .insert({
      user_id: user.id,
      answers: body.answers,
      completed_at: new Date().toISOString()
    })

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return { success: true }
})
