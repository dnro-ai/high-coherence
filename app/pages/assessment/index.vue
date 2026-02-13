<script setup lang="ts">
// CRATE COHERE Assessment v2.0
// 48 Questions | ~15 minutes | Loaded from database

interface MultipleChoiceQuestion {
  id: number
  text: string
  type: 'multiple-choice'
  options: { value: string; label: string }[]
}

interface RatingQuestion {
  id: number
  text: string
  type: 'rating'
}

type Question = MultipleChoiceQuestion | RatingQuestion

interface Section {
  id: string
  title: string
  subtitle: string
  questions: Question[]
}

const { data: sections, status: fetchStatus } = await useFetch<Section[]>('/api/assessment/questions')

const totalQuestions = computed(() =>
  sections.value?.reduce((sum, s) => sum + s.questions.length, 0) ?? 0
)
const currentSectionIndex = ref(0)
const currentQuestionIndex = ref(0)
const answers = ref<Record<number, string | number>>({})
const isStarted = ref(false)
const isCompleted = ref(false)
const submitting = ref(false)

const currentSection = computed(() => sections.value?.[currentSectionIndex.value])
const currentQuestion = computed(() => currentSection.value?.questions[currentQuestionIndex.value])

const answeredCount = computed(() => Object.keys(answers.value).length)
const progress = computed(() => totalQuestions.value > 0 ? Math.round((answeredCount.value / totalQuestions.value) * 100) : 0)

const ratingOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
]

const selectAnswer = (value: string | number) => {
  if (!currentQuestion.value || !currentSection.value || !sections.value) return
  answers.value[currentQuestion.value.id] = value

  // Auto-advance after a brief delay
  setTimeout(async () => {
    if (!currentSection.value || !sections.value) return
    if (currentQuestionIndex.value < currentSection.value.questions.length - 1) {
      currentQuestionIndex.value++
    } else if (currentSectionIndex.value < sections.value.length - 1) {
      currentSectionIndex.value++
      currentQuestionIndex.value = 0
    } else {
      // Assessment complete - submit answers
      submitting.value = true
      try {
        await $fetch('/api/assessment/submit', {
          method: 'POST',
          body: { answers: answers.value }
        })
      } catch {
        // Still show completion even if save fails (answers are local)
      } finally {
        submitting.value = false
        isCompleted.value = true
      }
    }
  }, 300)
}

const goToPrevious = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  } else if (currentSectionIndex.value > 0 && sections.value) {
    currentSectionIndex.value--
    currentQuestionIndex.value = sections.value[currentSectionIndex.value].questions.length - 1
  }
}

const canGoBack = computed(() => {
  return currentSectionIndex.value > 0 || currentQuestionIndex.value > 0
})

const getCurrentAnswer = computed(() => {
  if (!currentQuestion.value) return undefined
  return answers.value[currentQuestion.value.id]
})

// Calculate overall question number
const overallQuestionNumber = computed(() => {
  if (!sections.value) return 1
  let count = 0
  for (let i = 0; i < currentSectionIndex.value; i++) {
    count += sections.value[i].questions.length
  }
  return count + currentQuestionIndex.value + 1
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-4xl font-semibold text-white dark:drop-shadow-lg" style="font-family: 'Saol Display', serif;">CRATE COHERE Assessment</h1>
      <p class="text-white/70 mt-1">48 Questions | ~15 minutes</p>
    </div>

    <!-- Loading State -->
    <div v-if="fetchStatus === 'pending'" class="glass p-8 text-center py-12">
      <UIcon name="i-lucide-loader-2" class="size-10 text-cyan-400 animate-spin mx-auto mb-4" />
      <p class="text-white/70">Loading assessment questions...</p>
    </div>

    <!-- Assessment Container -->
    <div v-else-if="sections" class="glass p-8">
      <!-- Not Started State -->
      <div v-if="!isStarted && !isCompleted" class="text-center py-12 max-w-2xl mx-auto">
        <div class="size-20 mx-auto rounded-2xl bg-[#5be8ff] dark:bg-gradient-to-br dark:from-cyan-500 dark:to-teal-500 flex items-center justify-center mb-6 glow-cyan">
          <UIcon name="i-lucide-brain" class="size-10 text-[#041d2a] dark:text-white" />
        </div>
        <h2 class="text-2xl font-bold text-white mb-4">Initial Assessment Questionnaire</h2>
        <p class="text-white/70 mb-6">
          This questionnaire helps us understand how you naturally navigate the world. There are no right or wrong answers. Choose what feels most true for you, not what you think you should say.
        </p>
        <p class="text-white/60 text-sm mb-8">
          The questions are organized into scenarios across different life domains. For each scenario, you'll either choose the response that fits you best or rate how much you agree with a statement.
        </p>

        <div class="glass p-4 mb-8 flex items-center gap-3 justify-center">
          <UIcon name="i-lucide-lightbulb" class="size-5 text-cyan-400" />
          <p class="text-white/80 text-sm">
            <strong class="text-cyan-400">Tip:</strong> Go with your first instinct. Overthinking usually leads away from accuracy, not toward it.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div v-for="section in sections" :key="section.id" class="glass p-3 rounded-xl">
            <p class="text-white text-xs font-medium truncate">{{ section.title }}</p>
            <p class="text-white/50 text-xs">{{ section.questions.length }} questions</p>
          </div>
        </div>

        <button
          @click="isStarted = true"
          class="px-8 py-3 bg-[#5be8ff] hover:bg-[#5be8ff]/80 text-[#041d2a] dark:bg-gradient-to-r dark:from-cyan-500 dark:to-teal-500 hover:dark:from-cyan-400 hover:dark:to-teal-400 dark:text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_16px_0_rgba(6,182,212,0.3)] active:scale-95"
        >
          Begin Assessment
        </button>
      </div>

      <!-- Assessment In Progress -->
      <div v-else-if="isStarted && !isCompleted" class="max-w-2xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-2">
            <span class="shrink-0 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs">
              Section {{ currentSectionIndex + 1 }} of {{ sections.length }}
            </span>
            <span class="shrink-0 text-sm font-medium text-white/70">Progress</span>
            <div class="progress-bar flex-1">
              <div class="progress-fill bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-300" :style="{ width: `${progress}%` }" />
            </div>
            <span class="shrink-0 text-sm text-white/50">{{ answeredCount }}/{{ totalQuestions }} ({{ progress }}%)</span>
          </div>
        </div>

        <!-- Scenario Header -->
        <div class="flex items-start gap-4 mb-8">
          <div class="shrink-0 w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
            <img src="/assessments-icon.svg" alt="" class="w-10 h-10 opacity-70" />
          </div>
          <div>
            <h3 class="text-white font-bold text-lg tracking-wide uppercase">{{ currentSection.title }}…</h3>
            <p class="text-cyan-400/80 text-sm mt-1">{{ currentSection.subtitle }}</p>
          </div>
        </div>

        <!-- Question -->
        <div class="mb-6 animate-fade-in-up" :key="currentQuestion.id">
          <p class="text-lg text-white font-semibold leading-relaxed">
            Q{{ overallQuestionNumber }}: {{ currentQuestion.text }}
          </p>
        </div>

        <!-- Answer Options -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="space-y-3">
          <button
            v-for="option in (currentQuestion as MultipleChoiceQuestion).options"
            :key="option.value"
            @click="selectAnswer(option.value)"
            class="w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-start gap-3"
            :class="getCurrentAnswer === option.value
              ? 'border-cyan-500 bg-cyan-500/20 shadow-lg glow-cyan'
              : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/5 bg-white/5'"
          >
            <span
              class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              :class="getCurrentAnswer === option.value ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60'"
            >
              {{ option.value }}
            </span>
            <span class="text-white/90 text-sm leading-relaxed">{{ option.label }}</span>
          </button>
        </div>

        <div v-else class="grid grid-cols-5 gap-3">
          <button
            v-for="option in ratingOptions"
            :key="option.value"
            @click="selectAnswer(option.value)"
            class="p-4 rounded-xl border-2 transition-all duration-200 text-center"
            :class="getCurrentAnswer === option.value
              ? 'border-cyan-500 bg-cyan-500/20 shadow-lg glow-cyan'
              : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/5 bg-white/5'"
          >
            <div class="text-2xl font-bold text-white mb-1">{{ option.value }}</div>
            <div class="text-xs text-white/50 leading-tight">{{ option.label }}</div>
          </button>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-8">
          <button
            :disabled="!canGoBack"
            @click="goToPrevious"
            class="px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <UIcon name="i-lucide-arrow-left" class="size-4" />
            Previous
          </button>
          <button @click="isStarted = false" class="px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            Save & Exit
          </button>
        </div>
      </div>

      <!-- Completed State -->
      <div v-else class="text-center py-12 max-w-2xl mx-auto">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-check" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">Assessment Complete!</h2>
        <p class="text-white/70 max-w-lg mx-auto mb-4">
          Your CRATE COHERE assessment has been submitted. We're analyzing your responses to identify your archetype, coherence patterns, and personalized insights.
        </p>
        <p class="text-white/50 text-sm mb-8">
          Results will be available in your dashboard shortly.
        </p>

        <div class="glass p-6 mb-8 text-left">
          <h3 class="text-white font-semibold mb-3">What happens next?</h3>
          <ul class="space-y-2 text-white/70 text-sm">
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-sparkles" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Your primary archetype and current state will be identified
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-activity" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Your Clarity, Agency, and Trust (C/A/T) scores will be calculated
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-shield" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Shadow patterns that may emerge under stress will be mapped
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-target" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Personalized recommendations will be generated
            </li>
          </ul>
        </div>

        <div class="flex items-center justify-center gap-4">
          <NuxtLink to="/dashboard" class="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all">
            View Dashboard
          </NuxtLink>
          <NuxtLink to="/coach" class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl transition-all">
            Talk to AI Coach
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
