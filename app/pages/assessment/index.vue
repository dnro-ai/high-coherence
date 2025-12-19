<script setup lang="ts">
const activeTab = ref('hexaco')

const assessmentTypes = [
  { id: 'hexaco', label: 'HEXACO', icon: 'i-lucide-fingerprint' },
  { id: 'self', label: 'Self Assessment', icon: 'i-lucide-user' },
  { id: 'company', label: 'Company Assessment', icon: 'i-lucide-building-2' }
]

const hexacoQuestions = {
  'Honesty-Humility': [
    'I would never accept a bribe, even if it were very large.',
    'I am an ordinary person who is no better than others.',
    'Having a lot of money is not especially important to me.',
    'I think that I am entitled to more respect than the average person is.',
  ],
  'Emotionality': [
    'I would feel afraid if I had to travel in bad weather conditions.',
    'I sometimes can\'t help worrying about little things.',
    'I feel strong emotions when someone close to me is going away for a long time.',
    'I can handle difficult situations without needing emotional support from anyone.',
  ],
  'Extraversion': [
    'I prefer jobs that involve active social interaction to those that involve working alone.',
    'The first thing that I always do in a new place is to make friends.',
    'I feel reasonably satisfied with myself overall.',
    'In social situations, I\'m usually the one who makes the first move.',
  ],
  'Agreeableness': [
    'I rarely hold a grudge, even against people who have badly wronged me.',
    'People sometimes tell me that I am too critical of others.',
    'I tend to be lenient in judging other people.',
    'Even when people make a lot of mistakes, I rarely say anything negative.',
  ],
  'Conscientiousness': [
    'I plan ahead and organize things, to avoid scrambling at the last minute.',
    'I often push myself very hard when trying to achieve a goal.',
    'When working on something, I don\'t pay much attention to small details.',
    'I make decisions based on the feeling of the moment rather than on careful thought.',
  ],
  'Openness': [
    'I would enjoy creating a work of art, such as a novel, a song, or a painting.',
    'I think that paying attention to radical ideas is a waste of time.',
    'I like people who have unconventional views.',
    'I would be quite bored by a visit to an art gallery.',
  ]
}

const currentTraitIndex = ref(0)
const currentQuestionIndex = ref(0)
const answers = ref<Record<string, number[]>>({})

const traits = Object.keys(hexacoQuestions)
const currentTrait = computed(() => traits[currentTraitIndex.value])
const currentQuestions = computed(() => hexacoQuestions[currentTrait.value as keyof typeof hexacoQuestions])
const currentQuestion = computed(() => currentQuestions.value[currentQuestionIndex.value])

const progress = computed(() => {
  const totalQuestions = traits.reduce((acc, trait) => acc + hexacoQuestions[trait as keyof typeof hexacoQuestions].length, 0)
  const answeredQuestions = Object.values(answers.value).flat().length
  return Math.round((answeredQuestions / totalQuestions) * 100)
})

const isStarted = ref(false)
const isCompleted = ref(false)

const answerOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
]

const selectAnswer = (value: number) => {
  if (!answers.value[currentTrait.value]) {
    answers.value[currentTrait.value] = []
  }
  answers.value[currentTrait.value][currentQuestionIndex.value] = value

  setTimeout(() => {
    if (currentQuestionIndex.value < currentQuestions.value.length - 1) {
      currentQuestionIndex.value++
    } else if (currentTraitIndex.value < traits.length - 1) {
      currentTraitIndex.value++
      currentQuestionIndex.value = 0
    } else {
      isCompleted.value = true
    }
  }, 300)
}

const getCurrentAnswer = computed(() => {
  return answers.value[currentTrait.value]?.[currentQuestionIndex.value]
})

// Self Assessment
const selfAssessmentStarted = ref(false)
const selfAssessmentCompleted = ref(false)
const selfAssessmentStep = ref(0)

const selfAssessmentQuestions = [
  { id: 'accomplishments', question: 'What were your key accomplishments this quarter?', type: 'textarea' },
  { id: 'challenges', question: 'What challenges did you face and how did you overcome them?', type: 'textarea' },
  { id: 'skills', question: 'What new skills have you developed?', type: 'textarea' },
  { id: 'goals', question: 'What are your goals for the next quarter?', type: 'textarea' },
  { id: 'support', question: 'What support do you need from your manager or team?', type: 'textarea' },
  { id: 'rating', question: 'How would you rate your overall performance this quarter?', type: 'rating' }
]

const selfAssessmentAnswers = ref<Record<string, string | number>>({})

const submitSelfAssessment = () => {
  if (selfAssessmentStep.value < selfAssessmentQuestions.length - 1) {
    selfAssessmentStep.value++
  } else {
    selfAssessmentCompleted.value = true
  }
}

// Company Assessment
const companyAssessmentStarted = ref(false)
const companyAssessmentCompleted = ref(false)
const companyAssessmentStep = ref(0)

const companyAssessmentQuestions = [
  { id: 'culture', question: 'How would you describe the company culture?', type: 'rating', label: 'Very Negative to Very Positive' },
  { id: 'values', question: 'How well does the company live up to its stated values?', type: 'rating', label: 'Not at All to Completely' },
  { id: 'communication', question: 'How effective is communication from leadership?', type: 'rating', label: 'Very Ineffective to Very Effective' },
  { id: 'growth', question: 'Do you feel there are opportunities for growth and development?', type: 'rating', label: 'Strongly Disagree to Strongly Agree' },
  { id: 'recommend', question: 'Would you recommend this company as a great place to work?', type: 'rating', label: 'Definitely Not to Definitely Yes' },
  { id: 'feedback', question: 'What suggestions do you have to improve the work environment?', type: 'textarea' }
]

const companyAssessmentAnswers = ref<Record<string, string | number>>({})

const submitCompanyAssessment = () => {
  if (companyAssessmentStep.value < companyAssessmentQuestions.length - 1) {
    companyAssessmentStep.value++
  } else {
    companyAssessmentCompleted.value = true
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-white">Assessments</h1>
      <p class="text-white/70 mt-1">Complete your personality and performance assessments</p>
    </div>

    <!-- Assessment Type Tabs -->
    <UTabs
      :items="assessmentTypes"
      v-model="activeTab"
      class="w-auto"
      :ui="{
        list: 'bg-white/80 backdrop-blur-xl rounded-xl p-1',
        trigger: 'data-[state=active]:bg-white data-[state=active]:shadow-sm'
      }"
    />

    <!-- HEXACO Assessment -->
    <UCard v-if="activeTab === 'hexaco'" class="bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
      <!-- Not Started State -->
      <div v-if="!isStarted && !isCompleted" class="text-center py-12">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-fingerprint" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">HEXACO Personality Assessment</h2>
        <p class="text-gray-600 max-w-lg mx-auto mb-8">
          The HEXACO model measures six major dimensions of personality. This assessment takes approximately 10-15 minutes to complete.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          <UCard v-for="trait in traits" :key="trait" variant="subtle" :ui="{ body: 'p-4' }">
            <h3 class="font-semibold text-gray-900 text-sm">{{ trait }}</h3>
            <p class="text-xs text-gray-500 mt-1">{{ hexacoQuestions[trait as keyof typeof hexacoQuestions].length }} questions</p>
          </UCard>
        </div>

        <UButton
          size="lg"
          class="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          @click="isStarted = true"
        >
          Begin Assessment
        </UButton>
      </div>

      <!-- Assessment In Progress -->
      <div v-else-if="isStarted && !isCompleted" class="max-w-2xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Progress</span>
            <span class="text-sm text-gray-500">{{ progress }}%</span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-primary-500 transition-all duration-300" :style="{ width: `${progress}%` }" />
          </div>
        </div>

        <!-- Current Trait Badge -->
        <div class="flex items-center gap-2 mb-6">
          <UBadge color="primary" size="lg">{{ currentTrait }}</UBadge>
          <span class="text-gray-500 text-sm">
            Question {{ currentQuestionIndex + 1 }} of {{ currentQuestions.length }}
          </span>
        </div>

        <!-- Question -->
        <UCard class="mb-8 animate-fade-in-up" :key="`${currentTraitIndex}-${currentQuestionIndex}`" :ui="{ body: 'p-8' }">
          <p class="text-xl text-gray-900 font-medium leading-relaxed">
            {{ currentQuestion }}
          </p>
        </UCard>

        <!-- Answer Options -->
        <div class="grid grid-cols-5 gap-3">
          <button
            v-for="option in answerOptions"
            :key="option.value"
            @click="selectAnswer(option.value)"
            class="p-4 rounded-xl border-2 transition-all duration-200 text-center"
            :class="getCurrentAnswer === option.value
              ? 'border-violet-500 bg-violet-50 shadow-lg'
              : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'"
          >
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ option.value }}</div>
            <div class="text-xs text-gray-500">{{ option.label }}</div>
          </button>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-8">
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="currentTraitIndex === 0 && currentQuestionIndex === 0"
            @click="currentQuestionIndex > 0 ? currentQuestionIndex-- : (currentTraitIndex--, currentQuestionIndex = currentQuestions.length - 1)"
          >
            Previous
          </UButton>
          <UButton variant="ghost" color="neutral" @click="isStarted = false">
            Save & Exit
          </UButton>
        </div>
      </div>

      <!-- Completed State -->
      <div v-else class="text-center py-12">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-check" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
        <p class="text-gray-600 max-w-lg mx-auto mb-8">
          Your HEXACO assessment has been submitted. Results will be available in your dashboard shortly.
        </p>
        <div class="flex items-center justify-center gap-4">
          <UButton variant="outline" to="/dashboard">View Dashboard</UButton>
          <UButton class="bg-gradient-to-r from-violet-500 to-purple-600" to="/coach">Talk to AI Coach</UButton>
        </div>
      </div>
    </UCard>

    <!-- Self Assessment -->
    <UCard v-else-if="activeTab === 'self'" class="bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
      <!-- Not Started -->
      <div v-if="!selfAssessmentStarted && !selfAssessmentCompleted" class="text-center py-12">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-user" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Self Assessment</h2>
        <p class="text-gray-600 max-w-lg mx-auto mb-8">
          Reflect on your performance, achievements, and areas for growth this quarter.
        </p>
        <UButton size="lg" class="bg-gradient-to-r from-blue-400 to-cyan-500" @click="selfAssessmentStarted = true">Start Self Assessment</UButton>
      </div>

      <!-- In Progress -->
      <div v-else-if="selfAssessmentStarted && !selfAssessmentCompleted" class="max-w-2xl mx-auto">
        <!-- Progress -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Progress</span>
            <span class="text-sm text-gray-500">{{ selfAssessmentStep + 1 }} / {{ selfAssessmentQuestions.length }}</span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-cyan-500 transition-all duration-300" :style="{ width: `${((selfAssessmentStep + 1) / selfAssessmentQuestions.length) * 100}%` }" />
          </div>
        </div>

        <!-- Question -->
        <UCard class="mb-8" :key="selfAssessmentStep" :ui="{ body: 'p-8' }">
          <p class="text-xl text-gray-900 font-medium leading-relaxed mb-6">
            {{ selfAssessmentQuestions[selfAssessmentStep].question }}
          </p>

          <UTextarea
            v-if="selfAssessmentQuestions[selfAssessmentStep].type === 'textarea'"
            v-model="selfAssessmentAnswers[selfAssessmentQuestions[selfAssessmentStep].id]"
            :rows="5"
            placeholder="Enter your response..."
            size="lg"
          />

          <div v-else class="grid grid-cols-5 gap-3">
            <button
              v-for="n in 5"
              :key="n"
              @click="selfAssessmentAnswers[selfAssessmentQuestions[selfAssessmentStep].id] = n"
              class="p-4 rounded-xl border-2 transition-all duration-200 text-center"
              :class="selfAssessmentAnswers[selfAssessmentQuestions[selfAssessmentStep].id] === n
                ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'"
            >
              <div class="text-2xl font-bold text-gray-900">{{ n }}</div>
            </button>
          </div>
        </UCard>

        <!-- Navigation -->
        <div class="flex items-center justify-between">
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="selfAssessmentStep === 0"
            @click="selfAssessmentStep--"
          >
            Previous
          </UButton>
          <UButton
            class="bg-gradient-to-r from-blue-400 to-cyan-500"
            @click="submitSelfAssessment"
          >
            {{ selfAssessmentStep === selfAssessmentQuestions.length - 1 ? 'Submit' : 'Next' }}
          </UButton>
        </div>
      </div>

      <!-- Completed -->
      <div v-else class="text-center py-12">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-check" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Self Assessment Complete!</h2>
        <p class="text-gray-600 max-w-lg mx-auto mb-8">
          Your self assessment has been submitted. Your manager will be notified.
        </p>
        <div class="flex items-center justify-center gap-4">
          <UButton variant="outline" to="/dashboard">View Dashboard</UButton>
          <UButton class="bg-gradient-to-r from-violet-500 to-purple-600" to="/coach">Talk to AI Coach</UButton>
        </div>
      </div>
    </UCard>

    <!-- Company Assessment -->
    <UCard v-else class="bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
      <!-- Not Started -->
      <div v-if="!companyAssessmentStarted && !companyAssessmentCompleted" class="text-center py-12">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-building-2" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Company Culture Assessment</h2>
        <p class="text-gray-600 max-w-lg mx-auto mb-8">
          Share your feedback on company culture, values, and work environment. Your responses are anonymous.
        </p>
        <UAlert color="info" variant="subtle" icon="i-lucide-shield" class="max-w-lg mx-auto mb-6">
          <template #title>Anonymous Survey</template>
          <template #description>Your individual responses will not be linked to your identity.</template>
        </UAlert>
        <UButton size="lg" class="bg-gradient-to-r from-amber-400 to-orange-500" @click="companyAssessmentStarted = true">Start Company Assessment</UButton>
      </div>

      <!-- In Progress -->
      <div v-else-if="companyAssessmentStarted && !companyAssessmentCompleted" class="max-w-2xl mx-auto">
        <!-- Progress -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Progress</span>
            <span class="text-sm text-gray-500">{{ companyAssessmentStep + 1 }} / {{ companyAssessmentQuestions.length }}</span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-orange-500 transition-all duration-300" :style="{ width: `${((companyAssessmentStep + 1) / companyAssessmentQuestions.length) * 100}%` }" />
          </div>
        </div>

        <!-- Question -->
        <UCard class="mb-8" :key="companyAssessmentStep" :ui="{ body: 'p-8' }">
          <p class="text-xl text-gray-900 font-medium leading-relaxed mb-6">
            {{ companyAssessmentQuestions[companyAssessmentStep].question }}
          </p>

          <UTextarea
            v-if="companyAssessmentQuestions[companyAssessmentStep].type === 'textarea'"
            v-model="companyAssessmentAnswers[companyAssessmentQuestions[companyAssessmentStep].id]"
            :rows="5"
            placeholder="Enter your response..."
            size="lg"
          />

          <div v-else>
            <p class="text-sm text-gray-500 mb-4 text-center">{{ companyAssessmentQuestions[companyAssessmentStep].label }}</p>
            <div class="grid grid-cols-5 gap-3">
              <button
                v-for="n in 5"
                :key="n"
                @click="companyAssessmentAnswers[companyAssessmentQuestions[companyAssessmentStep].id] = n"
                class="p-4 rounded-xl border-2 transition-all duration-200 text-center"
                :class="companyAssessmentAnswers[companyAssessmentQuestions[companyAssessmentStep].id] === n
                  ? 'border-orange-500 bg-orange-50 shadow-lg'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'"
              >
                <div class="text-2xl font-bold text-gray-900">{{ n }}</div>
              </button>
            </div>
          </div>
        </UCard>

        <!-- Navigation -->
        <div class="flex items-center justify-between">
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="companyAssessmentStep === 0"
            @click="companyAssessmentStep--"
          >
            Previous
          </UButton>
          <UButton
            class="bg-gradient-to-r from-amber-400 to-orange-500"
            @click="submitCompanyAssessment"
          >
            {{ companyAssessmentStep === companyAssessmentQuestions.length - 1 ? 'Submit' : 'Next' }}
          </UButton>
        </div>
      </div>

      <!-- Completed -->
      <div v-else class="text-center py-12">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-check" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p class="text-gray-600 max-w-lg mx-auto mb-8">
          Your anonymous feedback has been submitted. This helps us improve our workplace culture.
        </p>
        <div class="flex items-center justify-center gap-4">
          <UButton variant="outline" to="/dashboard">View Dashboard</UButton>
          <UButton class="bg-gradient-to-r from-violet-500 to-purple-600" to="/reports">View Reports</UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
