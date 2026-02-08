import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const { data: sections, error: sectionsError } = await supabase
    .from('assessment_sections')
    .select('*')
    .order('sort_order')

  if (sectionsError) {
    throw createError({ statusCode: 500, message: sectionsError.message })
  }

  const { data: questions, error: questionsError } = await supabase
    .from('assessment_questions')
    .select('*')
    .order('sort_order')

  if (questionsError) {
    throw createError({ statusCode: 500, message: questionsError.message })
  }

  // Group questions by section, matching the frontend Section interface
  return sections.map(section => ({
    id: section.id,
    title: section.title,
    subtitle: section.subtitle,
    questions: questions
      .filter(q => q.section_id === section.id)
      .map(q => ({
        id: q.id,
        text: q.text,
        type: q.type,
        ...(q.options ? { options: q.options } : {})
      }))
  }))
})
