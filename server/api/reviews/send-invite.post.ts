import { sendReviewInvite } from '../../utils/resend'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    recipientEmail,
    revieweeId,
    revieweeName,
    reviewType
  } = body

  if (!recipientEmail || !revieweeId || !revieweeName || !reviewType) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  const supabase = serverSupabaseServiceRole(event)

  // Insert token into database (token is auto-generated UUID by default)
  const { data: tokenRow, error } = await supabase
    .from('review_tokens')
    .insert({
      reviewee_id: revieweeId,
      reviewee_name: revieweeName,
      review_type: reviewType,
      recipient_email: recipientEmail,
      expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days
    })
    .select('token')
    .single()

  if (error || !tokenRow) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create review token'
    })
  }

  // Send email via Resend
  const result = await sendReviewInvite(
    recipientEmail,
    revieweeName,
    tokenRow.token,
    reviewType
  )

  if (!result.success) {
    throw createError({
      statusCode: 500,
      message: 'Failed to send review invite email'
    })
  }

  return {
    success: true,
    message: 'Review invite sent successfully',
    token: tokenRow.token
  }
})
