import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'token')

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  const supabase = serverSupabaseServiceRole(event)

  const { data: review, error } = await supabase
    .from('review_tokens')
    .select('reviewee_name, review_type, expires_at, completed')
    .eq('token', token)
    .single()

  if (error || !review) {
    throw createError({
      statusCode: 404,
      message: 'Invalid or unknown review token'
    })
  }

  // Check if expired
  if (new Date() > new Date(review.expires_at)) {
    throw createError({
      statusCode: 410,
      message: 'This review link has expired'
    })
  }

  // Check if already completed
  if (review.completed) {
    throw createError({
      statusCode: 410,
      message: 'This review has already been completed'
    })
  }

  return {
    valid: true,
    revieweeName: review.reviewee_name,
    reviewType: review.review_type,
    expiresAt: review.expires_at,
    completed: review.completed
  }
})
