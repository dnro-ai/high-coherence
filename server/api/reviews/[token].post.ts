import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'token')
  const body = await readBody(event)

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  const { scores, comments } = body

  if (!scores) {
    throw createError({
      statusCode: 400,
      message: 'Scores are required'
    })
  }

  const supabase = serverSupabaseServiceRole(event)

  // Look up the token to get reviewee info
  const { data: reviewToken, error: tokenError } = await supabase
    .from('review_tokens')
    .select('reviewee_id, review_type, completed, expires_at')
    .eq('token', token)
    .single()

  if (tokenError || !reviewToken) {
    throw createError({
      statusCode: 404,
      message: 'Invalid review token'
    })
  }

  if (reviewToken.completed) {
    throw createError({
      statusCode: 410,
      message: 'This review has already been completed'
    })
  }

  if (new Date() > new Date(reviewToken.expires_at)) {
    throw createError({
      statusCode: 410,
      message: 'This review link has expired'
    })
  }

  // Store anonymous response
  const { error: insertError } = await supabase
    .from('review_responses')
    .insert({
      reviewee_id: reviewToken.reviewee_id,
      token_id: token,
      review_type: reviewToken.review_type,
      scores,
      comments: comments || {}
    })

  if (insertError) {
    throw createError({
      statusCode: 500,
      message: 'Failed to save review response'
    })
  }

  // Mark token as completed
  await supabase
    .from('review_tokens')
    .update({ completed: true })
    .eq('token', token)

  return {
    success: true,
    message: 'Thank you! Your anonymous feedback has been submitted.'
  }
})
